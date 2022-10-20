const router = require("express").Router();
const { Will } = require("../models/");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
    Will.findAll({
      where: {
        user_id: req.session.user_id
      }
    })
      .then((dbWillData, dbItemData) => {
        const wills = dbWillData.map((will) => will.get({ plain: true }));
        const items = dbItemData.map((item) => item.get({ plain: true }));
        res.render("all-posts-admin", {
          layout: 'dashboard',
          wills,
          items
        });
      })
      .catch(err => {
        console.log(err);
        res.redirect('login');
      });
});
module.exports = router;