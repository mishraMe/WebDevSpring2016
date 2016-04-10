var mongoose = require("mongoose");

module.exports = function(app, userModel, followModel) {

    app.post("/api/project/user", createUser);
    app.get("/api/project/user", getAllUsers);
    app.get("/api/project/user/:id", getUserById);
    app.get("/api/project/user?username=username", getUserByUsername);
    app.get("/api/project/user?username=username&password=password", getUserByCredentials);
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUser);
    app.get("/api/project/user/:id/follow", getAllFollowInfoByUserId);

    console.log("entered the user service");

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
    };

    function deleteUser(req, res){
        console.log("entered the deleteUser server service");
        var deleteUserId = req.params.id;
        userModel.deleteUser(deleteUserId);
        var users = userModel.findAllUsers();
        res.json(users);
    };

    function getAllFollowInfoByUserId(req, res){
        var followInfo;
        var userId = req.params.id;
        console.log("user Id in SERVER is " + userId);
        followInfo = followModel.findAllFollowInfoForUserByUserId(userId);
        res.send(followInfo);
    };

};
