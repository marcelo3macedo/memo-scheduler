import IListDecksChildrenDTO from '@modules/decks/dtos/IListDecksChildrenDTO';
import { getRepository, Repository } from 'typeorm';
import Deck from '../../entities/Deck';
import { IDecksRepository } from '../IDecksRepository';
export class DecksRepository implements IDecksRepository {
  private repository: Repository<Deck>;

  constructor() {
    this.repository = getRepository(Deck);
  }

  async pending(): Promise<Deck[]> {
    const query = this.repository.createQueryBuilder('decks')
      .leftJoinAndSelect("sessions", "sessions", "sessions.deckId = decks.id")
      .where('decks.parentId IS NULL')
      .andWhere('sessions.id IS NULL')
      .andWhere('(decks.reviewAt IS NULL OR decks.reviewAt < :actualDate)', {
        actualDate: new Date().toISOString()
      })

    return query.getMany();
  }

  async children({ deckId } : IListDecksChildrenDTO) : Promise<Deck[]> {
    return await this.repository.createQueryBuilder('decks')
      .loadRelationCountAndMap('decks.cardsCount', 'decks.cards', 'cards')
      .where('decks.parentId = :parentId')
      .setParameter('parentId', deckId)
      .getMany();
  }
}