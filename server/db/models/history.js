const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
  doc: {
    type: Schema.Types.Mixed
  },
  createdAt: {
    type: Date,
  },
  action: {
    type: String,
  },
  fields: {
    type: [String]
  }
});

const History = mongoose.model('history', HistorySchema);

module.exports = History;
