import { Adventurer } from './adventurer';
import { Coordinates } from './interfaces/coordinates';
import { Mountain } from './mountain';
import { Treasur } from './treasur';

let coordinates: Array<Coordinates>;

export class Map {
  constructor(
    public type: string,
    public width: number,
    public height: number,
    public mountains: Array<Mountain>,
    public treasures: Array<Treasur>,
    public adventurers: Array<Adventurer>
  ) {
    coordinates = new Array<Coordinates>();
    this.mountains.forEach((mountain) => {
      if (this.checkCoordinates(mountain)) coordinates.push(mountain);
    });
    this.mountains = this.mountains.filter((r) => coordinates.includes(r));
    this.treasures.forEach((treasur) => {
      if (this.checkCoordinates(treasur)) coordinates.push(treasur);
    });
    this.treasures = this.treasures.filter((r) => coordinates.includes(r));
    let invalidAdventurer: Adventurer;
    this.adventurers.forEach((adventurer) => {
      if (adventurer.isValid()) {
        if (this.checkCoordinates(adventurer)) coordinates.push(adventurer);
      } else {
        invalidAdventurer = adventurer;
      }
    });
    this.adventurers = this.adventurers.filter((r) => coordinates.includes(r));
    this.adventurers = this.adventurers.filter(
      (valid) => valid != invalidAdventurer
    );

    console.log(coordinates);
  }

  checkCoordinates(coordinate: Coordinates): boolean {
    if (
      !(coordinate.horizontal < 0 || coordinate.horizontal > this.width - 1) &&
      !(coordinate.vertical < 0 || coordinate.vertical > this.height - 1)
    ) {
      const duplicate = coordinates.find(
        (r: Coordinates) =>
          r.horizontal == coordinate.horizontal &&
          r.vertical == coordinate.vertical
      );
      console.log(duplicate);
      if (duplicate != undefined) {
        console.log(
          'Les coordonnées ' +
            coordinate.type +
            ' - ' +
            coordinate.horizontal +
            ' - ' +
            coordinate.vertical +
            ' sont déjà utilisées par un autre élément'
        );
        return false;
      }

      return true;
    }
    console.log(
      `Les coordonnées ${coordinate.type} - ${coordinate.horizontal} - ${coordinate.vertical} sont en dehors des dimensions de la carte`
    );
    return false;
  }

  getMapCoordinates(): Array<Coordinates> {
    return coordinates;
  }

  toString(): string {
    let sb: string;

    let sbmap = `${this.type} - ${this.width} - ${this.height}\n`;
    sb = sbmap;
    this.mountains.forEach((mountain) => {
      sb = sb.concat(mountain.toString());
    });
    this.treasures.forEach((treasur) => {
      sb = sb.concat(treasur.toString());
    });
    this.adventurers.forEach((adventurer) => {
      sb = sb.concat(adventurer.toString());
    });
    return sb;
  }
}
