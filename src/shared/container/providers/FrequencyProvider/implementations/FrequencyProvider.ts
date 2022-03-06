import dayjs from "dayjs";
import { IFrequencyProvider } from "../IFrequencyProvider";

class FrequencyProvider implements IFrequencyProvider {
    addDay(interval):Date {
        const actualDate = Date()
        const nextDate = dayjs(actualDate).add(interval, "day").startOf("day")
        
        return nextDate.toDate()
    }

    calcInterval({ period }):Date {
        const actualDate = Date();
        let minInterval;

        switch (period) {
            case "daily":
                minInterval = dayjs(actualDate).startOf("day")
                break;
            case "weekly":
                minInterval = dayjs(actualDate).startOf("week")
                break;
            case "monthly":
                minInterval = dayjs(actualDate).startOf("month")
                break;
        }

        return minInterval.toDate();
    }

    calcNextDate(sessions, { interval, period, maxSessions }):Date {
        const actualDate = Date();
        let nextDate;

        if (sessions.length >= maxSessions) {
            return
        }

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