import IIndexDecksDTO from '../dtos/IIndexDecksDTO';
import IListDecksChildrenDTO from '../dtos/IListDecksChildrenDTO';
import IUpdateDecksDTO from '../dtos/IUpdateDecksDTO';
import Deck from '../entities/Deck';

export interface IDecksRepository {
  pending(): Promise<Deck[]>;
  children(data:IListDecksChildrenDTO) : Promise<Deck[]>;
  index(data:IIndexDecksDTO): Promise<Deck>;
  update(data: IUpdateDecksDTO): Promise<void>;
}