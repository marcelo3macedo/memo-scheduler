import { FeedDecksTask } from "@modules/decks/useCases/feedDecks/FeedDecksTask";
import { ScheduleDecksTask } from "@modules/decks/useCases/scheduleDecks/ScheduleDecksTask";

class Tasks {
    get(taskId) {
        switch (taskId) {
            case "feed-decks":
                return new FeedDecksTask();
            case "schedule-decks":
                return new ScheduleDecksTask();
            default:
                return
        }        
    }
}

export { Tasks };