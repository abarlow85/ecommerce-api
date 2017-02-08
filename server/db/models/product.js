const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const { ProductCategorySchema } = require('./productCategory');

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
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'product_category',
    required: true
  }
}, {timestamps: {}});

function validatePrice(price, next) {
  if (!validator.isCurrency(''+price, {allow_negatives: false})) {
    next(false);
  } else {
    next(true);
  }

}

function convertPrice(price) {

  let priceStr = ''+price;

  if (priceStr.includes('.')) {
    price = priceStr.split('.');

    if (price.length > 2) return priceStr;

    price = price.join('');
  } else {
    price *= 100;
  }

  return price;
}

ProductSchema.pre('save', function(next){
  const product = this;

  product.price = convertPrice(product.price);

  next();
});

ProductSchema.pre('findOneAndUpdate', function(next){
  validatePrice(this._update.price, valid => {
    if (!valid) {
      return next(valid);
    }
    this._update.price = convertPrice(this._update.price);
    next();
  });
});

ProductSchema.pre('find', function(next) {
  this.populate('category');
  next();
});

const Product = mongoose.model('product', ProductSchema);
module.exports = Product;
