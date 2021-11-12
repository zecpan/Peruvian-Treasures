import { Adventurer } from './adventurer';
import { Map } from './map';
import { Mountain } from './mountain';
import { Treasur } from './treasur';

describe('Adventurer', () => {
  let adventurer = new Adventurer('A', 'TOTO', 2, 2, 'O', 'AA', 0);
  let treasur = new Treasur('T', 1, 2, 1);
  let treasur2 = new Treasur('T', 0, 0, 0);
  let mountain = new Mountain('M', 0, 2);
  let map: Map;
  beforeEach(() => {
    map = new Map(
      'C',
      3,
      4,
      new Array<Mountain>(mountain),
      new Array<Treasur>(treasur, treasur2),
      new Array<Adventurer>(adventurer)
    );
    adventurer.orientation = 'O';
  });

  it('should have an orientation', () => {
    expect(adventurer.orientation).toBe('O');
  });

  it('could turn left', () => {
    adventurer.gauche(adventurer.orientation);
    expect(adventurer.orientation).toBe('S');
  });

  it('could turn right', () => {
    adventurer.droite(adventurer.orientation);
    expect(adventurer.orientation).toBe('N');
  });

  it('could move forward', () => {
    adventurer.avancer(adventurer.orientation, map);
    expect(adventurer.horizontal).toBe(1);
  });

  it('could find some treasures', () => {
    adventurer.lookingForTreasur(1, 2, map);
    expect(adventurer.nbTreasur).toBe(1);
    expect(map.treasures[0].nbTreasur).toBe(0);
  });

  it("couldn't climb a mountain", () => {
    adventurer.startMotion(map);
    expect(adventurer.horizontal).toBe(1);
  });

  it('could be valid', () => {
    expect(adventurer.isValid()).toBeTrue();
  });

  it("couldn't be invalid", () => {
    let invalidAdventurer = new Adventurer('A', 'TITI', 2, 2, 'B', 'AA', 0);
    expect(invalidAdventurer.isValid()).toBeFalse();
  });

  it("couldn't find more treasures than a treasur can offer", () => {
    let adventurerTreasures = adventurer.nbTreasur;
    adventurer.lookingForTreasur(0, 0, map);
    expect(adventurer.nbTreasur).toEqual(adventurerTreasures);
  });
});

describe('Map', () => {
  let adventurer = new Adventurer('A', 'TOTO', -1, 2, 'O', 'AAAGADA', 0);
  let treasur = new Treasur('T', 0, 4, 1);
  let mountain = new Mountain('M', 3, -5);
  let map = new Map(
    'C',
    3,
    4,
    new Array<Mountain>(),
    new Array<Treasur>(treasur),
    new Array<Adventurer>(adventurer)
  );

  it('could check coordinates of adventurer', () => {
    expect(map.checkCoordinates(adventurer)).toBeFalse();
  });

  it('could check coordinates of treasur', () => {
    expect(map.checkCoordinates(treasur)).toBeFalse();
  });

  it('could check coordinates of mountain', () => {
    expect(map.checkCoordinates(mountain)).toBeFalse();
  });
});
