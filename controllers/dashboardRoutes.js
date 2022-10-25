const router = require("express").Router();
const { Will, Item, User } = require("../models/");
const withAuth = require("../utils/auth");


module.exports = router;
router.get("/", withAuth, (req, res) => {
  Will.findAll({
    where: {
      user_id: req.session.user_id
    },
    include: [
      {
        model: User,
        include: [
          {
            model: Item,
          }
        ]
      }
    ]
  })
    .then(dbWillData => {
      const wills = dbWillData.map((will) => will.get({ plain: true }));
      console.log(wills);
      res.render('dashboard', {
        ...dbWillData,
        wills,
        logged_in: req.session.logged_in
      });
    })
    .catch (err => {
      console.log(err);
      res.redirect('login');
    });
});