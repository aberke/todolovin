var TodolovinApp = angular.module('TodolovinApp', []);

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
        http_get('/get-tags/').then(function(data){
            if(data!=500){$scope.tags = data;}
        });
        $scope.get_todos_click('all');

    }


    $scope.create_todo_submit = function(){
        if(this.description){
            http_post('/create-todo/', {'description': this.description}).then(function(data){
                $scope.todos = data;
            }); 
        }
        else{
            alert('Add a description for the task');
        }
    }
    $scope.todo_add_tag = function(todo_id, tag_id){
        $http({
            method: 'POST',
            url: '/todo-add-tag/',
            data: {'todo_id':todo_id, 'tag_id':tag_id}
        });        
    }
    $scope.todo_delete_click = function(todo_id){
        http_post('/delete-todo/', {'todo_id':todo_id,'tag_id':$scope.currentTag}).then(function(data){
            $scope.todos = data;
        })
    }
    $scope.todo_done_click = function(todo_id){
        document.getElementById('todo-'+todo_id).className="done-true";
        http_post('/todo-done/',{'todo_id':todo_id}).then(function(data){})

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













