import Card from "@modules/cards/entities/Card";
import Deck from "@modules/decks/entities/Deck";

export default interface ICreateSessionsDTO {
   deck: Deck;
   cards: Card[];
}