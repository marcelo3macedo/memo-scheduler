import IListCardsDTO from "@modules/cards/dtos/IListCardsDTO";
import Card from '@modules/cards/entities/Card';

export default interface ICardsRepository {
  list(data: IListCardsDTO): Promise<Card[]>;
}