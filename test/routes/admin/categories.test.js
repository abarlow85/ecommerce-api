const {expect, request, app, Category} = require('../../test_helper');

describe('Admin Category routes', () => {

  it('GET /admin/categories responds with categories', (done) => {
    request(app)
      .get('/admin/categories')
      .end((err, response) => {
        if (err) return done(err);
        Category.count()
          .then(count => {
            expect(response.body.length).toBe(count);
            done();
          }).catch(err => done(err));
      });
  });

  it('POST to /admin/categories saves a new category', done => {
    const body = {
      name: 'a new cat'
    };

    request(app)
      .post('/admin/categories')
      .send(body)
      .end((err, response) => {
        if (err) return done(err);
        expect(response.body.name).toBe(body.name);
        done();
      });
  });

  it('POST to /admin/categories DOES NOT save a new product with invalid data', done => {
    request(app)
      .post('/admin/categories')
      .send({name: 'a'})
      .expect(422)
      .end((err, response) => {
        Category.findOne({name: 'a'})
          .then(product => {
            expect(product).toNotExist();
            done();
          }).catch(err => done(err));
      });
  });

});

describe('Admin Categories ID', () => {
  let category;

  beforeEach(done => {
    Category.create({
      name: 'another category'
    }).then(newCat => {
      category = newCat;
      done();
    }).catch(err => done(err));
  });

  afterEach(done => {
    Category.remove({name: 'another category'})
      .then(() => done())
      .catch(err => done(err));
  });

  it('GET to /admin/categories/:id finds a category', done => {
    request(app)
      .get(`/admin/categories/${category._id}`)
      .expect(200)
      .end((err, response) => {
        if (err) return done(err);
        expect(response.body).toInclude({
          name: 'another category',
          displayName: 'Another Category'
        });
        done();
      });
  });
  
  it('GET to /admin/categories/:id DOES NOT find a product', done => {

    request(app)
      .get(`/admin/categories/12312312123`)
      .expect(404)
      .end((err, response) => {
        if (err) return done(err);
        done();
      });

  });

  it('PUT to /admin/categories/:id updates a product', done => {
    category.name = 'Updated name';
    request(app)
      .put(`/admin/categories/${category._id}`)
      .send(category)
      .end((err, response) => {
        if (err) return done(err);
        expect(response.body).toInclude({
          name: 'updated name',
          displayName: 'Updated Name'
        });
        done();
      });
  });

  it('DELETE to /admin/categories/:id removes a product', done => {
    request(app)
      .delete(`/admin/categories/${category._id}`)
      .expect(response => {
        expect(response.body).toInclude({name: 'another category'});
      })
      .end((err, respone) => {
        if (err) return done(err);
        Category.findOne({name: 'another category'})
          .then(response => {
            expect(response).toNotExist();
            done();
          }).catch(err => done(err));
      });
  });


});
