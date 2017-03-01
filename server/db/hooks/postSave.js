const mongoose = require('mongoose');
const History = mongoose.model('history');

module.exports = function(doc, kind) {
  History.create({
    doc: {
      kind,
      data: {_id: doc._id, name: doc.name}
    },
    createdAt: doc.wasNew ? doc.createdAt : doc.updatedAt,
    action: doc.wasNew ? 'added' : 'changed',
    fields: doc.wasNew ? undefined : doc.updatedFields
  });
};
