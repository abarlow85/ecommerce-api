const {expect, request, app, Product, Category} = require('../../test_helper');

let category;
before(done => {
  Category.findOne({name: 'cat one'})
  .then(result => {
    category = result;
    done();
  });
});

describe('Admin Product routes', () => {

  it('GET /admin/products responds with products', done => {
    request(app)
      .get('/admin/products')
      .end((err, response) => {
        Product.count()
          .then(count => {
            expect(response.body.length).toBe(count);
            done();
          });
      });
  });

  it('POST to /admin/products saves a new product', (done) => {

    const body = {
      name: 'Test Product',
      description: 'A great test',
      price: '19.99',
      category
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

  it('GET to /admin/products/:id finds a product', done => {

    Product.create({
      name: 'Test Product',
      description: 'A great test',
      price: '19.99',
      category
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

  it('GET to /admin/products/:id DOES NOT find a product', done => {

    request(app)
      .get(`/admin/products/123123123123`)
      .expect(404)
      .end((err, response) => {
        if (err) return done(err);
        done();
      });

  });

  it('PUT to /admin/products/:id updates a product', done => {
    Product.findOne({name: 'One'})
      .then(product => {
        const body = {
          name: 'Updated One',
          description: 'Updated One',
          price: '88.88',
          category
        };
        request(app)
          .put(`/admin/products/${product._id}`)
          .send(body)
          .end((err, response) => {
            if (err) return done(err);
            expect(response.body).toInclude({ name: body.name, description: body.description, price:8888 });
            done();
          });

      });
  });

  it('DELETE to /admin/products/:id removes a product', done => {
    Product.findOne({name: 'One'})
      .then(product => {
        request(app)
          .delete(`/admin/products/${product._id}`)
          .expect(response => {
            expect(response.body).toInclude({name: 'One'});
          })
          .end((err, response) => {
            if (err) done(err);
            Product.findOne({name:'One'})
              .then(response => {
                expect(response).toNotExist();
                done();
              }).catch(err => done(err));
          });
      }).catch(err => done(err));

  });

});
