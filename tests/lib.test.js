const lib = require('../lib');

describe('absolute', () => {
  it('should return a positive number if input is positive', () => {
    const result = lib.absolute(1);
    expect(result).toEqual(1);
  });
  
  it('should return a positive number if input is negative', () => {
    const result = lib.absolute(-1);
    expect(result).toEqual(1);
  });
  
  it('should return 0 if input is 0', () => {
    const result = lib.absolute(0);
    expect(result).toEqual(0);
  });
});

describe('greet', () => {
  it('should return the greeting message', () => {
    const result = lib.greet('Bela');
    expect(result).toMatch(/Bela/);
    expect(result).toContain('Bela');
  });
});