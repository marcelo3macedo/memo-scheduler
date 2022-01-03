import IListDecksChildrenDTO from '../dtos/IListDecksChildrenDTO';
import Deck from '../entities/Deck';

export interface IDecksRepository {
  pending(): Promise<Deck[]>;
  children(data:IListDecksChildrenDTO) : Promise<Deck[]>;
}