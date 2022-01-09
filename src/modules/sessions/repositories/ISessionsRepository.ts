import Session from '../entities/Session';
import ICreateSessionsDTO from "@modules/sessions/dtos/ICreateSessionsDTO";
import IHasActiveSessionsDTO from '../dtos/IHasActiveSessionsDTO';
import IFilterSessionsDTO from '../dtos/IFilterSessionsDTO';

export interface ISessionsRepository {
  create(data: ICreateSessionsDTO): Promise<Session>;
  reviewed(): Promise<Session[]>;
  hasActive(data: IHasActiveSessionsDTO): Promise<Session>;
  filter(data: IFilterSessionsDTO): Promise<Session[]>;
}