var express = require('express');
var session = require('express-session');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  /*
  req.session.destroy(function(err) {
      if(err) {
        console.log(err);
      } else {
        res.redirect('/login');
      }
  });
  */
  //req.session.email = null;
  //req.session.admin = false;
  //res.end('done');
  //res.redirect('/login');
  //res.render('logout', { title: 'Log in' });

  req.session.destroy();
  res.redirect('/adminLogin');
});

module.exports = router;
