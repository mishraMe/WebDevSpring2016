(function(){
    "use strict";
    angular
        .module("WritersClubApp")
        .controller("ReviewController", reviewController)
    function reviewController($location, PostService, $routeParams) {

        console.log("entered the follow Controller on click");
        var vm = this;
        vm.error = null;
        vm.message = null;
        vm.$location = $location;
        var postId = $routeParams.postId;
        vm.post = PostService.getCurrentPost();
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
    }
})();
