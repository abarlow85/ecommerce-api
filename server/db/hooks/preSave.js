module.exports = function(next) {
  this.wasNew = this.isNew;
  this.updatedFields = this.modifiedPaths().filter(path => path !== 'updatedAt');
  next();
};
