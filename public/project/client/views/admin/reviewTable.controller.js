//post.controller.js
(function(){
    "use strict";
    angular.module("WritersClubApp")
        .controller("ReviewTableController", reviewTableController);

    function reviewTableController(PostService, UserService, $location){

        var vm = this;
        //variables :
        vm.error=null;
        vm.message= null;
        vm.$location = $location;
        vm.showUsersLiked = showUsersLiked;
        vm.showWriter = showWriter;
        vm.viewPost = viewPost;


        // functions
        function init() {
            PostService
                .getAllReviews()
                .then(function(resp){
                    vm.reviewTable = resp.data;
                })
        }
        init();
        //
        //function createReview(post){
        //    if (post.title == null) {
        //        vm.message = "Please enter a title";
        //        init();
        //    }else{
        //        PostService
        //            .createPostForUser(post)
        //            .then(function(resp){
        //                init();
        //            })
        //        vm.post = null;
        //    }
        //}
        //
        //function deletePost(post){
        //    //function is responsible for deleting a post by the index value
        //    var PostsAfterDeletion=[];
        //    var postId = post._id;
        //    delete(post._id);
        //    PostService
        //        .deletePostById(postId)
        //        .then(function(response){
        //            console.log("post deleted sucessfully");
        //            init();
        //        });
        //}
        //
        //function updateReview(newReview){
        //    console.log("entered the update review and updated new review is ");
        //
        //    //function is responsible for updating selected post to the new post's value
        //    if(!newReview){
        //        vm.message = "Please enter updates";
        //    }
        //    var renewedPost = {
        //
        //    };
        //
        //    if(postId == null){
        //        vm.message = "post not in the database";
        //    }
        //    PostService
        //        .updatePostById(postId, renewedPost)
        //        .then(
        //            function (response){
        //                init();
        //                vm.post = null;
        //            });
        //
        //}
        //
        //function selectPost($index){
        //    // console.log("hello select post");
        //    //function is responsible for selecting a post to edit
        //    vm.post = {
        //        _id: vm.reviewTable[$index]._id,
        //        title: vm.reviewTable[$index].title,
        //        username: vm.reviewTable[$index].username,
        //        usersLiked: vm.reviewTable[$index].usersLiked
        //    };
        //}


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


        function viewPost(post){
            PostService.setCurrentPost(post);
            $location.url("/viewPost");
        };


        function showUsersLiked(post){
            PostService.setCurrentPost(post);
            $location.url("/post/"+ post._id +"/review/usersLiked");
        }

    }
})();
