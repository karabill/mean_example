angular.module('userCtrl', ['userService'])

//Controller applied to list of all users.
.controller('userController', function(User) {
  var vm = this;

  //Define a function in order to call it in other places.
  var loadUsers = function() {
    User.all()
    .success(function(data) {
      //Bind the users that come back to vm.users.
      vm.users = data;
    });
  }

  //Grab all the users at page load.
  vm.users = [];
  loadUsers();

  //Function to delete a user.
  vm.deleteUser = function(id) {
    User.delete(id)
    .success(function(data) {
      //Refresh the users.
      loadUsers();
    });
  };
})

//Controller applied to user creation page.
.controller('userCreateController', function($location, User) {
  var vm = this;

  //Variable to hide/show elements of the view differentiates between create or edit pages.
  vm.type = 'create';

  //Function to create a user,
  vm.saveUser = function() {
    User.create(vm.userData)
    .success(function(data) {
      vm.userData = {};
      $location.path( "/");
    });
  };
})

//Controller applied to user edit page.
.controller('userEditController', function($location, $routeParams, User) {
  var vm = this;
  //Variable to hide/show elements of the view differentiates between create or edit pages.
  vm.type = 'edit';

  //Get the user data for the user you want to edit $routeParams is the way we grab data from the URL.
  User.get($routeParams.user_id)
  .success(function(data) {
    vm.userData = data;
  });

  //Function to save the user.
  vm.saveUser = function() {
    User.update($routeParams.user_id, vm.userData)
    .success(function(data) {
      vm.userData = {};
      $location.path( "/");
    });
  };
});
