const mongoose = require('mongoose');
const History = mongoose.model('history');

module.exports = function(doc, kind) {
  History.create({
    doc: {
      kind,
      data: {_id: doc._id, name: doc.name}
    },
    createdAt: new Date(),
    action: 'deleted'
  });
};
