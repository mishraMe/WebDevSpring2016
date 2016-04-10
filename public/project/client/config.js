//config.js
(function(){
    "use strict";
    angular
        .module("WritersClubApp")
        .config(configuration);
    function configuration($routeProvider){

        $routeProvider
            //header links where account and admin are common amongst header and sidebar
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                // controller: "HomeController"
            })

            .when("/register",{
                templateUrl: "views/user/register/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })

            .when("/login",{
                templateUrl: "views/user/login/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })

            .when("/profile",{
                templateUrl: "views/user/profile/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"
            })

            .when("/account/userId/:userId",{
                templateUrl: "views/user/account/account.view.html",
                controller: "AccountController",
                controllerAs: "model"
            })

            .when("/account/username/:username",{
                templateUrl: "views/user/account/account.view.html",
                controller: "AccountController",
                controllerAs: "model"
            })

            // paths for posts
            .when("/editPost",{
                templateUrl: "views/post/editPost.view.html",
                controller: "PostController",
                controllerAs: "model",
            })

            //this view is handled by the same controller and provides a different view.
            .when("/viewPost",{
                templateUrl: "views/post/viewPost.view.html",
                controller: "PostController",
                controllerAs: "model"
            })

            //this view is handled by the same controller and provides a different view.
            .when("/myPosts",{
                templateUrl: "views/post/myPosts.view.html",
                controller: "PostController",
                controllerAs: "model"
            })

            //this view is handled by the same controller and provides a different view.
            .when("/publicPosts",{
                templateUrl: "views/post/publicPosts.view.html",
                controller: "PostController",
                controllerAs: "model"
            })

            //follower and following
            .when("/followers/:userId",{
                templateUrl: "views/user/follow/followers.view.html",
                controller: "FollowController",
                controllerAs: "model",
            })

            .when("/following/:userId",{
                templateUrl: "views/user/follow/following.view.html",
                controller: "FollowController",
                controllerAs: "model",
            })

            //search paths
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model"
            })

            .when("/search/:title",{
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model"
            })

            .when("/details/:id", {
                templateUrl: "views/details/details.view.html",
                controller: "DetailsController",
                controllerAs: "model"
            })

            //admin paths
            .when("/admin",{
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model",
            })

            //table views links
            .when("/postTable", {
                templateUrl: "views/post/postTable.view.html",
                controller: "PostTableController",
                controllerAs: "model"
            })
            .when("/userTable", {
                templateUrl: "views/user/userTable.view.html",
                controller: "UserTableController",
                controllerAs: "model"
            })
            .when("/reviewTable", {
                templateUrl: "views/review/reviewTable.view.html",
                controller: "ReviewTableController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo:"/home"
            })
    }
})();