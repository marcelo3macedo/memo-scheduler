import { FeedDecksTask } from "@modules/decks/useCases/feedDecks/FeedDecksTask";

class Tasks {
    get(taskId) {
        switch (taskId) {
            case "feed-decks":
                return new FeedDecksTask();
            default:
                return
        }        
    }
}

export { Tasks };