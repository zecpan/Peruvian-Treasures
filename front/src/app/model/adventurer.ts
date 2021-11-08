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

  public isValid(): boolean {
    switch (this.orientation) {
      case 'N':
      case 'S':
      case 'E':
      case 'O':
        return true;
      default:
        console.log("L' aventurier " + this.name + " n'est pas valide");
        return false;
    }
  }

  avancer(
    orientation: string,
    coordinates: Array<Coordinates>,
    mapWidth: number,
    mapHeight: number
  ): void {
    let tempVertical: number;
    let tempHorizontal: number;
    switch (orientation) {
      case 'N':
        tempVertical = this.vertical - 1;
        if (
          this.checkCoordinates(
            this.horizontal,
            tempVertical,
            coordinates,
            mapWidth,
            mapHeight
          )
        )
          this.vertical--;
        break;
      case 'S':
        tempVertical = this.vertical + 1;
        if (
          this.checkCoordinates(
            this.horizontal,
            tempVertical,
            coordinates,
            mapWidth,
            mapHeight
          )
        )
          this.vertical++;
        break;
      case 'E':
        tempHorizontal = this.horizontal - 1;
        if (
          this.checkCoordinates(
            tempHorizontal,
            this.vertical,
            coordinates,
            mapWidth,
            mapHeight
          )
        )
          this.horizontal--;
        break;
      case 'O':
        tempHorizontal = this.horizontal + 1;
        if (
          this.checkCoordinates(
            tempHorizontal,
            this.vertical,
            coordinates,
            mapWidth,
            mapHeight
          )
        )
          this.horizontal++;
        break;
      default:
        break;
    }
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

  checkCoordinates(
    horizontal: number,
    vertical: number,
    coordinates: Array<Coordinates>,
    mapWidth: number,
    mapHeight: number
  ): boolean {
    if (
      !(horizontal < 0 || horizontal > mapWidth - 1) &&
      !(vertical < 0 || vertical > mapHeight - 1)
    ) {
      const nextCoordinate = this.ensure(
        coordinates.find(
          (r: Coordinates) =>
            r.horizontal == horizontal && r.vertical == vertical
        )
      );
      if (nextCoordinate != undefined) return true;
      switch ((nextCoordinate as any).type) {
        case 'M':
          return false;
        case 'T':
        case 'A':
          return true;
      }
    }
    return false;
  }

  ensure<T>(
    argument: T | undefined | null,
    message: string = 'This value was promised to be there.'
  ): T {
    if (argument === undefined || argument === null) {
      throw new TypeError(message);
    }

    return argument;
  }

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
