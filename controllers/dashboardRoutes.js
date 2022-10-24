const router = require("express").Router();
const { Will, Item, User } = require("../models/");
const withAuth = require("../utils/auth");


// router.get("/", withAuth, async (req, res) => {
//   try {
//     const willData = await User.findOne({
//       attributes: { exclude: ['password'] },
//       where: {
//         id: req.session.user_id
//       },
//       plain: true,
//       include: [
//         {
//           model: Will,
//           include: [
//             {
//               model: Item,
//               }
//           ]
//         },
//       ]
//     });
//     const wills = willData.map((will) => will.get({ plain: true }));
//         console.log(JSON.stringify(willData, null, 2));
//         res.render('dashboard', {
//           wills,
//           logged_in: req.session.logged_in
//         });   
//     } catch(err) {
//   console.log(err);
//   res.redirect('login');
// }});
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
      const username = wills[0].user.name;
      res.render("dashboard", {
        ...dbWillData,
        wills,
        username,
        logged_in: req.session.logged_in
      });
    })
    .catch (err => {
      console.log(err);
      res.redirect('login');
    });
});