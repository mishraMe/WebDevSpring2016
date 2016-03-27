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
        vm.post = PostService.getCurrentPost();
        function init(){
            //current user
            vm.currentUser = UserService.getCurrentUser();
            //public posts
            PostService
                .getAllPublicPosts()
                .then(function(publicPosts){
                    console.log("public posts are ");
                    console.log(publicPosts.data);
                    vm.publicPosts = publicPosts.data;
                    console.log(vm.publicPosts);

                    //only user's posts
                    PostService
                        .findAllPostsForUser(vm.currentUser._id)
                        .then(function(postsForUser){
                            vm.myPosts = postsForUser.data;
                        })
                    vm.deletePost = deletePost;
                    vm.updatePost = updatePost;
                    vm.selectPost = selectPost;
                    vm.viewPost = viewPost;
                    vm.changePrivacy = changePrivacy;
                })
        }
        init();


        function viewPost(post){
            vm.post = post;
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
                            vm.myPosts = allPostsForUser;
                            $location.url("/myPosts");
                        });
                });
        }

        function updatePost(newPost){
            //function is responsible for updating selected post to the new post's value
            var renewedPost = newPost;
            if(vm.post._id == null){
                vm.error = "Post name cannot be empty";
            }
            PostService
                .updatePostById(vm.post._id, renewedPost)
                .then(function(resp){
                    vm.error = null;
                    vm.post = null;
                    $location.url("/viewPost");
                });
        }

        function selectPost($index){
            console.log($index);
            console.log("vm.posts in selectPost");
            console.log(vm.posts[$index]);
            vm.post = {
                _id: vm.posts[$index]._id,
                title: vm.posts[$index].title,
                tag: vm.posts[$index].tag,
                type: vm.posts[$index].type,
                userId: vm.posts[$index].userId,
                username: vm.posts[$index].username,
                content: vm.posts[$index].content
            }
            console.log("vm.post in selectPost is ");
            console.log(vm.post);
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
                    console.log("vm.post is in updatepost of change privacy");
                    vm.error = null;
                    vm.message= "Privacy changed to {{post.type}}"
                });
        }


    }

})();
