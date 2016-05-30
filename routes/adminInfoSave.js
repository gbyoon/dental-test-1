var express = require('express');
var mongoose = require('mongoose');
var events = require('events');
var util = require('util');
var router = express.Router();

/* Save administrator info. */
router.get('/', function(req, res, next) {

	var db = req.db;
	var Manger = req.manager;

	var admin = new Manger();

	admin.adminName = req.query.name;
	admin.adminId = req.query.id;
	admin.adminPwd = req.query.pwd;

	admin.save(function(err,docs){
		//Dental.find({adminName: 'xxxxxxx', adminPwd: 'yyyyyyyy'},function(err,docs){
		//console.log('inserted '+doc[0]._id+':'+doc[0].city);
		if(err) 
			return console.error(err);

		//res.render('userlist', {
		//"userlist" : docs
		//});
		//console.log(docs);	
		if (docs == null)
			console.log("not data")

		//console.log('inserted '+doc[0].username+':'+doc[0].age);
		//console.log('inserted ' + docs.adminId +' : ' + docs.adminName  +' : ' + docs.adminPwd );
		console.log('inserted ' + docs );

		res.end('insert success');
	});

});

module.exports = router;
