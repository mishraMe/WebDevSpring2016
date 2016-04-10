module.exports = function(app) {

    var UserSchema = require('./user.schema.server.js')(mongoose);
    // create user model from schema
    var UserModel = mongoose.model("User", UserSchema);

    var api = {

        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser

    };
    return api;

    console.log("entered in user.model.server.js");
    //createUser function
    function createUser(user) {
        console.log("entered createUser method of user wc_models in server");
        UserModel.create(user);
    };

    //findAllUsers function
    function findAllUsers() {
        console.log("entered findAllUsers in model");
        return UserModel.find();
    };

    //findUserById function
    function findUserById(userId) {
        console.log("entered findUserById");
        return UserModel.findById(userId);
    };

    //updateUser function
    function updateUser(userId, user) {
        return UserModel.update({_id: userId},{$set: user});
    };

    //deleteUser function
    function deleteUser(userId) {
        return UserModel.remove({_id: userId});
    };


    //findUserByUsername function
    function findUserByUsername(username) {
        console.log("ENTERED findUserByUsername");
        return UserModel.findOne({username: username});

    };

    //findUserByCredentials function
    function findUserByCredentials(credentials) {
        console.log("entered findUserByCredentials");
        console.log("entered in user model");
        var username= credentials.username;
        var password= credentials.password;
        return UserModel.findOne({username: username, password: password});
    };

    // get mongooseModel
    function getMongooseModel() {
        return UserModel;
    }
}