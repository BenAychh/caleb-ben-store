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



module.exports = router;
