var db = require('../config/db');

exports.allCategories = function() {
    return db.rows('getCategories');
}