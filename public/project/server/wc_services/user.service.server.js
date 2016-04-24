var mongoose = require("mongoose");
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, userModel) {


    var auth = authorized;
    app.post  ('/api/project/login', passport.authenticate('project'), login);
    app.post  ('/api/project/logout',         logout);
    app.post  ('/api/project/register',       register);
    app.get   ('/api/project/loggedin',       loggedin);
    app.post("/api/project/user", auth, createUser);
    app.put("/api/project/user/:id", auth, updateUser);
    app.delete("/api/project/user/:id", auth, deleteUser);
    app.get("/api/project/user",  getAllUsers);
    app.get("/api/project/user/:id", getUserById);
    app.get("/api/project/user?username=username", getUserByUsername);
    app.get("/api/project/user?username=username&password=password", getUserByCredentials);

    //functions to add follow functionality
    //app.get("/api/project/user/:id/follow", getAllFollowInfoByUserId);
    app.put("/api/project/follow/follower/:username", addUserToFollowers);
    app.put("/api/project/unfollow/follower/:username", removeUserFromFollowers);
    app.put("/api/project/follow/following/:username", addUserToFollowing);
    app.put("/api/project/unfollow/following/:username", removeUserFromFollowing);

    passport.use('project',new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }


    function loggedin(req, res) {
        console.log("entered loggedin");
        console.log(req.user);
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        var newUser = req.body;
      //  newUser.roles=["admin"];
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return userModel.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function createUser(req, res){
        console.log("entered the createUser in server server");
        var newUser = req.body;
        newUser.roles = ['user'];
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (user) {
                        res.json(null);
                    } else {
                        console.log("entered else condition of findUserByUsername");
                            userModel.createUser(newUser)
                                .then(
                                    function(result){
                                        console.log("result in createUser is ");
                                        console.log(result);
                                        res.json(result);
                                    },
                                    function(err){
                                        res.status(400).send(err);
                                    });
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    };

    function updateUser(req, res){
        console.log("entered the updateUser server service");
        var updatedUser = req.body;
        delete updatedUser._id;
        var user =
            userModel
                .updateUser(req.params.id, updatedUser)
                .then(
                    function(result)
                    {
                        console.log("entered the updateUser result");
                        res.json(result);
                    },
                    function(err){
                        console.log("entered the updateUser err");
                        res.status(400).send(err);
                    }
                );
    };

    function deleteUser(req, res){
        console.log("entered the deleteUser server service");
        var deleteUserId = req.params.id;
        userModel
            .deleteUser(deleteUserId)
            .then(function(response){
                res.json(response);
            },
            function(err){
                res.status(400).send(err);
            })
    };

    function getAllUsers(req, res){
        console.log("entered the getAllUsers server service");
        var password = req.query.password;
        var username = req.query.username;
        var id = req.params.id;

        if(username && password){
            console.log("entered the if in getAllUsers");
            getUserByCredentials(req, res);
        }
        else if (username){
            console.log("entered the 2nd if condition in getAllUsers");
            getUserByUsername(req, res);
        }
        else if(id){
            console.log("entered the 3rd if in getAllUsers");
            getUserById(req, res);
        }
        else{
            console.log("entered the else condition in getAllUsers");
            var users = [];
            userModel
                .findAllUsers()
                .then(function(allUsers){
                        res.json(allUsers);
                    },
                    function(err){
                        res.status(400).send(err);
                    });
        }
    };

    function getUserById(req, res){
        console.log("entered the getUserById server service");
        var userId = req.params.id;
        userModel
            .findUserById(userId)
            .then(function(userFound){
                    res.json(userFound);
                },
                function(err){
                    res.status(400).send(err);
                });
    };

    function getUserByUsername(req, res){
        console.log("getUserByUsername in server service");
        var username= req.query.username;
        userModel
            .findUserByUsername(username)
            .then(function(userFound){
                    res.json(userFound);
                },
                function(err){
                    res.status(400).send(err);
                });
    };

    function getUserByCredentials(req, res){
        console.log("entered the getUsersByCredentials server service");
        var credentials = {
            username: req.query.username,
            password: req.query.password
        };
        var user = userModel
            .findUserByCredentials(credentials)
            .then(
                function(result)
                {
                    res.json(result);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    };


    //follow functionality
    function addUserToFollowers(req, res){
        var userToBeFollowedUsername = req.params.username;
        console.log("userTobefollowedUsername is ");
        console.log(userToBeFollowedUsername);
        var userFollower = req.body;
        console.log("SERVICE BODY");
        console.log(req.body);
        userModel
           .addUserToFollowers(userToBeFollowedUsername, userFollower)
           .then(function(result){
               console.log("result is ");
               console.log(result);
               res.json(result);
           },
           function(err){
               res.status(400).send(err);
           });
    };


    function addUserToFollowing(req, res){
        var userFollowing = req.params.username;
        console.log("userFollowingis ");
        console.log(userFollowing);
        var userBeingFollowed = req.body;
        console.log("SERVICE BODY");
        console.log(req.body);
        userModel
            .addUserToFollowing(userFollowing, userBeingFollowed)
            .then(function(result){
                    console.log("result is ");
                    console.log(result);
                    res.json(result);
                },
                function(err){
                    res.status(400).send(err);
                });
    };


    function removeUserFromFollowers(req, res){
        var userBeingFollowedUsername = req.params.username;
        var userFollower = req.body;
        userModel
            .removeUserFromFollowers(userBeingFollowedUsername, userFollower)
            .then(function(result){
                    console.log("result is ");
                    console.log(result);
                    res.json(result);
                },
                function(err){
                    res.status(400).send(err);
                });
    };


    function removeUserFromFollowing(req, res){
        var userFollowing = req.params.username;
        var userBeingFollowed = req.body;
        console.log("req.body for removing from following is ******************");
        console.log(req.body);
        userModel
            .removeUserFromFollowing(userFollowing, userBeingFollowed)
            .then(function(result){
                    console.log("result is ");
                    console.log(result);
                    res.json(result);
                },
                function(err){
                    res.status(400).send(err);
                });
    };


    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };
};


