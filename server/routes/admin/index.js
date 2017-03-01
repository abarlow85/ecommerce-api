const fs = require('fs');
const mongoose = require('mongoose');
const router = require('express').Router();
const _ = require('lodash');
const authenticate = require('../../middleware/authenticate');
const History = mongoose.model('history');

router.all('*', authenticate);

router.get('/', (req, res) => {
  const collections = _.omit(mongoose.models, 'user', 'history');
  const models = Object.keys(collections).map(model => {
    return {
      name: model.includes('_') ? model.split('_').join(' ') : model,
      route: model
    };
  });

  History
  .find(
    {$or: [
      {fields: {$gt: [] }},
      {action: 'added'},
      {action: 'deleted'}
    ]
  })
  .sort('-createdAt').limit(10)
  .then(history => {
    res.send({models, history});
  });
});

require('./collections')(router);

module.exports = router;
