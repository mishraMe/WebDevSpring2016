module.exports = function(app, postModel) {
    app.get("/api/project/user/:userId/post", getPostsForUser);
    app.get("/api/project/post/:postId", getPostById);
    app.delete("/api/project/post/:postId", deletePostById);
    app.post("/api/project/user/:userId/post", createPostForUser);
    app.put("/api/project/post/:postId", updatePostById);
    app.get("/api/project/post", getAllPosts)



    function getPostsForUser(req, res){
        //  console.log("entered get posts for user in post wc_services in server");
        var userId = req.params.userId;
        //  console.log(userId);
        var posts = postModel.findPostsForUser(userId);
        //  console.log("posts in post wc_services server js (response) is ");
        //  console.log(posts);
        res.send(posts);
    };

    function getPostById(req, res){
        var postId = req.params.postId;
        var post = postModel.findPostById(postId);
        res.send(post);
    };

    function deletePostById(req, res){
        //  console.log("entered deletePostById in server wc_services");
        var deletePostId = req.params.postId;
        var response = postModel.deletePost(deletePostId);
        res.send(response);
    };

    function createPostForUser(req, res){
        var post = req.body;
        var userId = req.params.userId;
        post.userId = userId;
        var createdPost = postModel.createPost(post);
        res.send(createdPost);
    };

    function updatePostById(req, res){
        //updates post
        var postId = req.params.postId;
        var updatedPost = req.body;
        var response = postModel.updatePost(postId, updatedPost);
        res.send(response);
    };

    function getAllPosts(req, res){
        var allPosts = [];
        allPosts = postModel.findAllPosts();
        res.send(allPosts);
    };
};
