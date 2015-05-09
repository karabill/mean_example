//The configuration parameters.
var globalConfiguration = {
  //If the port is aveilable as an enviromental variable, use that value. Otherwise, use a default one.
  'port': process.env.PORT || 8080,
  //The path in order to connect to the database.
	'database': 'mongodb://localhost/users',
  //The  only one which knows it must be the server.
  'serverKey': 'serversecretkey'
};


module.exports = globalConfiguration;
