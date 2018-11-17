
const passport = require("../config/passport");
const db = require("../models");


module.exports = function (app) {

  app.post('/api/login', passport.authenticate('local'), function (req, res) {
      console.log(req.user);
      res.json("/main");
    });

  app.post("/api/signup", function (req, res) {
    console.log("API post new user");
    console.log(req.body);
    db.Users.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    }).then(function (userInfo) {
      // Upon successful signup, log user in
      req.login(userInfo, function (err) {
        if (err) {
          console.log(err)
          return res.status(422).json(err);
        }
        console.log(req.user);
        return res.json("/main");
      });
    }).catch(function (err) {
      console.log(err);
      res.status(422).json(err);
    });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });


};
