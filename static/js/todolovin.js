var TodolovinApp = angular.module('TodolovinApp', []);

TodolovinApp.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        //.when('/login', {template: " ", controller: 'TodolovinController'})
        .otherwise({ redirectTo: '' });

        $locationProvider.html5Mode(true);
});


function TodolovinController($scope, $route, $q, $http){
    $scope.tags;
    $scope.todos;
    $scope.currentTag;

    var http_post = function(url, data){
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: url,
            data: data
        })
        .success(function(returnedData){deferred.resolve(returnedData);})
        .error(function(){deferred.resolve(500);});
        return deferred.promise;        
    }
    var http_get = function(url){
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: url
        })
        .success(function(returnedData){deferred.resolve(returnedData);})
        .error(function(){deferred.resolve(500);});
        return deferred.promise;        
    }

    var init = function(){
        get_tags().then(function(data){
            if(data!=500){$scope.tags = data;}
        });
        $scope.get_todos_click('all');

    }

    var get_tags = function(){
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: '/get-tags/'
        })
        .success(function(returnedData){deferred.resolve(returnedData);})
        .error(function(){deferred.resolve(500);});
        return deferred.promise;
    }
    var todo_done = function(todo_id){
         var deferred = $q.defer();
        $http({
            method: 'POST',
            url: '/todo-done/',
            data: {'todo_id':todo_id}
        })
        .success(function(returnedData){deferred.resolve(returnedData);})
        .error(function(){deferred.resolve(500);});
        return deferred.promise;       
    }
    $scope.create_todo_submit = function(){
        console.log(this);
        console.log(this.description);
        http_post('/create-todo/', {'description': this.description}).then(function(data){
            console.log(data);
            $scope.todos = data;
        });
    }
    $scope.todo_add_tag = function(todo_id, tag_id){
        $http({
            method: 'POST',
            url: '/todo-add-tag/',
            data: {'todo_id':todo_id, 'tag_id':tag_id}
        });        
    }
    $scope.todo_done_click = function(todo_id){
        document.getElementById('todo-'+todo_id).className="done-true";
        todo_done(todo_id).then(function(data){
            console.log(data);
        })

    }
    $scope.get_todos_click = function(tag){
        var selected = document.getElementsByClassName("nav-item-selected");
        if (selected.length > 0){selected[0].className='nav-item';}
        document.getElementById('tag-'+tag).className="nav-item-selected";
        http_get('/get-todos/'+tag).then(function(data){$scope.todos = data;});
        $scope.currentTag = tag;
    }
    $scope.add_tag_click = function(){
        http_post('/add-tag/', null).then(function(data){$scope.tags = data;});
    }

    init();


}













