import { Coordinates } from './interfaces/coordinates';
export class Treasur implements Coordinates {
  constructor(
    public type: string,
    public horizontal: number,
    public vertical: number,
    public nbTreasur: number
  ) {}

  toString(): string {
    return `# {T comme Trésor} - {Axe horizontal} - {Axe vertical} - {Nb. trésors ramassés} \n${this.type} - ${this.horizontal} - ${this.vertical} - ${this.nbTreasur}\n`;
  }
}
