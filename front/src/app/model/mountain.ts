import { Coordinates } from './interfaces/coordinates';
export class Mountain implements Coordinates {
  constructor(
    public type: string,
    public horizontal: number,
    public vertical: number
  ) {}

  toSting(): string {
    return this.type + ' - ' + this.horizontal + ' - ' + this.vertical + '\n';
  }
}
