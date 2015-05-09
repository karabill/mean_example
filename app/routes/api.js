var moduleFunction = function(app, express, serverKey) {
  //Create a router.
  var apiRouter = express.Router();

  //The base root accesed using GET at /api.
  apiRouter.get('/', function(req, res) {
    res.json({ message: 'Api works.' });
  });

  //Set the route for /api/user.
  require('./apiUser')(apiRouter);

  //The router is returned.
  return apiRouter;
}


module.exports = moduleFunction;
