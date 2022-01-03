import Session from '../entities/Session';
import ICreateSessionsDTO from "@modules/sessions/dtos/ICreateSessionsDTO";

export interface ISessionsRepository {
  create(data: ICreateSessionsDTO): Promise<Session>;
}