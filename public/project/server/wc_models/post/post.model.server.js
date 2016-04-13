
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
        addLikeToPost: addLikeToPost,
        removeLikeFromPost: removeLikeFromPost
        ////field functions
        //findAllFieldsInPost: findAllFieldsInPost,
        //findFieldInPost: findFieldInPost,
        //deleteFieldFromPost: deleteFieldFromPost,
        //createFieldInPost: createFieldInPost,
        //updateFieldInPost: updateFieldInPost
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

    //
    ////functions for fields of the post
    //function findAllFieldsInPost(postId){
    //    console.log("entered findAllFieldsInPost! WOOHOOW!!")
    //    var fields = [];
    //    var post;
    //    for(var index in mockPosts){
    //        post = mockPosts[index];
    //        if(post._id== postId){
    //            fields = post.fields;
    //            return fields;
    //            break;
    //        }
    //    }
    //    return null;
    //};
    //
    //function findFieldInPost(fieldId, postId){
    //    var field;
    //    var post = findPostById(postId);
    //    for(var index in post.fields){
    //        field = post.fields[index];
    //        if(field._id == fieldId){
    //            return field;
    //            break;
    //        }
    //    }
    //    return null;
    //};
    //
    //function deleteFieldFromPost(fieldId, postId){
    //    console.log("entered the deleteFieldFromPost in wc_models");
    //    var field;
    //    var post = findPostById(postId);
    //    for (var index in post.fields){
    //        field = post.fields[index];
    //        if( field._id == fieldId){
    //            post.fields.splice(index, 1);
    //            return post.fields;
    //        }
    //    }
    //};
    //
    //
    //function createFieldInPost(postId, newField){
    //    var post = findPostById(postId);
    //    newField._id = (new Date).getTime();
    //    post.fields.push(newField);
    //    return post.fields;
    //};
    //
    //function updateFieldInPost(postId, fieldId, updatedField){
    //    var post = findPostById(postId);
    //    console.log("postId is" + postId);
    //    console.log("fieldId is" + fieldId);
    //    console.log("updatedField is");
    //    console.log(updatedField);
    //    var field;
    //    for(var index in post.fields){
    //        if(post.fields[index]._id == fieldId){
    //            console.log("entered the updatefieldInPost if condition wc_models here");
    //            post.fields[index] = updatedField;
    //            return post.fields;
    //        }
    //    }
    //};

}
