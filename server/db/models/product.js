const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, '{PATH} is required'],
    minlength: [2, '{PATH} must be more than {MINLENGTH} characters'],
    trim: true
  },
  description: {
    type: String,
    required: [true, '{PATH} is required'],
    minlength: [2, '{PATH} must be more than {MINLENGTH} characters'],
    maxlength: [255, '{PATH} must be less than {MAXLENGTH} characters'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, '{PATH} is required'],
    min: [1, '$1.00 minimum required'],
    validate: {
      validator: validatePrice,
      message: 'Price entered is not valid currency'
    }
  }
});

function validatePrice(price, next) {

  if (!validator.isCurrency(''+price, {allow_negatives: false})) {
    next(false);
  } else {
    next(true);
  }

}

ProductSchema.pre('save', function(next){
  const product = this;

  const price = ''+product.price;

  if (price.includes('.')) {
    product.price = price.split('.').join('');
  } else {
    product.price *= 100;
  }

  next();
});

const Product = mongoose.model('product', ProductSchema);
module.exports = Product;
