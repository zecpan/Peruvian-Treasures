import { Coordinates } from './interfaces/coordinates';
export class Adventurer implements Coordinates {
  constructor(
    public type: string,
    public name: string,
    public horizontal: number,
    public vertical: number,
    public orientation: string,
    public motionSequence: string,
    public nbTreasur: number
  ) {}

  toSting(): string {
    return (
      '# {A comme Aventurier} - {Nom de l’aventurier} - {Axe horizontal} - {Axe vertical} - {Orientation} - {Nb. trésors ramassés} \n' +
      this.type +
      ' - ' +
      this.name +
      ' - ' +
      this.horizontal +
      ' - ' +
      this.vertical +
      ' - ' +
      this.orientation +
      ' - ' +
      this.nbTreasur +
      '\n'
    );
  }
}
