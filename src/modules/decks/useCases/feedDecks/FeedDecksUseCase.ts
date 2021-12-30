import { inject, injectable } from 'tsyringe';
import { IDecksRepository } from '@modules/decks/repositories/IDecksRepository';

@injectable()
export class FeedDecksUseCase {
  constructor(
    @inject('DecksRepository')
    private decksRepository: IDecksRepository
  ) {}

  async execute() {
    return this.decksRepository.list({ isPublic: true })
  }
}