import { Card } from './Card'
export class Game {
  gameCode: string;
  players: Array<{player: string, cards: Array<Card>}>;
  topCard: Card;
}