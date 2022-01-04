import dayjs from "dayjs";
import { IFrequencyProvider } from "../IFrequencyProvider";

class FrequencyProvider implements IFrequencyProvider {
    calcNextDate({ interval, period, maxSessions }):Date {
        const actualDate = Date();
        let nextDate;

        switch (period) {
            case "daily":
                nextDate = dayjs(actualDate).add(interval.getHours(), "hour")
                break;
            case "weekly":
                nextDate = dayjs(actualDate).add(interval.getDay(), "day")
                break;
            case "monthly":
                nextDate = dayjs(actualDate).add(interval.getDay(), "day")
                break;
        }

        return nextDate.toDate();
    }
}

export { FrequencyProvider };