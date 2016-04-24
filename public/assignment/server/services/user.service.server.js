
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose      = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, userModel) {

    var auth = authorized;
    passport.use('assignment', new LocalStrategy(localStrategy));

    app.post("/api/assignment/login", passport.authenticate('assignment'), login);
    app.post("/api/assignment/logout", logout);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/register", register);
    app.get("/api/assignment/user?username=username", getUserByUsername);
    app.get("/api/assignment/user?username=username&password=password", getUserByCredentials);
    app.post("/api/assignment/admin/user", auth,createUser);
    app.put("/api/assignment/admin/user/:id", auth,updateUser);
    app.delete("/api/assignment/admin/user/:id", auth, deleteUser);
    app.get("/api/assignment/admin/user/:id",getUserById);
    app.get("/api/assignment/admin/user",auth,getAllUsers);

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function localStrategy(username, password, done) {

        userModel.findUserByUsername(username)

            .then(

                function (user) {
                    console.log("user in server service");
                    console.log(user);

                    if(user && bcrypt.compareSync(password, user.password)) {
                        console.log("entered the return user");
                        return done(null, user);
                    }else {
                        console.log("entred error!!!");
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
                function(user){

                    done(null, user);
                },

                function(err){

                    done(err, null);
                }
            );
    }

    function login(req, res) {
        console.log("Login in form maker");
        var user = req.body;
        console.log(user);
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
        delete newUser._id;
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

        if(isAdmin(req.user)){
            console.log("entered the createUser in server server");
            var newUser = req.body;
            console.log(newUser);
            userModel
                .findUserByUsername(newUser.username)
                .then(
                    function (user) {
                        if (user) {
                            res.json(null);
                        } else {
                            newUser.password = bcrypt.hashSync(newUser.password);
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
        }else{
            res.status(403);
        }

    }

    function updateUser(req, res){
        console.log("entered the updateUser server service");
        var userId = req.params.id;
        var updatedUser = req.body;
        delete updatedUser._id;
        if(!isAdmin(req.user)) {
            delete updatedUser.roles;
        }

        updatedUser.password = bcrypt.hashSync(updatedUser.password);

              userModel
                .updateUser(userId, updatedUser)
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

        var userId = req.params.id;

        if(isAdmin(req.user)) {

            userModel.deleteUser(userId)

                .then(function (resp) {

                        if (resp) {

                            res.json(resp);
                        }
                        else {

                            res.status(400).send(err);
                        }
                    }
                );
        }else {
            res.status(403);
        }
    }


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
            if(isAdmin(req.user)){
                console.log("entered the else condition in getAllUsers");
                var users = [];
                userModel
                    .findAllUsers()
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
            }else {
                res.status(403);
            }
        }
    };

    function getUserById(req, res){
        if(isAdmin(req.user)){
            console.log("entered the getUserById server service");
            var userId = req.params.id;
            userModel
                .findUserById(userId)
                .then(

                    function (doc) {

                        res.json(doc);
                    },

                    function (err) {

                        res.status(400).send(err);
                    }
                );
        }else{
            req.status(403);
        }
    };

    function getUserByUsername(req, res){
        console.log("getUserByUsername in server service");
        var username= req.query.username;
        userModel
            .findUserByUsername(username)
            .then(

                function (doc) {

                    res.json(doc);
                },

                function (err) {

                    res.status(400).send(err);
                }
            );
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

    function isAdmin(user) {

        if(user.roles.indexOf("admin") >= 0) {

            return true;
        }

        return false;
    }

    function authorized (req, res, next) {

        if (!req.isAuthenticated()) {

            res.send(401);

        } else {

            next();
        }
    }

};
