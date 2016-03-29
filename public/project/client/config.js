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
                templateUrl: "views/user/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })

            .when("/login",{
                templateUrl: "views/user/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })

            .when("/profile",{
                templateUrl: "views/user/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"
            })

            .when("/account/:userId",{
                templateUrl: "views/user/account.view.html",
                controller: "AccountController",
                controllerAs: "model"
            })

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

            .when("/admin",{
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model",
            })
                //follower and following
            .when("/followers",{
                templateUrl: "views/user/followers.view.html",
                controller: "FollowController",
                controllerAs: "model",
            })

            .when("/following",{
                templateUrl: "views/user/following.view.html",
                controller: "FollowController",
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