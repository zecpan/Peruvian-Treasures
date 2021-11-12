import { Coordinates } from './interfaces/coordinates';

export class DefaultCoordinate implements Coordinates {
  constructor(
    public type: string,
    public horizontal: number,
    public vertical: number
  ) {}
}
