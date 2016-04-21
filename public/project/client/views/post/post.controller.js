//Post.controller.js
(function(){
    "use strict";
    angular.module("WritersClubApp")
        .controller("PostController", postController);

    function postController($location, UserService, PostService){

        var vm = this;
        vm.error=null;
        vm.message= null;
        vm.$location = $location;
        vm.selectedPost= null;
        vm.deletePost = deletePost;
        vm.updatePost = updatePost;
        vm.selectPost = selectPost;
        vm.viewPost = viewPost;
        vm.likeUnlikePost = likeUnlikePost;
        vm.changePrivacy = changePrivacy;
        vm.showUsersLiked = showUsersLiked;
        vm.showWriter = showWriter;
        vm.addCommentToPost = addCommentToPost;
        vm.deleteComment = deleteComment;

        function init(){

            //current user
                UserService
                    .getCurrentUser()
                    .then(function(response){
                        vm.currentUser = response.data;

                        vm.post = PostService.getCurrentPost();

                        if(vm.post){
                            vm.commentsRetrieved = renderComments(vm.post.comments);
                        }

                        if(vm.currentUser){
                            vm.isCurrentUser = validateCurrentUser(vm.currentUser, vm.post);
                        }

                        if(vm.currentUser && vm.post){
                            userLikedThePost(vm.post, vm.currentUser);
                        }

                        //all posts
                        PostService
                            .getAllPosts()
                            .then(function(allPosts) {
                                vm.allPosts = allPosts.data;
                            })
                        //public posts
                        PostService
                            .getAllPublicPosts()
                            .then(function(publicPosts) {
                                vm.publicPosts = publicPosts.data;
                            })

                        //only user's posts
                        if(vm.currentUser)
                            PostService
                                .getAllPostsForUser(vm.currentUser._id)
                                .then(function(postsForUser){
                                    vm.myPosts = postsForUser.data;
                                })
                    });

        }
        init();

        function viewPost(post){
            PostService.setCurrentPost(post);
            vm.post = PostService.getCurrentPost();
            vm.commentsRetrieved = renderComments(vm.post.comments);
            $location.url("/viewPost");
        };

        function deletePost(post){
            var postsAfterDeletion=[];

            PostService
                .deletePostById(vm.post._id)
                .then(function(deletedPost){
                    PostService
                        .getAllPostsForUser(vm.currentUser._id)
                        .then(function(allPostsForUser){
                            vm.post = null;
                            vm.error = null;
                            vm.message = null;
                            PostService.setCurrentPost(null);
                            vm.myPosts = allPostsForUser;
                            $location.url("/myPosts");
                        });
                });
        }

        function updatePost(newPost){
            var postId;
            console.log(newPost);
            //function is responsible for updating selected post to the new post's value
            var renewedPost = newPost;
            if(renewedPost.title == ""){
                renewedPost.title = "Untitled";
            }
            if(vm.post._id == null){
                vm.error = "Post not found in the database";
            }
            postId = vm.post._id;
            PostService
                .updatePostById(postId, renewedPost)
                .then(function(resp){
                    vm.error = null;
                    vm.post = resp.config.data;
                    PostService.setCurrentPost(vm.post);
                    vm.commentsRetrieved = renderComments(vm.post.comments);
                    $location.url("/viewPost");
                });
        }

        function selectPost(post){
            console.log("SELECT POST IS");
            console.log(post);
            PostService
                .getPostById(post._id)
                .then(function(selectedPost){
                    vm.post = selectedPost.config.data;
                });
            PostService.setCurrentPost(vm.post);
            $location.url("/editPost");
        }

        function changePrivacy(post){
            if(post.type == "private"){
                post.type = "public";
                vm.post = post;
            }else{
                post.type = "private";
                vm.post = post;
            }
            var postId;
            postId = vm.post._id;
            PostService
                .updatePostById(postId, post)
                .then(function(resp){
                    vm.post= resp.config.data;
                    PostService.setCurrentPost(vm.post);
                    vm.error = null;
                    vm.message= "Privacy changed to {{post.type}}"
                });
        }

        function validateCurrentUser(currUser, currPost){
          if(currPost!= null && currUser._id == currPost.userId){
              return true;
          }else{
              return false;
          }
        }


        //like unlike funcitonality

        function userLikedThePost(post, currentUser){
            if(hasTheUserLikedThePost(post, currentUser)){
                post.likeState = "unlike";
            }else{
                post.likeState = "like";
            }
        }

        function hasTheUserLikedThePost(post, currentUser){
            for(var index in post.usersLiked){
                if(post.usersLiked[index] == currentUser.username){
                    console.log("entered the if in hasTheUserLikedThePost");
                    return true;
                }
            }
            console.log("didn't enter the if in hasTheUserLikedThePost")
            return false;
        }

        function likeUnlikePost(post, currentUser) {
            console.log("entered likeUnlikePost");
            if(vm.currentUser!='0'){
                if(hasTheUserLikedThePost(post, currentUser)){
                    console.log("entered the if condition of likeUnlikePost");
                    post.likeState = "unlike";
                    decideLikeUnlikePost(post, currentUser);
                }else
                {
                    console.log("entered the else condition of likeUnlikePost");
                    post.likeState = "like";
                    decideLikeUnlikePost(post, currentUser);
                }
            }else
            {
                $location.url("/login");

            }

        }

        function decideLikeUnlikePost(post, currentUser)
        {
            console.log("entered decideLikeUnlike");
            if (post.likeState == "like"){
                likePost(post, currentUser);
            }
            else{
                console.log("entered else condition decideFollow");
                unlikePost(post, currentUser);
            }
        }

        function likePost(post, currentUser) {
            console.log("likePost");
            PostService
                .likePost(post, currentUser)
                .then(function (userAddedToUsersLiked) {
                    vm.post = userAddedToUsersLiked.data;
                    console.log(vm.post);
                    vm.post.likeState = "unlike";
                    console.log("user added successfully");
                });
        }

        function unlikePost(post, currentUser){
            console.log("the post in controller unlikePost is ");
            PostService
                .unlikePost(post, currentUser)
                .then(function(removedUserFromUsersLiked){
                    vm.post= removedUserFromUsersLiked.data;
                    vm.post.likeState = "like";
                    console.log(vm.post);
                    console.log("user removed successfully");
                });
        }

        function showUsersLiked(post){
            PostService.setCurrentPost(post);
            vm.post = post;
            $location.url("/post/"+ post._id +"/review/usersLiked");
        }

        function showWriter(post){
            console.log("post is");
            console.log(post);
            UserService
                .findUserByUsername(post.username)
                .then(function(response){
                    vm.currentUser = response.data;
                    $location.url("/account/"+ post.username);
                })
        }

        function addCommentToPost(commentValue){
            var commentObj =
            {
                label: vm.currentUser.username,
                value: commentValue
            }
            PostService
                .addCommentToPost(vm.post._id, commentObj)
                .then(function(response){
                    PostService.setCurrentPost(response.data)
                    vm.comment = null;
                    vm.post = PostService.getCurrentPost();
                    vm.commentsRetrieved = renderComments(vm.post.comments);
                });
        }


        function renderComments(comments){
            var commentArray=[];
            for(var index in comments)
            {
               commentArray
                   .push(comments[index].label +":"+comments[index].value);
            }

            return commentArray;
        }

        function deleteComment(comment){
            console.log("comment is ");
            console.log(comment);
           var toBeDeletedComment = [];
            var label = comment.split(":")[0];
            var value = comment.split(":")[1];
            toBeDeletedComment.push({label: label, value: value});
            PostService
                .deleteComment(vm.post._id, toBeDeletedComment)
                .then(function(response){
                    PostService.setCurrentPost(response.data);
                    vm.post = PostService.getCurrentPost();
                    vm.commentsRetrieved = renderComments(vm.post.comments);
                    console.log("comment deleted successfully");

                })
        }

}

})();
