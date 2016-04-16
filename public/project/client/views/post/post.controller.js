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

        function init(){

            //current user
            vm.currentUser = UserService.getCurrentUser();
            vm.post = PostService.getCurrentPost();

            if(vm.currentUser){
                vm.isCurrentUser = validateCurrentUser(vm.currentUser, vm.post);
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
                .findAllPostsForUser(vm.currentUser._id)
                .then(function(postsForUser){
                    vm.myPosts = postsForUser.data;
                })
        }
        init();

        function viewPost(post){
            PostService
                .setCurrentPost(post);
            vm.post = post;
            console.log(vm.post);
            $location.url("/viewPost");
        };

        function deletePost(post){
            var postsAfterDeletion=[];
            PostService
                .deletePostById(post._id)
                .then(function(deletedPost){
                    PostService
                        .findAllPostsForUser(vm.currentUser._id)
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
            //function is responsible for updating selected post to the new post's value
            var renewedPost = newPost;
            if(vm.post._id == null){
                vm.error = "Post cannot be empty";
            }
            PostService
                .updatePostById(vm.post._id, renewedPost)
                .then(function(resp){
                    vm.error = null;
                    vm.post = resp.config.data;
                    PostService.setCurrentPost(vm.post);
                    $location.url("/viewPost");
                });
        }

        function selectPost(post){
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
            PostService
                .updatePostById(vm.post._id, post)
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

        function likeUnlikePost(post, currentUser){

        }
    }

})();
