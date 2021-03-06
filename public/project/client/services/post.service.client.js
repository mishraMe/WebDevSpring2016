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
                getAllPostsForUser: getAllPostsForUser,
                getPostById: getPostById,
                getPostByTitle: getPostByTitle,
                deletePostById: deletePostById,
                updatePostById: updatePostById,

                //addLikesandRemoveLikes
                 likePost: likePost,
                unlikePost: unlikePost,
                getAllReviews: getAllReviews,

                //addCommentToPost
                addCommentToPost: addCommentToPost,
                deleteComment: deleteComment,

                //search post functions
                searchPostsByTitle: searchPostsByTitle,

                //adding tags
                addTag: addTag,
                searchPostsByTag: searchPostsByTag,
            };
            return postApi;

            function setCurrentPost(post) {
                $rootScope.currentPost = post;
            };

            function getCurrentPost() {
                return $rootScope.currentPost   ;
            };

            function getAllPosts() {
               return $http.get("/api/project/post");
            };

            function getAllPublicPosts() {
                return $http.get("/api/project/public/post");
            };

            function getPostById(postId) {
                return $http.get("/api/project/post/getPostById/"+ postId);
            };

            function getPostByTitle(title) {
                return $http.get("/api/project/post/getPostByTitle/"+ title);
            };

            function createPostForUser(userId, post) {
                return $http.post("/api/project/user/"+userId+"/post", post);
            };

            function getAllPostsForUser(userId) {
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

            function likePost(post, user){
                var postId = post._id;
                delete(post._id);
                console.log("entered the likePost function in post client service");
                return $http.put("/api/project/post/"+ postId +"/review/likePost", user)
            }

            function unlikePost(post, user){
                var postId = post._id;
                delete(post._id);
                console.log("entered the unlikePost function in post client service");
                return $http.put("/api/project/post/"+ postId +"/review/unlikePost", user);
            }

            function getAllReviews(){
                return $http.get("/api/project/post/reviews");
            }

            function addCommentToPost(postId, comment){
                return $http.put("/api/project/post/"+ postId +"/review/addComment", comment)
            }

            function deleteComment(postId, comment){
                console.log("entered delete comment in post client");
                return $http.put("/api/project/post/"+ postId +"/review/deleteComment", comment)
            }

            //search posts

            function searchPostsByTitle(title){
                return $http.get("/api/project/search/"+title);
            }

            function searchPostsByTag(tag){
               return $http.get("/api/project/search/byTag/"+ tag);
            }

            function addTag(tagText, post){
                console.log("post is ");
                console.log(post);
                return $http.put("/api/project/post/"+ post._id +"/addTag/"+ tagText);
            }
        };

})();