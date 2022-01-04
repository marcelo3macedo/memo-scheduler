import { container } from 'tsyringe';
import './providers';

import { IDecksRepository } from '@modules/decks/repositories/IDecksRepository';
import { DecksRepository } from '@modules/decks/repositories/implementations/DecksRepository';

import ICardsRepository from '@modules/cards/repositories/ICardsRepository';
import { CardsRepository } from '@modules/cards/repositories/implementations/CardsRepository';

import { ISessionsRepository } from '@modules/sessions/repositories/ISessionsRepository';
import { SessionsRepository } from '@modules/sessions/repositories/implementations/SessionsRepository';

container.registerSingleton<IDecksRepository>('DecksRepository', DecksRepository);
container.registerSingleton<ICardsRepository>('CardsRepository', CardsRepository);
container.registerSingleton<ISessionsRepository>('SessionsRepository', SessionsRepository);
