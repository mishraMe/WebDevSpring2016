
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose      = require("mongoose");

module.exports = function(app, userModel) {


    var auth = auth;

    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user/:id", getUserById);
    app.get("/api/assignment/user?username=username", getUserByUsername);
    app.get("/api/assignment/user?username=username&password=password", getUserByCredentials);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    function createUser(req, res) {
        console.log("entered the createUser in server server")
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
                        res.json(userModel.createUser(newUser));
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
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
            console.log("entered the else condition in getAllUsers");
            var users = [];
            users = userModel.findAllUsers();
            res.json(users);
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
        var user = userModel.findUserByCredentials(credentials);
        res.json(user);
    };

    function updateUser(req, res){
        console.log("entered the updateUser server service");
        var updatedUser = req.body;
        userModel.updateUser(req.params.id, updatedUser);
        var users = userModel.findAllUsers();
        res.json(users);
    };

    function deleteUser(req, res){
        console.log("entered the deleteUser server service");
        var deleteUserId = req.params.id;
        userModel.deleteUser(deleteUserId);
        var users = userModel.findAllUsers();
        res.json(users);
    };

};
