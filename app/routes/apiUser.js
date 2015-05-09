var User       = require('../models/user');

var moduleFunction = function(apiRouter) {

  //Routes end in api/user
  apiRouter.route('/user')

  //Create a user (POST localhost:8080/api/user)
  .post(function(req, res) {
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.userinfo = req.body.userinfo;

    user.save(function(err) {
      if (err) {
        // duplicate entry
        if (err.code == 11000) {
          return res.json({ success: false, message: 'A user with that username already exists. '});
        }
        else{
          return res.send(err);
        }
      }

      // return a message
      res.json({ message: 'User created!' });
    });
  })

  //Get all the users (GET localhost:8080/api/user)
  .get(function(req, res) {
    User.find(
      {},
      {'_id':0, "__v":0},
      function(err, users) {
        if (err) {
          res.send(err);
          }
          // return the users
          res.json(users);
      }
    );
  });

  // Routs end in /user/:username
  apiRouter.route('/user/:username')

  //Get the user with a specific username.
  .get(function(req, res) {
    User.findOne(
      {'username':req.params.username},
      {'_id':0, "__v":0},
      function(err, user) {
        if (err) {
          res.send(err);
        }
        // return that user
        res.json(user);
      }
    );
  })

  //Update the user with the specific username.
  .put(function(req, res) {
    User.findOne(
      {'username':req.params.username},
      function(err, user) {
        if (err) {
          res.send(err);
        }

        //Set the new user information if it exists in the request
        if (req.body.password) {
          user.password = req.body.password;
        }
        if (req.body.userinfo) {
          user.userinfo = req.body.userinfo;
        }

        //Save the user
        user.save(function(err) {
          if (err) {
            res.send(err);
          }

          // return a message.
          res.json({ message: 'User updated!' });
        });
      }
    );
  })

  //Delete the user with the specifc username.
  .delete(function(req, res) {
    User.remove(
      {'username':req.params.username},
      function(err, user) {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'Successfully deleted' });
      }
    );
  });
}


module.exports = moduleFunction;
