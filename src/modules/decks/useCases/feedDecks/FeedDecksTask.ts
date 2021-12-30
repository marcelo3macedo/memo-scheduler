import { container } from 'tsyringe';
import { FeedDecksUseCase } from './FeedDecksUseCase';

export class FeedDecksTask {
    async handle() {
        console.log("here")
        const feedDecksUseCase = container.resolve(FeedDecksUseCase);
        const result = await feedDecksUseCase.execute();

        console.log(result)
    }
}