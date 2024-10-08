const lib = require('../lib');
const db = require('../db');
const mail = require('../mail');

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

describe('getCurrencies', () => {
  it('should return supported currencies', () => {
    const result = lib.getCurrencies();
    
    // Too general
    expect(result).toBeDefined();
    expect(result).not.toBeNull();
    
    // Too specific
    expect(result[0]).toBe('USD');
    expect(result[1]).toBe('AUD');
    expect(result[2]).toBe('EUR');
    expect(result.length).toBe(3);
    
    // Proper way
    expect(result).toContain('USD');
    expect(result).toContain('AUD');
    expect(result).toContain('EUR');
    
    // Ideal way
    expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']));
  });
});

describe('getProduct', () => {
  it('should return a product with the given id', () => {
    const result = lib.getProduct(1);
    expect(result).toEqual({id: 1, price: 10}); // Too specific
    expect(result).toMatchObject({id: 1});
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('id', 1);
  });
});

describe('registerUser', () => {
  // it('should throw an error if username is falsy', () => {
  //   // Falsy values: null, undefined, NaN, '', 0, false
  //   const args = [null, undefined, NaN, '', 0, false];
  //   args.forEach(arg => expect(() => lib.registerUser(arg)).toThrow());
  // });
  it.each([null, undefined, NaN, '', 0, false])('should throw an error if username is %s', (arg) => {
    expect(() => lib.registerUser(arg)).toThrow();
  });
  
  it('should return a user object if a valid username is supplied', () => {
    const result = lib.registerUser('bela-jash');
    expect(result).toMatchObject({username: 'bela-jash'});
    expect(result.id).toBeGreaterThan(0);
  });
});

describe('applyDiscount', () => {
  it('should apply a 10% discount if a customer has more than 10 points', () => {
    db.getCustomerSync = function(id) {
      console.log('Fake reading customer...');
      return {id: id, points: 20};
    }
    
    const order = {customerId: 1, totalPrice: 10};
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

describe('notifyCustomer', () => {
  it('should send an email to the customer', () => {
    // const mockFunction = jest.fn();
    // mockFunction.mockReturnValue(1);
    // mockFunction.mockResolvedValue(1);
    // mockFunction.mockRejectedValue(new Error('Rejected error'));
    // const result = mockFunction();
    
    db.getCustomerSync = jest.fn().mockReturnValue({email: 'a'});
    mail.send = jest.fn();
    lib.notifyCustomer({customerId: 1});
    expect(mail.send).toHaveBeenCalled();
    expect(mail.send).toHaveBeenCalledWith('a', 'Your order was placed successfully.'); // It needs exact values, hence too specific.
    expect(mail.send.mock.calls[0][0]).toBe('a'); // mail.send.mock.calls[firstCallToTheMethod][firstArgument]
    expect(mail.send.mock.calls[0][1]).toMatch(/order/); // mail.send.mock.calls[firstCallToTheMethod][secondArgument]
    
    // db.getCustomerSync = function(id) {
    //   return {email: 'a'};
    // }
    //
    // let mailSent = false;
    // mail.send = function(email, message) {
    //   mailSent = true;
    // }
    //
    // lib.notifyCustomer({customerId: 1});
    //
    // expect(mailSent).toBe(true);
  });
});