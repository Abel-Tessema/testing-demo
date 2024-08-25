const {fizzBuzz} = require("../exercise1");

describe('fizzBuzz', () => {
  it.each([null, undefined, '', {}, true])('should throw an error if input is not a number: %s', (arg) => {
    expect(() => fizzBuzz(arg)).toThrow();
  });
  
  it('should return \'FizzBuzz\' if input is divisible by both 3 and 5', () => {
    const result = fizzBuzz(15);
    expect(result).toBe('FizzBuzz');
  });
  
  it('should return \'Fizz\' if input is divisible by 3 and not by 5', () => {
    const result = fizzBuzz(3);
    expect(result).toBe('Fizz');
  });
  
  it('should return \'Buzz\' if input is divisible by 5 and not by 3', () => {
    const result = fizzBuzz(5);
    expect(result).toBe('Buzz');
  });
  
  it('should return the input if it is divisible by neither 3 nor 5', () => {
    const result = fizzBuzz(1);
    expect(result).toBe(1);
  });
});