module.exports = function(app, userModel) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user/:id", getUserById);
    app.get("/api/assignment/user?username=username", getUserByUsername);
    //app.get("/api/assignment/user?username=username&password=password", getUserByCredentials);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);

    function createUser(req, res){
        console.log("create user");

        var user = req.body;
        var users = [];
        users = userModel.createUser(user);
        res.send(users);

    };

    function getAllUsers(req, res){

        var credentials = {
            username: req.query.username,
            password: req.query.password
        };
        if(credentials){
            var user = userModel.findUserByCredentials(credentials);
            res.send(user);
        }else{
            var users = [];
            users = userModel.findAllUsers();
            res.json(users);
        }

    };

    function getUserById(req, res){

        var userId = req.params.id;
        var user = userModel.findUserById(userId);
        res.json(user);

    };

    function getUserByUsername(req, res){
        var username= req.query.username;
        var user = userModel.findUserByUsername(username);
        res.send(user);
    };

    function getUserByCredentials(req, res){

        var credentials = {
            username: req.query.username,
            password: req.query.password
        };
        var user = userModel.findUserByCredentials(credentials);
        res.send(user);
    };

    function updateUser(req, res){
        console.log("enters the updateUser in user.service.server.js");
        console.log(req);
        console.log("print req. body");
        console.log(req.body);
        var updatedUser = req.body;
        console.log("updatedUser is ");
        console.log(updatedUser);
        console.log("updatedUser in server user service is ");
        userModel.updateUser(req.params.id, updatedUser);
        var users = userModel.findAllUsers();
        res.json(users);
    };

    function deleteUser(req, res){
        var deleteUserId = req.params.id;
        userModel.deleteUser(deleteUserId);
        var users = userModel.findAllUsers();
        res.json(users);
    };
};
