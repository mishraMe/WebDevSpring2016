(function(){
    "use strict";
    angular
        .module("WritersClubApp")
        .controller("ReviewController", reviewController)
    function reviewController($location, PostService, UserService, $routeParams) {

        console.log("entered the follow Controller on click");
        var vm = this;
        vm.error = null;
        vm.message = null;
        vm.$location = $location;
        var postId = $routeParams.postId;
        vm.post = PostService.getCurrentPost();
        vm.viewUser = viewUser;
        function init() {
            vm.error = null;
            vm.message = null;
            if(vm.post){
                PostService
                    .getPostById(postId)
                    .then(function(resp) {
                        console.log(resp);
                        vm.post = resp.data;
                    });
            }
        }
        init();

        function viewUser(username){
            console.log("entered the viewUser");
            UserService
                .findUserByUsername(username)
                .then(function(response){
                    vm.currentUser = response.data;
                    $location.url("/account/"+ vm.currentUser.username);
                })
        }

    }
})();
