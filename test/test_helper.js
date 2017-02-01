const expect = require('expect');
const request = require('supertest');
const app = require('../server/app');
const mongoose = require('mongoose');
const Product = mongoose.model('product');

const populateProducts = done => {

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

  Product.remove({})
    .then(() => {
      return Promise.all([productOne.save(), productTwo.save(), productThree.save()]);
    })
    .then(() => done())
    .catch(err => {
      console.log(err);
      done(err);
    });
};


//
// beforeEach((done) => {
//   Product.remove({})
//     .then()
// });

module.exports = {
  expect,
  request,
  app,
  Product,
  populateProducts
};
