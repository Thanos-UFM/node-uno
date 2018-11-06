import { Card } from './Card'
import { Player } from './Player'
export class Game {
  gameCode: string;
  players: Array<Player>;
  topCard: Card;
  turn: number;
}