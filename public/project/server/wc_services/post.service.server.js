module.exports = function(app, postModel) {
    app.delete("/api/project/post/:postId", deletePostById);
    app.post("/api/project/user/:userId/post", createPostForUser);
    app.put("/api/project/post/:postId", updatePostById);
    app.get("/api/project/user/:userId/post", getPostsForUser);
    app.get("/api/project/post/:postId", getPostById);
    app.get("/api/project/post", getAllPosts);
    app.get("/api/project/public/post", getAllPublicPosts);
    app.put("/api/project/post/:postId/review/addLike", addLikeToPost)
    app.put("/api/project/post/:postId/review/removeLike", removeLikeFromPost)

    function getPostsForUser(req, res){
        var userId = req.params.userId;
        postModel
            .findPostsForUser(userId)
            .then(function(userFound){
                    res.json(userFound);
                },
                function(err){
                    res.status(400).send(err);
                });
    };

    function getPostById(req, res){
        console.log("entered getPostById in server service");
        var postId = req.params.postId;
        postModel
            .findPostById(postId)
            .then(function(postForId){
              res.json(postForId);
            },
            function(err){
                res.status(400).send(err);
            });
    };

    function deletePostById(req, res){
        //  console.log("entered deletePostById in server wc_services");
        var deletePostId = req.params.postId;
        postModel
            .deletePost(deletePostId)
            .then(function(result){
                    res.json(result);
                },
                function(err){
                    res.status(400).send(err);
                });
    };

    function createPostForUser(req, res){
        var post = req.body;
        var userId = req.params.userId;
        post.userId = userId;
        postModel
            .createPost(post)
            .then(function(createdPost){
                console.log("createdPost is ");
                console.log(createdPost);
                    res.json(createdPost);
                },
                function(err){
                    res.status(400).send(err);
                });
    };

    function updatePostById(req, res){
        console.log("entered the updatePostById in server");
        //updates post
        var postId = req.params.postId;
        var updatedPost = req.body;
        postModel
            .updatePost(postId, updatedPost)
            .then(function(updatedPost){
                    res.json(updatedPost);
                },
                function(err){
                    res.status(400).send(err);
                });
    };

    function getAllPosts(req, res){
        var allPosts = [];
        postModel
            .findAllPosts()
            .then(function(allPosts){
                    res.json(allPosts);
                },
                function(err){
                    res.status(400).send(err);
                });

    };

    function getAllPublicPosts(req, res){
        var allPublicPosts = [];
        postModel
            .findAllPublicPosts()
            .then(function(publicPosts){
                    res.json(publicPosts);
                },
                function(err){
                    res.status(400).send(err);
                });
    };

    function addLikeToPost(req, res){

        console.log("addLikeToPost function in post server service");
        var postId = req.params.postId;
        var user = req.body;

            postModel.addLikeToPost(postId, user)
            .then(
                function(postAfterLikeAdded)
                {
                    res.json(postAfterLikeAdded);
                },
                function(err)
                {
                    res.status(400).send(err);
                }
            );
    }

    function removeLikeFromPost(req, res){
        console.log("removeLikeFromPost function in post server service");
        var postId = req.params.postId;
        var user = req.body;
        postModel
            .removeLikeFromPost(postId, user)
            .then(function(postAfterLikeRemoved){
                    res.json(postAfterLikeRemoved);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

};
