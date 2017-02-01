const fs = require('fs');

const router = require('express').Router();

router.get('/', (req, res) => {
  res.send({hello: 'admin'});
});

fs.readdirSync(__dirname).forEach(file => {
  if (!file.includes('index') && file.includes('.js')) {
    try {
      require(`./${file}`)(router);
    } catch (e) {
      console.warn('Unable to require file', file);
    }

  }
});

module.exports = router;
