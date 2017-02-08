const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductCategorySchema = new Schema({
  name: {
    type: String,
    required: [true, '{PATH} is required.'],
    minlength: [2, '{PATH} must be more than {MINLENGTH} characters'],
    unique: true,
    lowercase: true,
    trim: true
  },
  displayName: {
    type: String,
    required: true
  }
}, {timestamps:{}});

ProductCategorySchema.pre('validate', function(next){
  const category = this;
  if (!category.name) return next();
  category.displayName = toTitleCase(category.name);
  next();

});

ProductCategorySchema.pre('findOneAndUpdate', function(next){
  const category = this;
  if (!category._update.name) return next();

  category._update.displayName = toTitleCase(category._update.name);

  next();

});

function toTitleCase(string) {
  return string.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

const ProductCategory = mongoose.model('product_category', ProductCategorySchema);

module.exports = {
  ProductCategory,
  ProductCategorySchema
};
