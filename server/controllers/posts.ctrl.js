var express = require('express');
var procedures = require('../procedures/posts.proc');
var auth = require('../middleware/auth.mw');

var router = express.Router();
    
    
    
    router.route("/")
    .get(function(req, res) {
        procedures.allPosts()
        .then(function(posts) {
            res.send(posts);
        })
        .catch(function(err) {
            console.log(err);
            res.sendStatus(500); 
        });
    })
    .post(function(req, res) {
        var newPost = req.body;
        procedures.makePost(newPost.title, newPost.usid, newPost.catid, newPost.content)
        .then(function(id) {
            res.status(201).send(id);
        })
        .catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    });
    
    
    router.route("/:id")
    .get(function(req, res) {
        procedures.singlePost(req.params.id)
        .then(function(Post) {
            res.send(Post);
        })
        .catch(function(err) {
            res.sendStatus(500);
        });
    })
    
    .put(function(req, res) {
        procedures.editPost(req.params.id, req.body.title, req.body.content, req.body.categoryid)
        .then(function() {
            res.sendStatus(204);
        })
        .catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    })
    
    .delete(auth.isAdmin, function(req, res) {
        procedures.delPost(req.params.id)
        .then(function() {
            res.sendStatus(204);
        })
        .catch(function(err) {
            console.log(err);
            res.sendStatus(500);
        });
    });

    module.exports = router;