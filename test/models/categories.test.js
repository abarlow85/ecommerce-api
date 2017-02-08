const {expect, request, app, Category, Product} = require('../test_helper');

describe('Category Model Validation', () => {

  it('fails when name is invalid', (done) => {
    Category.create({
      name: 'a'
    }).then(category => {
      done(category);
    }).catch(err => {
      done();
    });
  });
  it('adds displayName in Title Case', done => {
    Category.create({
      name: 'a tEsT CaSE'
    }).then(category => {
      expect(category.displayName).toBe('A Test Case');
      done();
    }).catch(err => done(err));
  });


});
