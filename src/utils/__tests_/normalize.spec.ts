import { normalize } from '..';

const setUp = (string: string): string => normalize(string);

it('return string type "Test string" equal "test-string"', () => {
  expect(setUp('Test string')).toBe('test-string');
  expect(setUp('T e st string')).toBe('t-e-st-string');
  expect(setUp('test s TRING')).toBe('test-s-tring');
  expect(setUp('12 3')).toBe('12-3');
});