import { container } from "tsyringe";

import { IFrequencyProvider } from "./FrequencyProvider/IFrequencyProvider";
import { FrequencyProvider } from "./FrequencyProvider/implementations/FrequencyProvider";

container.registerSingleton<IFrequencyProvider>(
    "FrequencyProvider",
    FrequencyProvider
);