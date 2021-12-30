import Deck from '../entities/Deck';
import IListDecksDTO from "@modules/decks/dtos/IListDecksDTO";

export interface IDecksRepository {
  list(data: IListDecksDTO): Promise<Deck[]>;
}