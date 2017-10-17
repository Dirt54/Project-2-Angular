var db = require('../config/db');


exports.allUsers = function() {
    return db.rows('getUsers');
}

exports.readByEmail = function(email) {
    return db.row('getUserByEmail', [email]);
}

exports.read = function(id) {
    return db.row('getUser', [id]);
}

exports.makeUser = function(firstname, lastname, email, password, role) {
    return db.row('createUsers', [firstname, lastname, email, password, role]);
}