import { describe, expect, it } from 'vitest';
import { EXERCISES, generateExercises } from './exercises';

describe('exercise data', () => {
  it('creates the requested number of exercises', () => {
    const items = generateExercises(5);

    expect(items).toHaveLength(5);
    expect(items[0]).toMatchObject({
      id: 'e1',
      trainer: 'Minh Khang',
      group: 'Ngực',
    });
    expect(items[4].duration).toBeGreaterThanOrEqual(30);
    expect(items[4].duration).toBeLessThanOrEqual(120);
  });

  it('exports a large seeded exercise list', () => {
    expect(EXERCISES).toHaveLength(10000);
    expect(EXERCISES[0].name).toContain('Đẩy');
    expect(EXERCISES[9999].id).toBe('e10000');
  });
});
