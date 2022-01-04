import Frequency from "@modules/frequencies/entities/Frequency";

interface IFrequencyProvider {
    calcNextDate(frequency: Frequency):Date;
}

export { IFrequencyProvider };