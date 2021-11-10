import { Coordinates } from './interfaces/coordinates';
import { Map } from './map';
import { Treasur } from './treasur';

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

  public isValid(): boolean {
    switch (this.orientation) {
      case 'N':
      case 'S':
      case 'E':
      case 'O':
        return true;
      default:
        console.log(`L' aventurier ${this.name} n'est pas valide`);
        return false;
    }
  }

  startMotion(carte: Map): void {
    for (const movement of this.motionSequence) {
      console.log(movement);

      switch (movement) {
        case 'A':
          this.avancer(this.orientation, carte);
          console.log(
            `horizontal: ${this.horizontal} vertical: ${this.vertical} nombre de trésors: ${this.nbTreasur}`
          );
          break;
        case 'D':
          this.droite(this.orientation);
          console.log(`orientation ${this.orientation}`);
          break;
        case 'G':
          this.gauche(this.orientation);
          console.log(`orientation ${this.orientation}`);
          break;
        default:
          break;
      }
    }
  }

  avancer(orientation: string, carte: Map): void {
    let tempVertical: number;
    let tempHorizontal: number;
    switch (orientation) {
      case 'N':
        tempVertical = this.vertical - 1;
        if (this.checkCoordinates(this.horizontal, tempVertical, carte))
          this.vertical--;
        break;
      case 'S':
        tempVertical = this.vertical + 1;
        if (this.checkCoordinates(this.horizontal, tempVertical, carte))
          this.vertical++;
        break;
      case 'E':
        tempHorizontal = this.horizontal + 1;
        if (this.checkCoordinates(tempHorizontal, this.vertical, carte))
          this.horizontal++;
        break;
      case 'O':
        tempHorizontal = this.horizontal - 1;
        if (this.checkCoordinates(tempHorizontal, this.vertical, carte))
          this.horizontal--;
        break;
      default:
        break;
    }
    this.lookingForTreasur(this.horizontal, this.vertical, carte);
  }

  gauche(orientation: string): void {
    switch (orientation) {
      case 'N':
        this.orientation = 'O';
        break;
      case 'S':
        this.orientation = 'E';
        break;
      case 'E':
        this.orientation = 'N';
        break;
      case 'O':
        this.orientation = 'S';
        break;
      default:
        break;
    }
  }

  droite(orientation: string): void {
    switch (orientation) {
      case 'N':
        this.orientation = 'E';
        break;
      case 'S':
        this.orientation = 'O';
        break;
      case 'E':
        this.orientation = 'S';
        break;
      case 'O':
        this.orientation = 'N';
        break;
      default:
        break;
    }
  }

  checkCoordinates(horizontal: number, vertical: number, carte: Map): boolean {
    if (
      !(horizontal < 0 || horizontal > carte.width - 1) &&
      !(vertical < 0 || vertical > carte.height - 1)
    ) {
      const nextCoordinate = carte
        .getMapCoordinates()
        .find(
          (r: Coordinates) =>
            r.horizontal == horizontal && r.vertical == vertical
        );
      if (nextCoordinate == undefined) return true;
      return nextCoordinate.type == 'T' ? true : false;
    }
    return false;
  }

  lookingForTreasur(horizontal: number, vertical: number, carte: Map): void {
    if (
      !(horizontal < 0 || horizontal > carte.width - 1) &&
      !(vertical < 0 || vertical > carte.height - 1)
    ) {
      const potentialTreasur = carte
        .getMapCoordinates()
        .find(
          (r: Coordinates) =>
            r.horizontal == horizontal &&
            r.vertical == vertical &&
            r.type == 'T'
        ) as Treasur;
      if (potentialTreasur != undefined) {
        if (potentialTreasur.nbTreasur > 0) {
          carte.treasures = carte.treasures.filter(
            (r) => potentialTreasur != r
          );
          potentialTreasur.nbTreasur--;
          carte.treasures.push(potentialTreasur);
          this.nbTreasur++;
        }
      }
    }
  }

  toString(): string {
    return `# {A comme Aventurier} - {Nom de l’aventurier} - {Axe horizontal} - {Axe vertical} - {Orientation} - {Nb. trésors ramassés} \n${this.type} - ${this.name} - ${this.horizontal} - ${this.vertical} - ${this.orientation} - ${this.nbTreasur}\n`;
  }
}
