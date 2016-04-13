// document.service.js
(function(){
    angular
        .module("WritersClubApp")
        .factory("PostService", postService);

        function postService($rootScope, $http) {

            var postApi = {
                getCurrentPost: getCurrentPost,
                setCurrentPost: setCurrentPost,
                getAllPosts: getAllPosts,
                getAllPublicPosts: getAllPublicPosts,
                getAllReviews: getAllReviews,
                createPostForUser: createPostForUser,
                findAllPostsForUser: findAllPostsForUser,
                getPostById: getPostById,
                deletePostById: deletePostById,
                updatePostById: updatePostById,

                //table functions
                createPostInTable: createPostInTable,
                deletePostInTable: deletePostInTable,
                updatePostInTable: updatePostInTable,
                createReviewInTable: createReviewInTable,
                deleteReviewInTable: deleteReviewInTable,
                updateReviewInTable: updateReviewInTable,

                //addLikesandRemoveLikes

            addLikeToPost: addLikeToPost,
            removeLikeFromPost: removeLikeFromPost

            };
            return postApi;

            function setCurrentPost(post) {
                $rootScope.currentPost = post;
            };

            function getCurrentPost() {
                return $rootScope.currentPost;
            };

            function getAllPosts() {
               return $http.get("/api/project/post");
            };

            function getAllPublicPosts() {
                return $http.get("/api/project/public/post");
            };

            function getPostById(postId) {
                return $http.get("/api/project/public/post/" + postId);
            };

            function createPostForUser(userId, post) {
                return $http.post("/api/project/user/"+userId+"/post", post);
            };

            function findAllPostsForUser(userId) {
                //console.log("entered find All posts for User");
                return $http.get("/api/project/user/"+userId+"/post");
            };

            function updatePostById(postId, newPost) {
                console.log("postId is "+ postId);
                return $http.put("/api/project/post/"+ postId, newPost);
            };
            function deletePostById(postId) {
                //console.log("entered deleteFormById in posts wc_services client");
                return $http.delete("/api/project/post/"+ postId);
            };



            //---------------------------------reviews likes comments---------------------------------//

            function addLikeToPost(postId, user){
                console.log("entered the addLikeToPost function in post client service");
                return $http.put("/api/project/post/"+ postId +"/review/addLike", user)
            }

            function removeLikeFromPost(postId, user){
                console.log("entered the removeLikeFromPost function in post client service");
                return $http.put("/api/project/post/"+ postId +"/review/removeLike", user)
            }

            //************************functions for review table***************************************

            function createReviewInTable(review, callback){
                if (review != null) {
                    var newReviewInTable = {
                        "_id": (new Date).getTime(),
                        "postId":review.postId,
                        "title": review.title,
                        "rating": review.rating,
                        "comments": review.comments
                    }
                    postApi.reviews.push(newReviewInTable);
                    callback(newReviewInTable);
                }
                callback();
            }
            function deleteReviewInTable(reviewId, callback){
                var reviewsInTableAfterDeletion = [];
                for (var j in postApi.reviews) {
                    if (postApi.reviews[j]._id == reviewId) {
                        postApi.reviews.splice(j, 1);
                    }
                }
                reviewsInTableAfterDeletion = postApi.reviews;
                callback(reviewsInTableAfterDeletion);
            }
            function updateReviewInTable(postId,newPost, callback){
                console.log("entered updatePostInTable post for table view");
                var updatedReviewInTable;
                for (var k in postApi.posts) {
                    if (postApi.reviews[k]._id == postId) {
                        postApi.reviews[k].postId= newPost.postId;
                        postApi.reviews[k].rating= newPost.rating;
                        postApi.reviews[k].comments = newPost.comments;
                        updatedReviewInTable = postApi.posts[k];
                        console.log(updatedReviewInTable);
                        callback(updatedReviewInTable);
                        break;
                    }
                }
            }
            function getAllReviews(){
                return postApi.reviews;
            }
 //*********************************functions for post Table*****************************************

            function createPostInTable(post, callback){
                if (post != null) {
                    var newPostInTable = {
                        "_id": (new Date).getTime(),
                        "title": post.title,
                        "username": post.username,
                        "tag": post.tag,
                        "type": post.type
                    }
                    postApi.posts.push(newPostInTable);
                    callback(newPostInTable);
                }
                callback();
            }
            function deletePostInTable(postId, callback){
                var postsInTableAfterDeletion = [];
                for (var j in postApi.posts) {
                    if (postApi.posts[j]._id == postId) {
                        postApi.posts.splice(j, 1);
                    }
                }
                postsInTableAfterDeletion = postApi.posts;
                callback(postsInTableAfterDeletion);
            }
            function updatePostInTable(postId,newPost, callback){
                console.log("entered updatePostInTable post for table view");
                var updatedPostInTable;
                for (var k in postApi.posts) {
                    if (postApi.posts[k]._id == postId) {
                        postApi.posts[k].title = newPost.title;
                        postApi.posts[k].username= newPost.username;
                        postApi.posts[k].type= newPost.type;
                        postApi.posts[k].tag= newPost.tag;
                        updatedPostInTable = postApi.posts[k];
                        console.log(updatedPostInTable);
                        callback(updatedPostInTable);
                        break;
                    }
                }
            }
        };



})();