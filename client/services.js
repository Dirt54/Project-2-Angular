angular.module('myApp.services', [])

.service('SEOService', ['$rootScope', function($rootScope) {
    this.setSEO = function(data) {
        $rootScope.seo = {};
        for(var p in data) {
            $rootScope.seo[p] = data[p];        
        }    
    }
}])

.service('UserService', ['$http', '$location', function ($http, $location) {
    var currentUser;
    this.isLoggedIn = function() {
        if (currentUser) {
            return true;        
        } else {
            return false;        
        }    
    }


this.requireLogin = function() {
    if (!this.isLoggedIn()) {
        var current = $location.path();
        $location.replace().path('/login').search('dest', current);    
    }
}

this.login = function(email, password) {
    return $http({        
        method: 'POST',        
        url: '/api/users/login',        
        data: { email: email, password: password }    
    }).then(function(response) {        
        currentUser = response.data;
        return currentUser;    
    });
}

this.logout = function() {
    return $http({        
        method: 'GET',        
        url: '/api/users/logout'    
    }).then(function() {        
        currentUser = undefined;    
    });
}


this.me = function() {
    if (currentUser) { return Promise.resolve(currentUser); }
    else {return $http({            
        url: 'http://localhost:7000/api/users/me'        
    }).then(function (response) {            
        currentUser = response.data;
        return currentUser;        
    });    
}
}


}]);