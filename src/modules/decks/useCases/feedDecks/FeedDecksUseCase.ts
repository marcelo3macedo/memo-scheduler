import { inject, injectable } from 'tsyringe';
import { IDecksRepository } from '@modules/decks/repositories/IDecksRepository';
import ICardsRepository from '@modules/cards/repositories/ICardsRepository';
import { ISessionsRepository } from '@modules/sessions/repositories/ISessionsRepository';
import logger from '@config/logger';

@injectable()
export class FeedDecksUseCase {
  constructor(
    @inject('DecksRepository')
    private decksRepository: IDecksRepository,
    @inject('CardsRepository')
    private cardsRepository: ICardsRepository,
    @inject('SessionsRepository')
    private sessionsRepository: ISessionsRepository
  ) {}

  async execute() {
    try {
      const decks = await this.decksRepository.pending()

      logger.info(`[FeedDecksUseCase] Decks to Feed: ${decks.length}`)
      
      decks.map(async d => {
        let decksIds = [ d.id ]
        const children = await this.decksRepository.children({ deckId: d.id })      
        children.map(c => { decksIds.push(c.id) })
        let cards = await this.cardsRepository.list({ decksIds })
        
        if (cards.length == 0) {
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