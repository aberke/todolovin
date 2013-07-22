var TodolovinApp = angular.module('TodolovinApp', []);

// TodolovinApp.config(function ($routeProvider, $locationProvider) {
//     $routeProvider
//         .when('/login', {template: " ", controller: 'TodolovinController'})
//         .otherwise({ redirectTo: '' });

//         $locationProvider.html5Mode(true);
// });

TodolovinApp.service('TodolovinService', function($http, $q) {
    this.create_user = function(tf_login, password){
        return post_user_data(tf_login, password, 'create');
    };
    this.login_user = function(tf_login, password){
        return post_user_data(tf_login, password, 'login');
    }
    var post_user_data = function(tf_login, password, type){
        var deferred = $q.defer();
        $http({
            method: 'POST', 
            url: '/create-todo/',
            data: {'tf_login': tf_login, 'password': password},
        })        
        .success(function(returnedData){deferred.resolve(returnedData);})
        .error(function(){deferred.resolve(500);});
       return deferred.promise;
    }
});
function TodolovinController($scope, $route, $window, $location, TodolovinService){


}