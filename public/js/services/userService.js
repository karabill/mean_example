angular.module('userService', [])

.factory('User', function($http) {

	// create a new object
	var userFactory = {};

	// get a single user
	userFactory.get = function(id) {
		return $http.get('/api/user/' + id);
	};

	// get all users
	userFactory.all = function() {
		return $http.get('/api/user/');
	};

	// create a user
	userFactory.create = function(userData) {
		return $http.post('/api/user/', userData);
	};

	// update a user
	userFactory.update = function(id, userData) {
		return $http.put('/api/user/' + id, userData);
	};

	// delete a user
	userFactory.delete = function(id) {
		return $http.delete('/api/user/' + id);
	};

	// return our entire userFactory object
	return userFactory;

});
