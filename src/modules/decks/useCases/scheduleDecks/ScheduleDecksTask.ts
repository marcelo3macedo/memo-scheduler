import { container } from 'tsyringe';
import { ScheduleDecksUseCase } from './ScheduleDecksUseCase';

export class ScheduleDecksTask {
    async handle() {
        const scheduleDecksUseCase = container.resolve(ScheduleDecksUseCase);
        await scheduleDecksUseCase.execute();
    }
}