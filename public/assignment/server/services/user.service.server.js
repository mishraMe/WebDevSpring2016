
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose      = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, userModel) {

    var auth = authorized;
    passport.use(new LocalStrategy(localStrategy));

    app.post("/api/assignment/login",       passport.authenticate('local'), login);
    app.post("/api/assignment/logout",     logout);
    app.get("/api/assignment/loggedin",  loggedin);
    app.post("/api/assignment/register", register);
    app.get("/api/assignment/user?username=username", getUserByUsername);
    app.get("/api/assignment/user/:id",        getUserById);
    app.post("/api/assignment/user",   auth,    createUser);
    app.put("/api/assignment/user/:id",auth,    updateUser);
    app.delete("/api/assignment/user/:id",auth, deleteUser);
    app.get("/api/assignment/user",   auth,    getAllUsers);
    app.get("/api/assignment/user?username=username&password=password", getUserByCredentials);

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function localStrategy(username, password, done) {

        userModel.findUserByUsername(username)

            .then(

                function (user) {

                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    }else {
                        return done(null, false);
                    }

                } ,
                function (err) {

                    if (err) { return done(err); }
                }
            )
    }


    function serializeUser(user, done) {
        delete user.password;
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    delete user.password;
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }
    function login(req, res) {
        var user = req.user;
        //console.log(user);
        res.json(user);
    }
    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }
    function logout(req, res) {
        req.logOut();
        res.send(200);
    }
    function register (req, res) {

        var newUser = req.body;
        newUser.roles = ['student'];

        userModel.findUserByUsername(newUser.username)
            .then(

                function (user) {

                    if(user) {
                        res.json(null);
                    }
                    else {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.createUser(newUser);
                    }
                }
            )

            .then(

                function (user) {

                    if(user) {

                        req.login(user,function (err) {

                            if(err) {
                                res.status(400).send(err);

                            } else {
                                res.json(user);
                            }

                        });
                    }

                },

                function (err) {

                    res.status(400).send(err);

                }
            );
    }

    function createUser(req, res) {
        console.log("entered the createUser in server server");
        var newUser = req.body;
        newUser.roles = ['student'];
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (user) {
                        res.json(null);
                    } else {
                        console.log("entered else condition of findUserByUsername");
                        var user =
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
    }

    function updateUser(req, res){
        console.log("entered the updateUser server service");
        var updatedUser = req.body;
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
    }

    function deleteUser(req, res){
        console.log("entered the deleteUser server service");
        var deleteUserId = req.params.id;
        userModel.deleteUser(deleteUserId);
        var users = userModel.findAllUsers();
        res.json(users);
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
            users = userModel.findAllUsers();
            res.json(users);
            res.err(err)
        }
    };

    function getUserById(req, res){
        console.log("entered the getUserById server service");
        var userId = req.params.id;
        var user = userModel.findUserById(userId);
        res.json(user);

    };

    function getUserByUsername(req, res){
        console.log("getUserByUsername in server service");
        var username= req.query.username;
        var user = userModel.findUserByUsername(username);
        console.log("user is ");
        console.log(user);
        res.json(user);
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


    function authorized (req, res, next) {

        if (!req.isAuthenticated()) {

            res.send(401);

        } else {

            next();
        }
    }

};
