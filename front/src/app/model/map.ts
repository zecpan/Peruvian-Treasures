import { Adventurer } from './adventurer';
import { Mountain } from './mountain';
import { Treasur } from './treasur';
export class Map {
  constructor(
    public type: string,
    public width: number,
    public height: number,
    public mountains: Array<Mountain>,
    public treasures: Array<Treasur>,
    public adventurers: Array<Adventurer>
  ) {}

  toSting(): string {
    let sb: string;

    let sbmap = this.type + ' - ' + this.width + ' - ' + this.height + '\n';
    sb = sbmap;
    this.mountains.forEach((mountain) => {
      sb = sb.concat(mountain.toSting());
    });
    this.treasures.forEach((treasur) => {
      sb = sb.concat(treasur.toSting());
    });
    this.adventurers.forEach((adventurer) => {
      sb = sb.concat(adventurer.toSting());
    });
    return sb;
  }
}
