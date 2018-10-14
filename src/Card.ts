export class Card {  
  public color: Color;
  public value: Value;
}
export enum Color {
  red,
  blue,
  green,
  yellow  
}
export enum Value {
  // numbers
  zero,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  // special cards
  drawTwo,
  reverse,
  skip,
  wild,
  wildDrawFour,
}