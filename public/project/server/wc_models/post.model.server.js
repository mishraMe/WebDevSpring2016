var mockPosts = require("./post.mock.json");

module.exports = function(app){
    var api = {
        createPost: createPost,
        findAllPosts: findAllPosts,
        findPostById: findPostById,
        findPostByTitle: findPostByTitle,
        findPostsForUser: findPostsForUser,
        findAllPublicPosts: findAllPublicPosts,
        updatePost: updatePost,
        deletePost: deletePost,


        //field functions
        findAllFieldsInPost: findAllFieldsInPost,
        findFieldInPost: findFieldInPost,
        deleteFieldFromPost: deleteFieldFromPost,
        createFieldInPost: createFieldInPost,
        updateFieldInPost: updateFieldInPost
    };

    return api;

    function createPost (post) {
        console.log("created post in model");
        post._id = (new Date).getTime();
        mockPosts.push(post);
        return post;
    };

    function findAllPosts () {
        console.log("entered findAllPosts in post model");
        return mockPosts;
    };

    function findAllPublicPosts () {
        var publicPosts = [];
        console.log("entered findAllPublicPosts in post model");
        for(var index in mockPosts){
            if(mockPosts[index].type == "public"){
                publicPosts.push(mockPosts[index]);
            }
        }
        return publicPosts;
    };

    function findPostById (postId) {
        console.log("entered findPostById in post model");
        for (var index in mockPosts) {
            if (mockPosts[index]._id == postId) {
                return mockPosts[index];
                break;
            }
        }
        return null;
    };

    function updatePost (postId, post) {
        console.log("entered updatePost in post model");
        for (var index in mockPosts) {
            if (mockPosts[index]._id == postId) {
                mockPosts[index] = post;
                //returns the updated post.
                console.log("value returned by updatePost in model is ");
                console.log(mockPosts[index]);
                return mockPosts[index];
            }
        }
    };

    function deletePost (postId) {
        console.log("entered deletePost in model");
        for (var index in mockPosts) {
            if (mockPosts[index]._id == postId) {
                console.log("entered if condition");
                mockPosts.splice(index, 1);
                return true;
            }
        }
        return false;
    };

    function findPostByTitle(title) {
        console.log("entered find postByTitle in post model");
        var post;
        for (var index in mockPosts) {
            post = mockPosts[index];
            if (post.title == title) {
                return post;
            }
        }
        return null;
    };

    function findPostsForUser(userId) {
        console.log("entred findpostsforuser in post wc_models server");
        var postsForUser = [];
        var post;
        for (var index in mockPosts) {
            post = mockPosts[index];
            if (post.userId == userId) {
                postsForUser.push(post);
            }
        }
        return postsForUser;

    };



    //functions for fields of the post
    function findAllFieldsInPost(postId){
        console.log("entered findAllFieldsInPost! WOOHOOW!!")
        var fields = [];
        var post;
        for(var index in mockPosts){
            post = mockPosts[index];
            if(post._id== postId){
                fields = post.fields;
                return fields;
                break;
            }
        }
        return null;
    };

    function findFieldInPost(fieldId, postId){
        var field;
        var post = findPostById(postId);
        for(var index in post.fields){
            field = post.fields[index];
            if(field._id == fieldId){
                return field;
                break;
            }
        }
        return null;
    };

    function deleteFieldFromPost(fieldId, postId){
        console.log("entered the deleteFieldFromPost in wc_models");
        var field;
        var post = findPostById(postId);
        for (var index in post.fields){
            field = post.fields[index];
            if( field._id == fieldId){
                post.fields.splice(index, 1);
                return post.fields;
            }
        }
    };


    function createFieldInPost(postId, newField){
        var post = findPostById(postId);
        newField._id = (new Date).getTime();
        post.fields.push(newField);
        return post.fields;
    };

    function updateFieldInPost(postId, fieldId, updatedField){
        var post = findPostById(postId);
        console.log("postId is" + postId);
        console.log("fieldId is" + fieldId);
        console.log("updatedField is");
        console.log(updatedField);
        var field;
        for(var index in post.fields){
            if(post.fields[index]._id == fieldId){
                console.log("entered the updatefieldInPost if condition wc_models here");
                post.fields[index] = updatedField;
                return post.fields;
            }
        }
    };



}
