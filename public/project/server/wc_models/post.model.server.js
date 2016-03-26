var mockPosts = require("./post.mock.json");

module.exports = function(app){
    var api = {
        createPost: createPost,
        findAllPosts: findAllPosts,
        findPostById: findPostById,
        updatePost: updatePost,
        deletePost: deletePost,
        findPostByTitle: findPostByTitle,
        findPostsForUser: findPostsForUser,
        findAllFieldsInPost: findAllFieldsInPost,
        findFieldInPost: findFieldInPost,
        deleteFieldFromPost: deleteFieldFromPost,
        createFieldInPost: createFieldInPost,
        updateFieldInPost: updateFieldInPost
    };

    return api;

    function createPost (post) {
        post._id = (new Date).getTime();
        mockPosts.push(post);
        return post;
    };

    function findAllPosts () {
        return mockPosts;
    };

    function findPostById (postId) {
        for (var index in mockPosts) {
            if (mockPosts[index]._id == postId) {
                return mockPosts[index];
                break;
            }
        }
        return null;
    };

    function updatePost (postId, post) {
        for (var index in mockPosts) {
            if (mockPosts[index]._id === postId) {
                mockPosts[index] = post;
                //returns the updated post.
                return mockPosts[index];
            }
        }
    };

    function deletePost (postId) {
        //console.log("entered deletePost in wc_models");
        //console.log("postId is " + postId);
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
        console.log("entred find posts for user in post wc_models server");
        console.log("userId is " + userId);
        var postsForUser = [];
        var post;
        for (var index in mockPosts) {
            post = mockPosts[index];
            console.log("post.userId Value is");
            console.log(post.userId);
            console.log("userId value");
            console.log(userId);
            console.log(post.userId == userId);
            if (post.userId == userId) {
                console.log("entered if condition");
                postsForUser.push(post);
            }
        }
        console.log(postsForUser);
        return postsForUser;

    };



    //functions for fields of the post
    function findAllFieldsInPost(postId){
        console.log("entered findAllFieldsInPost! WOOHOOW!!")
        var fields = [];
        var post;
        for(var index in mockPosts){
            post = mockPosts[index];
            if(post._id=== postId){
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
            if(field._id === fieldId){
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
