const { Item } = require('../../models');
const router = require('express').Router();

router.post('/', async (req, res) => {
    Item.create({ 
        ...req.body, 
        user_id: req.session.user_id 
    })
    .then(newItem => {
      console.log(newItem);
      res.json(newItem);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})

module.exports = router;

