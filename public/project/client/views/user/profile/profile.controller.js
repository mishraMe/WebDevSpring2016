    (function(){
        "use strict";
        angular
            .module("WritersClubApp")
            .controller("ProfileController", profileController)

        function profileController($location, UserService, PostService){

            var vm = this;
            vm.error = null;
            vm.message = null;
            vm.update = update;
            vm.listFollowing = listFollowing;
            vm.listFollowers = listFollowers;
            vm.viewPost = viewPost;
            vm.myPosts=[];

                function init(){

                UserService
                    .getCurrentUser()
                    .then(function(response){
                        vm.currentUser = response.data;

                        PostService
                            .getAllPostsForUser(vm.currentUser._id)
                            .then(function(response){
                                var posts=response.data;
                                vm.myPosts = posts;
                            });

                        PostService
                            .getAllPosts(vm.currentUser._id)
                            .then(function(response){
                                var favPosts=[];
                                var posts=response.data;
                                for(var index in posts){
                                    for(var index2 in posts[index].usersLiked){
                                        if(posts[index].usersLiked[index2]
                                            == vm.currentUser.username ){
                                            favPosts.push(posts[index])
                                        }
                                    }
                                }
                                console.log(favPosts);
                                vm.likedPosts = favPosts;
                            });
                    });
            }
            init();

            function update(user){

                vm.error = null;
                vm.message = null;
                UserService
                    .getCurrentUser()
                    .then(function(response){
                        vm.currentUser = response.data;
                        var currentUserId= vm.currentUser._id;

                UserService
                    .updateUser(currentUserId, user)
                    .then(function (response){
                       vm.currentUser = user;
                        vm.message = "User updated successfully";
                        $location.url("/profile");
                        });
                    })
            }

            function listFollowing(user){
                $location.url("/following/" + user.username);
            }

            function listFollowers(user){
                $location.url("/followers/" + user.username);
            }


            function viewPost(post) {
                PostService
                    .getPostByTitle(post.title)
                    .then(function (response) {
                        console.log(response.data);
                        PostService.setCurrentPost(response.data);
                        $location.url("/viewPost");
                    });
            }
        }
    })();