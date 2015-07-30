var demoApp = angular.module('demoApp', ['ngRoute', 'ngCookies'])
	.controller('HomeCtrl', ['$scope', '$http', function($scope, $http){
    $http.get('data/post.json')
    .success(function(data, status, headers, config){
      $scope.post=data;
    })
    .error(function(data, header, status, headers, config){
        alert('Request Failed');
    });

	}])
	.controller( "RegisterCtrl",['$scope', function($scope) {
		$scope.success=false;
      	$scope.register = function(){
      		$scope.success=true;
      	}
    }])
    .controller('loginController', ['$scope','$cookieStore','$location','$http', function($scope,$cookieStore,$location,$http){
    	$scope.check=false;
    	if($cookieStore.get('logined')!=null){
    		$scope.user=$cookieStore.get('logined');
    		$scope.check=true;
    	}
      	$scope.login = function(){
      		$scope.Error=false;
          $http.get('data/user.json').
          success(function(data, status, headers, config){
            for(var i=0; i<data.length; i++)
            {
              if($scope.email==data[i].email && $scope.password==data[i].password)
              {
                $scope.email='';
                $scope.password='';
                $scope.Error='';
                $scope.check=true;
                 $cookieStore.put('logined',data[i].fullname);
                 $scope.user=$cookieStore.get('logined');
                 $location.path("/");
              }
              else
                $scope.Error=true;
            }
          })
           .error(function(data, header, status, headers, config){
              alert('Request Failed');
          });
      	}
      	$scope.logout = function(){
      		$scope.check=false;
          $scope.Error='';
      		$cookieStore.remove('logined');
          $location.path("/");
      	}
    }])
    .controller('PostCtrl', ['$scope','$http','$cookieStore','$routeParams', function($scope, $http, $cookieStore,$routeParams){
      $scope.post=[];
      $http.get('data/post.json')
      .success(function(data, status, headers, config){
        for(var i=0; i<data.length; i++)
          if(data[i].id==$routeParams.id)
            {
              $scope.post=[{title: data[i].title,author: data[i].author,category: data[i].category,
                created:data[i].created, description:data[i].description,content:data[i].content,
                number_view:data[i].number_view
              }];
            }
      })
      .error(function(data, header, status, headers, config){
          alert('Request Failed');
      });
    	$http.get('data/comment.json')
      .success(function(data, status, headers, config){
        $scope.comments=[];
         for(var i=0; i<data.length; i++)
          if(data[i].post_id==$routeParams.id)
            {
              $scope.comments=[{avatar: data[i].avatar, username: data[i].username, created:data[i].created, content: data[i].content}];
            }
      })
      .error(function(data, header, status, headers, config){
        alert('Request Failed');
      });
    	$scope.addComment = function(){
      		$scope.comments.push(
      			{post_id: $routeParams.id, avatar: 'upload/user/default_avatar.jpg', username: $cookieStore.get('logined'), 
            created: Date.now(), content: $scope.comment});
          $scope.comment='';
		  }
      $scope.show=false;
      if($cookieStore.get('logined')!=null)
        $scope.show=true;

    }])
	.config(['$routeProvider',function ($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl: 'templates/index.html',
			controller: 'HomeCtrl'
		})
		.when('/post/:id', {
			templateUrl: 'templates/post.html',
			controller: 'PostCtrl'
		})
		.when('/register', {
			templateUrl: 'templates/register.html',
			controller: 'RegisterCtrl'
		})
		.when('/info', {
			templateUrl: 'templates/info.html',
			controller: 'InfoCtrl'
		})
		.otherwise({ templateUrl: 'templates/404.html'});
	}]);
