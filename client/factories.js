angular.module('blog.factories', [])

    .factory('Users', ['$resource', function ($resource) {
        return $resource('/api/users/:id');
    }])

    .factory('CreateUsers', ['$resource', function ($resource) {
        return $resource('/api/users/createuser/:id', { id: '@id'}, {
            update: {
                method: 'PUT'
            }
        });
    }])

    .factory('Categories', ['$resource', function ($resource) {
        return $resource('/api/categories/:id');
    }])

    .factory('Posts', ['$resource', function ($resource) {
        return $resource('/api/posts/:id', { id: '@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }]);
