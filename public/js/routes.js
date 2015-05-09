angular.module('routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    //Home page.
    templateUrl : 'views/all.html',
    controller: 'userController',
    controllerAs: 'user'
  })
  //Create and edit are the same page.
  .when('/users/create', {
    templateUrl: 'views/single.html',
    controller: 'userCreateController',
    controllerAs: 'user'
  })
  .when('/users/:user_id', {
    templateUrl: 'views/single.html',
    controller: 'userEditController',
    controllerAs: 'user'
  })
  .otherwise({
    redirectTo: '/'
    });
});
