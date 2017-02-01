const {expect, request, app, Product} = require('../../test_helper');

describe('Admin Index', () => {
  it('GET to /admin responds', done => {
    request(app)
      .get('/admin')
      .end((err, response) => {
        expect(response.body).toEqual({hello: 'admin'});
        done();
      });
  });
});
