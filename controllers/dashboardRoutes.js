
const router = require("express").Router();
const { Will } = require("../models/");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (req, res) => {
    Will.findAll({
      where: {
        userId: req.session.userId
      }
    })
      .then(willData => {
        const wills = willData.map((will) => will.get({ plain: true }));
        res.render("all-posts-admin", {
          layout: "dashboard",
          wills
        });
      })
      .catch(err => {
        console.log(err);
        res.redirect('login');
      });
});
module.exports = router;