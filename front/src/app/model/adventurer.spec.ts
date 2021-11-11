import { Adventurer } from './adventurer';

describe('Adventurer', () => {
  let adventurer = new Adventurer('A', 'TOTO', 1, 2, 'O', 'AAAGADA', 0);

  beforeEach(() => {
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
});
