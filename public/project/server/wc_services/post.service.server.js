module.exports = function(app, postModel) {


    //crud functionality
    app.delete("/api/project/post/:postId", deletePostById);
    app.post("/api/project/user/:userId/post", createPostForUser);
    app.put("/api/project/post/:postId", updatePostById);
    app.get("/api/project/user/:userId/post", getPostsForUser);
    app.get("/api/project/post/getPostById/:postId", getPostById);
    app.get("/api/project/post/getPostByTitle/:title", getPostByTitle);

    //all posts functions
    app.get("/api/project/post", getAllPosts);
    app.get("/api/project/public/post", getAllPublicPosts);

    //review functions
    app.put("/api/project/post/:postId/review/likePost", likePost)
    app.put("/api/project/post/:postId/review/unlikePost", unlikePost)
    app.get("/api/project/post/reviews", getAllReviews)
    app.put("/api/project/post/:postId/review/addComment", addCommentToPost)
    app.put("/api/project/post/:postId/review/deleteComment", deleteComment)

    //search post functions
    app.get("/api/project/search/:title", searchPostsByTitle);

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


    function getPostByTitle(req, res){
        console.log("entered getPostByTitle in server service");
        var postTitle = req.params.title;
        postModel
            .findPostByTitle(postTitle)
            .then(function(postForTitle){

                    res.json(postForTitle);
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
        if(post.title == null){
            post.title = "Untitled";
        }
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
        delete updatedPost._id;
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

    function likePost(req, res){

        var postId = req.params.postId;
        var user = req.body;
        postModel.likePost(postId, user)
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

    function unlikePost(req, res){
        console.log("unlikePost function in post server service");
        var postId = req.params.postId;
        var user = req.body;
        postModel
            .unlikePost(postId, user)
            .then(function(postAfterLikeRemoved){
                    res.json(postAfterLikeRemoved);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function getAllReviews(req, res){
        console.log("get all reviews function in post server service");
        postModel
            .getAllReviews()
            .then(function(allReviews){
                    res.json(allReviews);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function addCommentToPost(req, res){
        var postId = req.params.postId;
        var comment = req.body;
        console.log("get addCommentToPost function in post server service");
        postModel
            .addCommentToPost(postId, comment)
            .then(function(response){
                    res.json(response);
                },
                function(err){
                    res.status(400).send(err);
                });
    }

    function deleteComment(req, res){
        console.log("delete comment in server service");
        var postId = req.params.postId;
        var comment = req.body;
        postModel
            .deleteComment(postId, comment)
            .then(function(response){
                console.log("entered the then of deleteComment in service");
                    res.json(response);
                },
                function(err){
                    res.status(400).send(err);
                });
    }


    function searchPostsByTitle(req, res){
        var title = req.params.title;
        postModel
            .searchPostsByTitle(title)
            .then(function(response){
                res.json(response)
            },
            function(err){
                res.status(400).send(err);
            })
    }
};
