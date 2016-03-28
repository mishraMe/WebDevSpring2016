module.exports = function(app, userModel) {
    app.post("/api/project/user", createUser);
    app.get("/api/project/user", getAllUsers);
    //app.get("/api/project/user/", getUserById);
    //app.get("/api/project/user/", getUserByUsername);
    //app.get("/api/project/user/", getUserByCredentials);
    app.get("/api/project/user/:id", getUserById);
    app.get("/api/project/user?username=username", getUserByUsername);
    app.get("/api/assignment/user?username=username&password=password", getUserByCredentials);
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUser);

    console.log("entered the user service");

    function createUser(req, res){
        console.log("ENTERED PROJECT USER MODEL");
        console.log("entered the createUser server service");
        var user = req.body;
        var users = [];
        users = userModel.createUser(user);
        res.send(users);
    };

    function getAllUsers(req, res){
        console.log("ENTERED PROJECT USER MODEL");
        console.log("entered the getAllUsers server service");
        var password = req.query.password;
        var username = req.query.username;
        var id = req.params.id;

       if (username){
            console.log("entered the if condition in getAllUsers");
            getUserByUsername(req, res);
        }
        else if(id){
            console.log("entered the else if 1st option in getAllUsers");
           getUserById(req, res);
       }
        else if(password){
            console.log("entered the else if 2nd option in getAllUsers");
            getUserByCredentials(req, res);
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
        res.send(user);
    };

    function getUserByCredentials(req, res){
        console.log("entered the getUsersByCredentials server service");
        var credentials = {
            username: req.query.username,
            password: req.query.password
        };
        var user = userModel.findUserByCredentials(credentials);
        res.send(user);
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
