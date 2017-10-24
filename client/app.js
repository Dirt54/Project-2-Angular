angular.module('myApp', ['ngRoute', 'ngResource', 'blog.controllers', 'blog.factories', 'myApp.services'])
.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
        templateUrl: 'views/posts.html',
        controller: 'postsController'
    })
    .when('/donate', {
        templateUrl: 'views/donations.html',
        controller: 'donationController'
    })
    .when('/compose', {
        templateUrl: 'views/compose.html',
        controller: 'composeController'
    })
    .when('/createusers', {
        templateUrl: 'views/createusers.html',
        controller: 'createusersController'
    })
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'loginController'
    })
    .when('/:someId/update', {
        templateUrl: 'views/update.html',
        controller: 'updateController'
    })
    .when('/:someId', {
        templateUrl: 'views/single_view.html',
        controller: 'singleView'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);