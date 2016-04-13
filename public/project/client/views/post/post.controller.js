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
        //initially
        vm.userLikedPost = false;
        vm.deletePost = deletePost;
        vm.updatePost = updatePost;
        vm.selectPost = selectPost;
        vm.viewPost = viewPost;
        vm.likeUnlikePost = likeUnlikePost;
        vm.showUsersLikedPost = showUsersLikedPost;
        vm.changePrivacy = changePrivacy;

        function init(){

            //current user
            vm.currentUser = UserService.getCurrentUser();
            vm.post = PostService.getCurrentPost();

            if(vm.currentUser){
                vm.isCurrentUser = validateCurrentUser(vm.currentUser, vm.post);
            }

            if(vm.post){
                vm.usersLikedLength = findLengthOfUsersLikedPost(vm.post);
            }
            //all posts
            PostService
                .getAllPosts()
                .then(function(allPosts) {
                    console.log("all posts are ");
                    vm.allPosts = allPosts.data;
                    console.log(vm.allPosts);
                })
            //public posts
            PostService
             .getAllPublicPosts()
             .then(function(publicPosts) {
                 console.log("public posts are ");
                 vm.publicPosts = publicPosts.data;
                 console.log(vm.publicPosts);
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
            console.log("post value from viewing on clicking on it is ");
            console.log(post);
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
                    console.log("update post updates the post to: ");
                    console.log(resp);
                    vm.post = resp.config.data;
                    PostService.setCurrentPost(vm.post);
                    $location.url("/viewPost");
                });
        }

        function selectPost(post){
            console.log("value of post from view is");
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
            PostService
                .updatePostById(vm.post._id, post)
                .then(function(resp){
                    vm.post= resp.config.data;
                    PostService.setCurrentPost(vm.post);
                    console.log("vm.post is in updatepost of change privacy");
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

        function likeUnlikePost(userLikedPost) {

            console.log("entered the likeUnlikePost");
            if (userLikedPost == false) {
              vm.userLikedPost = true;

                addLikeToPost(vm.post, vm.currentUser);

            } else {
               vm.userLikedPost = false;
                removeLikeFromPost(vm.post, vm.currentUser);
            }
        }

        function addLikeToPost(post, user){

            console.log("entered the addLikeToPost");
            PostService
                .addLikeToPost(post._id, user)
                .then(function(resp){
                    vm.usersLikedLength = resp.data.usersLiked.length;
                });
        }

        function removeLikeFromPost(post, user){
            console.log("entered the removeLikeFromPost");
            PostService
                .removeLikeFromPost(post._id, user)
                .then(function(resp){
                    vm.usersLikedLength = resp.data.usersLiked.length;
                });
        }

        function findLengthOfUsersLikedPost(post){
            return post.usersLiked.length;
        }

        function showUsersLikedPost(post){
            vm.post = post;
            vm.usersLiked = post.usersLiked;
            $location.url("/post/"+post._id+"/usersLikedPost");
        }
    }

})();
