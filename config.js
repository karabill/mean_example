//The configuration parameters.
var globalConfiguration = {
  //If any is available as an enviromental variable, use that value. Otherwise, use a default one.
  'ipaddress' : process.env.IP || '127.0.0.1',
  'port'      : process.env.PORT || 8080,
  'database'  : 'mongodb://localhost/users'
};

//Openshift configuration.
if (process.env.OPENSHIFT_NODEJS_IP) {
  globalConfiguration.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
}
if (process.env.OPENSHIFT_NODEJS_PORT) {
  globalConfiguration.port = process.env.OPENSHIFT_NODEJS_PORT;
}
if (process.env.OPENSHIFT_MONGODB_DB_USERNAME) {
  globalConfiguration.database = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" + process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" + process.env.OPENSHIFT_MONGODB_DB_HOST + ':' + process.env.OPENSHIFT_MONGODB_DB_PORT + '/' + process.env.OPENSHIFT_APP_NAME;
}

module.exports = globalConfiguration;
