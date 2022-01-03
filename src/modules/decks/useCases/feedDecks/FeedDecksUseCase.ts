import { inject, injectable } from 'tsyringe';
import { IDecksRepository } from '@modules/decks/repositories/IDecksRepository';
import ICardsRepository from '@modules/cards/repositories/ICardsRepository';
import { ISessionsRepository } from '@modules/sessions/repositories/ISessionsRepository';

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
    const decks = await this.decksRepository.pending()
    
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
  }
}