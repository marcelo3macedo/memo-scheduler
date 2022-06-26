import { getRepository, Repository } from 'typeorm';

import logger from '@config/logger';
import { CACHE_SESSIONS } from 'constants/cacheKeys';
import CacheManager from 'lib/CacheManager';
import Session from '../../entities/Session';
import { ISessionsRepository } from '../ISessionsRepository';

export class SessionsRepository implements ISessionsRepository {
  private repository: Repository<Session>;

  constructor() {
    this.repository = getRepository(Session);
  }

  async create({ deck, cards }): Promise<Session> {
    if (!deck) {
      return 
    }

    const session = this.repository.create({
      userId: deck.userId,
      deck,
      cards
    });

    await this.repository.save(session);

    CacheManager.remove(`${CACHE_SESSIONS}:${deck.userId}`)

    logger.info(`[SessionsRepository] Create Deck: ${deck.id} cards: ${cards.length}`)

    return session;
  }

  async reviewed(): Promise<Session[]> {
    const actualDayDate = new Date()
    const firstDayDate = new Date()
    firstDayDate.setHours(0,0,0,0);

    const data = this.repository.createQueryBuilder('sessions')
      .leftJoinAndSelect('sessions.deck', 'deck')
      .where('sessions.finishedAt > :finishedAt') 
      .setParameter('finishedAt', firstDayDate.toISOString())
      .andWhere('deck.reviewAt < :reviewAt')
      .setParameter('reviewAt', actualDayDate.toISOString())   
      .withDeleted() 
      .getMany()  

    return data
  }

  async filter({ deckId, interval }): Promise<Session[]> {
    const data = this.repository.createQueryBuilder('sessions')
      .leftJoinAndSelect('sessions.deck', 'deck')
      .where('sessions.finishedAt > :finishedAt') 
      .setParameter('finishedAt', interval.toISOString())
      .where('sessions.deckId = :deckId') 
      .setParameter('deckId', deckId)
      .withDeleted() 
      .orderBy('sessions.finishedAt', 'DESC')
      .getMany()

    return data
  }

  async hasActive({ deckId }): Promise<Session> {
    return await this.repository.findOne({ where: { deckId, finishedAt: null } });
  }
}