import { container } from 'tsyringe';

import { IDecksRepository } from '@modules/decks/repositories/IDecksRepository';
import { DecksRepository } from '@modules/decks/repositories/implementations/DecksRepository';


container.registerSingleton<IDecksRepository>('DecksRepository', DecksRepository);
