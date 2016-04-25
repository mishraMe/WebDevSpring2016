
module.exports = function(app, db, mongoose){

    var PostSchema = require('./post.schema.server.js')(mongoose);
    var PostModel = mongoose.model("Post", PostSchema);
    var q = require('q');

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
        addCommentToPost: addCommentToPost,
        deleteComment: deleteComment,

        //search functions
        searchPostsByTitle: searchPostsByTitle,
    };

    return api;

    function createPost (post) {
        var deferred = q.defer();
        console.log("created post in model");
        PostModel.create(post,
            function(err, resp){
                if(err){
                    deferred.resolve(err)
                }else
                {
                    deferred.resolve(resp)
                }
            });
        return deferred.promise;
    };

    function findAllPosts () {
        var deferred = q.defer();
        console.log("entered findAllPosts in post model");
        PostModel.find(
            function(err, resp){
            if(err){
                deferred.resolve(err)
            }else
            {
                deferred.resolve(resp)
            }
        });
        return deferred.promise;
    };

    function findAllPublicPosts () {
        console.log("entered findAllPublicPosts in post model");
        var deferred = q.defer();
        PostModel.find({"type": 'public'},
            function(err, resp){
                if(err){
                    deferred.resolve(err)
                }else
                {
                    deferred.resolve(resp)
                }
            });
        return deferred.promise;
    };

    function findPostById (postId) {
        console.log("entered findPostById in post model");
        var deferred = q.defer();

        PostModel.findById(postId,
            function(err, resp){
                if(err){
                    deferred.resolve(err)
                }else
                {
                    deferred.resolve(resp)
                }
            });
        return deferred.promise;
    };

    function updatePost (postId, post) {
        console.log("entered updatePost in post model");
        var deferred = q.defer();
        PostModel.update({_id: postId}, {$set: post},
            function(err, resp){
                if(err){
                    deferred.resolve(err)
                }else
                {
                    deferred.resolve(resp)
                }
            });
        return deferred.promise;
    };

    function deletePost (postId) {
        console.log("entered deletePost in model");
        var deferred = q.defer();
        return PostModel.remove({_id: postId},
            function(err, resp){
                if(err){
                    deferred.resolve(err)
                }else
                {
                    deferred.resolve(resp)
                }
            });
        return deferred.promise;
    };

    function findPostByTitle(title) {
        console.log("entered find postByTitle in post model");
        var deferred = q.defer();
        return PostModel.findOne({title: title},
            function(err, resp){
                if(err){
                    deferred.resolve(err)
                }else
                {
                    deferred.resolve(resp)
                }
            });
        return deferred.promise;
    };

    function findPostsForUser(userId) {
        console.log("entred findpostsforuser in post wc_models server");
        var deferred = q.defer();
        PostModel.find({userId: userId},
            function(err, resp){
                if(err){
                    deferred.resolve(err)
                }else
                {
                    deferred.resolve(resp)
                }
            });
        return deferred.promise;
    };

    function likePost(postId, user) {
        console.log("entered the likePost");
        return PostModel
            .findById(postId)
            .then(function (postFound){
                console.log("entered the then of likePost");
                postFound.likeState = 'unlike';
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
                postFound.likeState = 'like';
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
                console.log("add comment function response");
                console.log(postFound);
                console.log("entered the then of unlikePost");
                postFound.comments.push(comment);
                console.log("Comments are !!!!");
                console.log(postFound.comments);
                return postFound.save();
            });
    }

    function deleteComment(postId, comment) {
        console.log("deleteComment in model");
        var commentUsername = comment[0].label;
        var commentValue = comment[0].value;
        console.log(commentUsername);
        console.log(commentValue);
        console.log("entered the deleteComment");
        return PostModel
            .findById(postId)
            .then(function (postFound){
               for(var c in postFound.comments){
                   if(postFound.comments[c].label === commentUsername &&
                      postFound.comments[c].value === commentValue){
                       postFound.comments.remove(postFound.comments[c]);
                   }
               }
                postFound.save();
                return postFound;
            });
    }

    function searchPostsByTitle(title){
        var deferred = q.defer();
      PostModel
          .find({title: title})
          .then(
              function(err, resp){
                  if(err){
                      deferred.resolve(err)
                  }else
                  {
                      deferred.resolve(resp)
                  }
              });
        return deferred.promise;
    }

}
