const {expect, request, app, Product, populateProducts} = require('../../test_helper');

beforeEach(populateProducts);

describe('Admin Product routes', () => {

  it('GET /admin/products responds with products', done => {
    request(app)
      .get('/admin/products')
      .end((err, response) => {
        expect(response.body.length).toBe(3);
        done();
      });
  });

  it('POST to /admin/products saves a new product', (done) => {

    const body = {
      name: 'Test Product',
      description: 'A great test',
      price: '19.99'
    };

    request(app)
      .post('/admin/products')
      .send(body)
      .end((err, response) => {
        if (err) return done(err);
        expect(response.body.name).toBe(body.name);
        done();
      });

  });

  it('POST to /admin/products DOES NOT save a new product with invalid data', (done) => {
    request(app)
      .post('/admin/products')
      .send({name: 'Invalid Product'})
      .expect(422)
      .end((err, response) => {
        if (err) return done(err);
        Product.findOne({name: 'Invalid Product'})
          .then(product => {
            expect(product).toNotExist();
            done();
          })
          .catch(err => done(err));
      });

  });
});

describe('Admin Products ID', () => {
  it('GET to /admin/products/:id find a product', done => {

    Product.create({
      name: 'Test Product',
      description: 'A great test',
      price: '19.99'
    })
    .then(product  => {
      request(app)
        .get(`/admin/products/${product._id}`)
        .expect(200)
        .end((err, response) => {
          if (err) done(err);

          expect(response.body).toInclude({
            name: 'Test Product',
            description: 'A great test',
            price: 1999
          });
          done();
        });
    }).catch(err => done(err));

  });
});
