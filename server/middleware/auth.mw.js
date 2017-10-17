exports.isLoggedIn = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

exports.isAdmin = function(req, res, next) {
    if (req.user.role === 'admin') {
        next();
    } else {
        res.sendStatus(403);
    }
}

// exports.isManager = function(req, res, next) {
//     var role = req.user.role;
//     if (role === 'manager' || role === 'admin') {
//         next();
//     } else {
//         res.sendStatus(403);
//     }
// }