const {
  describe
} = require('jest-circus');
const {
  default: each
} = require('jest-each');
const ex = require('../examples');

describe('absolute', () => {
  it('should possitive input positive', () => {
    // Arrange
    const input = 2;
    // Act
    const result = ex.absolute(input);

    // Assert
    expect(result).toBe(input);
  });
  test('should possitive input negative', () => {
    // Arrange
    const input = -2;
    // Act
    const result = ex.absolute(input);

    // Assert
    expect(result).toBe(Math.abs(input));
  });

  test('should zero input zero', () => {
    // Arrange
    const input = 0;
    // Act
    const result = ex.absolute(input);

    // Assert
    expect(result).toBe(0);
  });


});

describe('absolute parameterized', () => {
  each([
    [2, 2],
    [-10, 10],
    [0, 0]
  ]).it("when the input is '%s'", (input, expected) => {
    const result = ex.absolute(input);
    expect(result).toBe(expected);
  });
});