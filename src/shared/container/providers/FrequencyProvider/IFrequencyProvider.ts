import Frequency from "@modules/frequencies/entities/Frequency";

interface IFrequencyProvider {
    calcInterval(frequency: Frequency):Date;
    calcNextDate(sessions: any, frequency: Frequency):Date;
}

export { IFrequencyProvider };