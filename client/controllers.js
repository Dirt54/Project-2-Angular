angular.module('blog.controllers', [])

    .controller('createusersController', ['$scope', 'CreateUsers', '$location', '$routeParams', 'UserService', 'SEOService', function ($scope, Users, $location, $routeparams, UserService, SEOService) {
        $scope.user = Users.query();
        var me = UserService.me();

        UserService.me().then(function (me) {
            if (me.role === "user") {
                $location.path('/');
            }
        });



        $scope.createUsers = function () {
            var payload = {
                firstname: $scope.newFirstname,
                lastname: $scope.newLastname,
                email: $scope.newEmail,
                password: $scope.newPassword,
                role: $scope.newRole
            };
            var p = new Users(payload);
            p.$save(function (success) {
                $scope.newFirstname = '';
                $scope.newLastname = '';
                $scope.newEmail = '';
                $scope.newPassword = '';
                $scope.newRole = '';
            }, function (err) {
                console.log(err);
            });
        }
           

            SEOService.setSEO({        
                title: 'Create Users',        
                image: 'http://'+$location.host() +'/images/contact-us-graphic.png',        
                url: $location.url(),        
                description: 'Admins can create users'    
            });
        
    }])

    .controller('updateController', ['$scope', 'Users', 'Categories', 'Posts', '$location', '$routeParams', 'SEOService', function ($scope, Users, Categories, Posts, $location, $routeParams, SEOService) {
        $scope.user = Users.query();
        $scope.category = Categories.query();

        $scope.post = Posts.get({ id: $routeParams.someId });
        // id, title, content, categoryid
        var editPost = ($scope.post.title, $scope.post.content, $scope.post.newcategoryid);
        $scope.updatePost = function () {
            $scope.post.$update(function () {
                window.history.back();
            }, function (err) {
                console.log(err);
            });
        }

        SEOService.setSEO({        
            title: 'Update Post',        
            image: 'http://'+$location.host() +'/images/contact-us-graphic.png',        
            url: $location.url(),        
            description: 'Update Posts'    
        });

    }])

    .controller('singleView', ['$scope', 'Users', 'Categories', 'Posts', '$location', '$routeParams', 'SEOService', function ($scope, Users, Categories, Posts, $location, $routeParams, SEOService) {
        $scope.post = Posts.get({ id: $routeParams.someId });
        console.log($scope.post);

        $scope.editPost = function () {
            $location.path('/' + $routeParams.someId + '/update');
        }

        $scope.deletePost = function () {
            if (confirm('Are you sure you want to delete this Post?')) {
                $scope.post.$delete(function () {
                    $location.replace().path('/');
                }, function (err) {
                    console.log(err);
                });
            }
        }

        SEOService.setSEO({        
            title: 'Single Post',        
            image: 'http://'+$location.host() +'/images/contact-us-graphic.png',        
            url: $location.url(),        
            description: 'View one post at a time'    
        });

    }])

    .controller('postsController', ['$scope', 'Users', 'Categories', 'Posts', '$location', '$routeParams', 'SEOService', function ($scope, Users, Categories, Posts, $location, $routeParams, SEOService) {
        // $scope.user = Users.query();
        // $scope.category = Categories.query();
        $scope.post = Posts.query();
        $scope.composePage = function () {
            $location.path('/compose');
        }

        $scope.singleRead = function (x) {
            $location.path('/' + x);
        }
        // var payload = {

        // }
        var p = new Posts();

        SEOService.setSEO({        
            title: 'Posts',        
            image: 'http://'+$location.host() +'/images/contact-us-graphic.png',        
            url: $location.url(),        
            description: 'View all posts'    
        });

    }])

    .controller('composeController', ['$scope', 'Users', 'Categories', 'Posts', '$location', 'SEOService', function ($scope, Users, Categories, Posts, $location, SEOService) {
        $scope.user = Users.query();
        $scope.category = Categories.query();
        $scope.post = Posts.query();

        // $scope.savePost = function() {
        //     if (confirm("Create this post?")) 
        // };

        $scope.createPost = function () {
            var payload = {
                title: $scope.newTitle,
                usid: $scope.newUserId,
                catid: $scope.newCategoryId,
                content: $scope.newContent
            };
            var p = new Posts(payload);
            p.$save(function (success) {
                $scope.newTitle = '';
                $scope.newUserId = '';
                $scope.newCategoryId = '';
                $scope.newContent = '';
                window.history.back();
            }, function (err) {
                console.log(err);
            });
        }

        SEOService.setSEO({        
            title: 'Create Post',        
            image: 'http://'+$location.host() +'/images/contact-us-graphic.png',        
            url: $location.url(),        
            description: 'Make a new post'    
        });

    }])

    .controller('loginController', ['$scope', '$location', 'UserService', 'SEOService', function ($scope, $location, UserService, SEOService) {
        UserService.me().then(function (success) {
            redirect();
        });
        function redirect() {
            var dest = $location.search().dest;
            if (!dest) {
                dest = '/';
            }
            $location.replace().path(dest).search('dest', null);
        }

        $scope.login = function () {
            UserService.login($scope.email, $scope.password)
                .then(function () {
                    redirect();
                }, function (err) {
                    console.log(err);
                });
        }

        SEOService.setSEO({        
            title: 'Login',        
            image: 'http://'+$location.host() +'/images/contact-us-graphic.png',        
            url: $location.url(),        
            description: 'Log into your account'    
        });

    }])

    .controller('donationController', ['$scope', function($scope) {
        var elements = stripe.elements();
        var card = elements.create('card');    
        card.mount('#card-field');
        
        $scope.process = function() {        
            stripe.createToken(card).then(function(result) {
                if (result.error) {
                    $scope.error = result.error.message;            
                } else {
                    // result.token is the actual token to send to our server            
                }        
            });    
        }
    }]);