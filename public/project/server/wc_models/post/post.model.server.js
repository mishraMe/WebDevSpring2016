
module.exports = function(app, db, mongoose){

    var PostSchema = require('./post.schema.server.js')(mongoose);
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


        //review functions
        likePost: likePost,
        unlikePost: unlikePost,
        getAllReviews: getAllReviews,
        addCommentToPost: addCommentToPost
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


    function likePost(postId, user) {
        console.log("entered the likePost");
        return PostModel
            .findById(postId)
            .then(function (postFound){
                console.log("entered the then of likePost");
                postFound.usersLiked.push(user.username);
                console.log(postFound);
                return postFound.save();
            });
    }

    function unlikePost(postId, user) {
        console.log("entered the unlikePost");
        return PostModel
            .findById(postId)
            .then(function (postFound){
                console.log("entered the then of unlikePost");
                postFound.usersLiked.remove(user.username);
                return postFound.save();
            });
    }

    function getAllReviews(){
        var reviews = [];
       return PostModel
            .find()
            .then(function(resp){
                var review;
                for( var index in resp){
                    review =
                    {
                        postId: resp[index]._id,
                        title: resp[index].title,
                        username: resp[index].username,
                        usersLiked: resp[index].usersLiked.length,
                    }
                    reviews.push(review);
                }
                return reviews;
            });
    }


    function addCommentToPost(postId, comment) {
        console.log("entered the addCommentToPost");
        console.log("Comemnt sent is ");
        console.log(comment);
        return PostModel
            .findById(postId)
            .then(function (postFound){
                console.log("entered the then of unlikePost");
                postFound.comments.push(comment);
                console.log("Comments are !!!!");
                console.log(postFound.comments);
                return postFound.save();
            });
    }


}
