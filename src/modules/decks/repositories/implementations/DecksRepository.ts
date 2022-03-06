import IListDecksChildrenDTO from '@modules/decks/dtos/IListDecksChildrenDTO';
import { getRepository, Repository } from 'typeorm';
import Deck from '../../entities/Deck';
import IIndexDecksDTO from '../../dtos/IIndexDecksDTO';
import IUpdateDecksDTO from '../../dtos/IUpdateDecksDTO';
import { IDecksRepository } from '../IDecksRepository';
import logger from '@config/logger';

export class DecksRepository implements IDecksRepository {
  private repository: Repository<Deck>;

  constructor() {
    this.repository = getRepository(Deck);
  }

  async index({ deckId }: IIndexDecksDTO): Promise<Deck> {
    return await this.repository.findOne({ where: { id: deckId }, relations: [ 'frequency' ] })
  }

  async pending(): Promise<Deck[]> {
    const query = this.repository.createQueryBuilder('decks')
      .leftJoinAndSelect("sessions", "sessions", "sessions.deckId = decks.id AND sessions.finishedAt IS NULL")
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

  async update({ deckId, reviewAt }: IUpdateDecksDTO): Promise<void> {
    const deck = {
      reviewAt
    }

    this.repository.update({ id:deckId }, deck);
  }
}