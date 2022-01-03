import { container } from 'tsyringe';
import { FeedDecksUseCase } from './FeedDecksUseCase';

export class FeedDecksTask {
    async handle() {
        const feedDecksUseCase = container.resolve(FeedDecksUseCase);
        const result = await feedDecksUseCase.execute();

        console.log(result)
    }
}