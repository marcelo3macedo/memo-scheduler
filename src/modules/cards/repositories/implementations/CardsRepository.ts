import { getRepository, In, Repository } from 'typeorm';

import IListCardsDTO from "@modules/cards/dtos/IListCardsDTO";
import Card from '@modules/cards/entities/Card';
import ICardsRepository from '@modules/cards/repositories/ICardsRepository';

export class CardsRepository implements ICardsRepository {
  private repository: Repository<Card>;

  constructor() {
    this.repository = getRepository(Card);
  }

  async list({ decksIds }: IListCardsDTO): Promise<Card[]> {
    const query = this.repository.createQueryBuilder('cards')
      .where('cards.deckId IN (:...decksIds)')
      .setParameter('decksIds', decksIds)
      .orderBy('cards.difficultyFactor', 'ASC')

    return query.getMany()
  }
}