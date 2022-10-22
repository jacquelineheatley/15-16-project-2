const router = require('express').Router();

const { Will, User, Item } = require('../models');
const withAuth = require('../utils/auth');

// homepage route
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

    res.render("homepage", {
      wills,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get Will by ID
router.get('/will/:id', withAuth, async (req, res) => {
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
    });

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

// use withAuth middleware to prevent access to route
router.get('/dashboard - old', withAuth, async (req, res) => {
  try {
    // find the logged in user based on session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Will }]
    });

    const user = userData.get({ plain: true });
    console.log(user);
    res.render('./views/dashboard', {
      ...user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// login route
router.get('/login', (req, res) => {
  // if user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

// edit-will page route
router.get('/edit/:id', withAuth, async (req, res) => {
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
        will_id: req.params.id,
        user_id: req.session.user_id
      },
      attributes: ["id", "content", "createdAt"],
      include: {
        model: User,
        attributes: ["name"]
      }
    });

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

module.exports = router;