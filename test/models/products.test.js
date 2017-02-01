const {expect, request, app, Product, populateProducts} = require('../test_helper');

beforeEach(populateProducts);

describe('Product Model Validation', () => {
  it('fails when name is invalid', (done) => {
    Product.create({
      name: 'a',
      description: 'Valid Desc',
      price: '19.99'
    }).then(product => {
      done(product);
    }).catch(err => {
      done();
    });
  });
  it('fails when description is invalid', (done) => {
    Product.create({
      name: 'Valid Name',
      description: 'a',
      price: '19999'
    }).then(product => {
      done(product);
    }).catch(err => {
      done();
    });
  });
  it('fails when price is invalid', (done) => {
    Product.create({
      name: 'Valid Name',
      description: 'Valid Desc',
      price: '19.999'
    }).then(product => {
      done(product);
    }).catch(err => {
      done();
    });
  });

  it('saves price in cents', done => {
    const productOne = new Product({
      name: 'One',
      description: 'One',
      price: '19.64'
    });
    const productTwo = new Product({
      name: 'Two',
      description: 'Two',
      price: '9.00'
    });
    const productThree = new Product({
      name: 'Three',
      description: 'Three',
      price: '199'
    });

    Promise.all([productOne.save(), productTwo.save(), productThree.save()])
      .then(products => {
        products.forEach(product => {
          switch (product.name) {
            case 'One':
              expect(product.price).toEqual(1964);
              break;
            case 'Two':
              expect(product.price).toEqual(900);
              break;
            case 'Three':
              expect(product.price).toEqual(19900);
          }
        });
        done();
      })
      .catch(err => done(err));
  });
});
