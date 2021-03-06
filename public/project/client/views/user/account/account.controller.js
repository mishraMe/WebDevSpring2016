(function(){
    "use strict";
    angular
        .module("WritersClubApp")
        .controller("AccountController", accountController)
    function accountController($location, UserService, $routeParams, PostService){
        var vm = this;
        vm.error = null;
        vm.message = null;

        vm.listFollowing = listFollowing;
        vm.listFollowers = listFollowers;
        vm.followUnfollowUser = followUnfollowUser;
        vm.viewPost = viewPost;
        vm.myPosts=[];
        var currentUser;

       function init(){
           UserService
               .getCurrentUser()
               .then(function(response){
                   if(response){
                       vm.currentUser = response.data;
                       currentUser = vm.currentUser;
                   }
               });
           var username = $routeParams.username;


           UserService
               .findUserByUsername(username)
               .then(function(userFound){
                   vm.user = userFound.data;

                   userFollowedByCurrentUser(vm.user, currentUser);

                   PostService
                       .getAllPostsForUser(vm.user._id)
                       .then(function(response){
                           var posts=response.data;
                           vm.myPosts = posts;
                       });

                   PostService
                       .getAllPosts(vm.user._id)
                       .then(function(response){
                           var favPosts=[];
                           var posts=response.data;
                           for(var index in posts){
                               for(var index2 in posts[index].usersLiked){
                                   if(posts[index].usersLiked[index2]
                                       == vm.user.username ){
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

        function listFollowing(user){
            $location.url("/following/" + user.username);
        }

        function listFollowers(user){
            $location.url("/followers/" + user.username);
        }

        function userFollowedByCurrentUser(accountUser, currentUser){
         if(isCurrentUserAFollower(accountUser, currentUser)){
             accountUser.follow = 'unfollow';
         }else{
             accountUser.follow = 'follow';
         }
        }


        function isCurrentUserAFollower(accountUser, currentUser){
            for(var index in accountUser.followers){
                if(accountUser.followers[index] == currentUser.username){
                    return true;
                }
            }
            return false;
        }

        function followUnfollowUser(accountUser, currentUser) {
            console.log("entered FollowUnfollowUser");
            if(currentUser != '0'){
                if(isCurrentUserAFollower(accountUser, currentUser)){
                    accountUser.follow = 'unfollow';
                    decideFollowUnfollow(accountUser, currentUser);
                }else
                {
                    accountUser.follow = 'follow';
                    decideFollowUnfollow(accountUser, currentUser);
                }
            }else{
                $location.url("/login");
            }

        }

        function decideFollowUnfollow(accountUser)
        {
            console.log("entered decideFollowUnfollow");
            if (accountUser.follow == 'follow'){

                console.log("entered ifCondition in decideFollow");

                accountUser.follow = 'unfollow';
                followUser(accountUser,currentUser);
            }
            else{
                console.log("entered else condition decideFollow");
                accountUser.follow = 'follow';
                unFollowUser(accountUser, currentUser);
            }
        }

        function followUser(accountUser, currentUser){
            console.log("followUser");
            UserService
                .addUserToFollowers(accountUser.username, currentUser)
                .then(function(userAddedToFollowers){
                    console.log("then of followUser")
                    UserService
                        .addUserToFollowing(currentUser.username, accountUser)
                        .then(function(userAddedToFollowing){
                            console.log("then after the then ");
                            console.log("followingSuccessfully");
                        })
                });
        }

        function unFollowUser(accountUser, currentUser){
            UserService
                .removeUserFromFollowers(accountUser.username, currentUser)
                .then(function(removedUserFromFollowers){
                    UserService
                        .removeUserFromFollowing(currentUser.username, accountUser)
                        .then(function(userAddedToFollowing){
                            console.log("unfollowingSuccessfully");
                        })

                });
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