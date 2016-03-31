
module.exports = function(app, db , mongoose) {


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

    //createUser function
    function createUser(user) {
        console.log("ENTERED ASSIGNEMNT USER MODEL");
        console.log("entered createUser method of user wc_models in server");
        return UserModel.create(user);
    };


    //updateUser function
    function updateUser(userId, user) {
    return UserModel.update({_id: userId},{$set: user});
    };

    //deleteUser function
    function deleteUser(userId) {
      return UserModel.remove({_id: userId});
    };


    //findAllUsers function
    function findAllUsers() {
        console.log("ENTERED ASSIGNMENT USER MODEL");
       return UserModel.find();
    };

    //findUserById function
    function findUserById(userId) {
        console.log("ENTERED ASSIGNMENT USER MODEL");
        return UserModel.findById(userId);
    };
    //findUserByUsername function
    function findUserByUsername(username) {
        console.log("ENTERED ASSIGNEMNT USER MODEL");
       return UserModel.findOne({username: username});
    };

    //findUserByCredentials function
    function findUserByCredentials(credentials) {
        console.log("ENTERED ASSIGNEMNT USER MODEL");
        console.log("entered in user wc_model");
        var username= credentials.username;
        var password= credentials.password;
       return UserModel.findOne({username: username, password: password});
    };
}