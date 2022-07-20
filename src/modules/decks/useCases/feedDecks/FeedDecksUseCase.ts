import { inject, injectable } from 'tsyringe';
import { IDecksRepository } from '@modules/decks/repositories/IDecksRepository';
import ICardsRepository from '@modules/cards/repositories/ICardsRepository';
import { ISessionsRepository } from '@modules/sessions/repositories/ISessionsRepository';
import logger from '@config/logger';
import { IFrequencyProvider } from '@shared/container/providers/FrequencyProvider/IFrequencyProvider';

@injectable()
export class FeedDecksUseCase {
  constructor(
    @inject('DecksRepository')
    private decksRepository: IDecksRepository,
    @inject('CardsRepository')
    private cardsRepository: ICardsRepository,
    @inject('SessionsRepository')
    private sessionsRepository: ISessionsRepository,
    @inject('FrequencyProvider')
    private frequencyProvider: IFrequencyProvider
  ) {}

  async execute() {
    try {
      const decks = await this.decksRepository.pending()

      logger.info(`[FeedDecksUseCase] Decks to Feed: ${decks.length}`)
      
      decks.map(async d => {
        let cards = await this.cardsRepository.list({ decksIds: [ d.id ] })
        
        if (cards.length == 0) {
          let reviewAt = this.frequencyProvider.addDay(1)
          this.decksRepository.update({ deckId: d.id, reviewAt })
          
          logger.info(`[FeedDecksUseCase] Deck without cards: ${d.id}`)
          return
        }

        await this.sessionsRepository.create({ deck: d, cards })
      })

      logger.info(`[FeedDecksUseCase] Finished - Updated: ${decks.length}`)
    } catch (e) {
      logger.error(`[FeedDecksUseCase] Finished - Failed: ${e.message}`)
    }
  }
}