var knex = require('../../../db/knex.js');
var express = require('express');
var router = express.Router();

function Animals() {
	return knex('inventory');
}

router.get('/', function(req, res, next) {

	Animals().select('*').orderBy('animal_name').then(function(result){
			res.render('index', {
				'title': 'Super Slow Pets',
				'animals': result
		});
	});
});

router.get('/json/inventory', function(req, res, next) {
	Animals().select().then(function(results) {
		res.json(results);
	});
});

//admin 
router.get('/admin', function(req, res, next) {

	res.render('admin', {
		title: 'Super Slow Pets'
	});
});

//profile
router.get('/profile', function(req, res, next) {

	res.render('profile', {
		title: 'Super Slow Pets: Customer Profile'
	});
});

module.exports = router;
