import { getRepository, Repository } from 'typeorm';

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

    return session;
  }
}