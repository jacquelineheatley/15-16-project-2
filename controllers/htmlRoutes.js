const router = require('express').Router();

const { Will, User, Item } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        // get all Wills and JOIN with user data
        const willData = await Will.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
            ],
        });

        // serialize data so the handlebars template can read it
        const wills = willData.map((will) => will.get({ plain: true }));

        res.render('homepage', {
            wills,
            logged_in: req.session.logged_id
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// get Will by ID
router.get('/will/:id', async (req, res) => {
    try {
      const willData = await Will.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
  
      const itemDataDb = await Item.findAll({
        where: {
          will_id: req.params.id
        },
        attributes: ["id", "content", "createdAt"],
        include: {
          model: User,
          attributes: ["name"]
        }
      })
  
      const will = await willData.get({ plain: true });
  
      const itemData = await itemDataDb.map(item => item.get({ plain: true }));
      willData.items = itemData;
      console.log('WILL:', will);
      console.log('ITEMS:', itemData);
      res.render('will', {
        itemData,
        ...will,
        logged_in: req.session.logged_in
      });
  
    } catch (err) {
      res.status(500).json(err);
    }
  });

modules.exports = router;