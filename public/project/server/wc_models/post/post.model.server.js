
module.exports = function(app, db, mongoose){

    var PostSchema = require('./post.schema.server.js')(mongoose);
    var reviewSchema = require('./review.schema.server.js')(mongoose);
    var userReviewMapSchema = require('./user_review_map.schema.server.js');
    var PostModel = mongoose.model("Post", PostSchema);



    var api = {
        createPost: createPost,
        findAllPosts: findAllPosts,
        findPostById: findPostById,
        findPostByTitle: findPostByTitle,
        findPostsForUser: findPostsForUser,
        findAllPublicPosts: findAllPublicPosts,
        updatePost: updatePost,
        deletePost: deletePost,
        addLikeToPost: addLikeToPost,
        removeLikeFromPost: removeLikeFromPost
    };

    return api;

    function createPost (post) {
        console.log("created post in model");
        return PostModel.create(post);
    };

    function findAllPosts () {
        console.log("entered findAllPosts in post model");
        return PostModel.find();
    };

    function findAllPublicPosts () {
        console.log("entered findAllPublicPosts in post model");
        return PostModel.find({"type": 'public'});
    };

    function findPostById (postId) {
        console.log("entered findPostById in post model");
        return PostModel.findById(postId);
    };

    function updatePost (postId, post) {
        console.log("entered updatePost in post model");
        return PostModel.update({_id: postId}, {$set: post});
    };

    function deletePost (postId) {
        console.log("entered deletePost in model");
        return PostModel.remove({_id: postId});
    };

    function findPostByTitle(title) {
        console.log("entered find postByTitle in post model");
        return PostModel.findOne({title: title});
    };

    function findPostsForUser(userId) {
        console.log("entred findpostsforuser in post wc_models server");
        var postsForUser = [];
        postsForUser = PostModel.find({userId: userId});
        return postsForUser;
    };


    function addLikeToPost(postId, user){
        console.log("entred addLikeToPost in post wc_models model");
        return PostModel
            .findById(postId)
            .then(function(resp){
               resp.usersLiked.push(user.username);
                return resp.save();
            });
    }

    function removeLikeFromPost(postId, user){
        console.log("entred removeLikeFromPost in post wc_models model");
        return PostModel
            .findById(postId)
            .then(function(resp){
                resp.usersLiked.remove(user.username);
                return  resp.save();
            });
    }

}
