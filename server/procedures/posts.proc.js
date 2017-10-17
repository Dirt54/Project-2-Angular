var db = require('../config/db');

exports.allPosts = function() {
    return db.rows('getPosts');
}

exports.makePost = function(title, usid, catid, content) {
    return db.row('insertPost', [title, usid, catid, content]);
}


exports.singlePost = function(id) {
    return db.row('getSinglePost', [id]);
}


exports.editPost = function(id, title, content, categoryid) {
    return db.empty('updatePost', [id, title, content, categoryid]);
}

exports.delPost = function(id) {
    return db.empty('deletePost', [id]);
}
