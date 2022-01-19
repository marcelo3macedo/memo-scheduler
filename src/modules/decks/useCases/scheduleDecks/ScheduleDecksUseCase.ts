import logger from '@config/logger';
import { IDecksRepository } from '@modules/decks/repositories/IDecksRepository';
import { ISessionsRepository } from '@modules/sessions/repositories/ISessionsRepository';
import { IFrequencyProvider } from '@shared/container/providers/FrequencyProvider/IFrequencyProvider';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ScheduleDecksUseCase {
  constructor(
    @inject('DecksRepository')
    private decksRepository: IDecksRepository,
    @inject('SessionsRepository')
    private sessionsRepository: ISessionsRepository,
    @inject('FrequencyProvider')
    private frequencyProvider: IFrequencyProvider
  ) {}

  async execute() {
    try {
      logger.info(`[ScheduleDecksUseCase] Initializing`)

      const sessions = await this.sessionsRepository.reviewed();
      const decksIds = sessions.map(item => item.deckId)
        .filter((value, index, self) => self.indexOf(value) === index)

      decksIds.map(async deckId=> {
          let activeSession = await this.sessionsRepository.hasActive({ deckId })
          
          if (activeSession) {
            return
          }

          const deck = await this.decksRepository.index({ deckId })
          const { frequency } = deck
          const interval = this.frequencyProvider.calcInterval(frequency)

          let deckSessions = await this.sessionsRepository.filter({ deckId: deck.id, interval })
          const reviewAt = this.frequencyProvider.calcNextDate(deckSessions, frequency)

          if (!reviewAt) {
            return
          }

          await this.decksRepository.update({ deckId: deck.id, reviewAt })
      })

      logger.info(`[ScheduleDecksUseCase] Finished - Updated: ${decksIds.length}`)
    } catch (e) {
      logger.error(`[ScheduleDecksUseCase] Failed: ${e.message}`)
    }
  }
}