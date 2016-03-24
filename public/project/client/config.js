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
                controller: "RegisterController"
            })
            .when("/login",{
                templateUrl: "views/user/login.view.html",
                controller: "LoginController"
            })
            .when("/profile",{
                templateUrl: "views/user/profile.view.html",
                controller: "ProfileController"
            })
            .when("/admin",{
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController"
            })
            //this url is for all crud operations of a post.
            .when("/post/:id",{
                templateUrl: "views/post/post.view.html",
                 controller: "PostController"
            })

            //this view is handled by the same controller and provides a different view.
            .when("/myPosts",{
                templateUrl: "views/post/myPosts.view.html",
                controller: "PostController"
            })

            //this view is handled by the same controller and provides a different view.
            .when("/publicPosts",{
                templateUrl: "views/post/publicPosts.view.html",
                controller: "PostController"
            })
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController"
            })
            .when("/search/:title",{
                templateUrl: "views/search/search.view.html",
                controller: "SearchController"
            })
            .when("/details/:id", {
                templateUrl: "views/details/details.view.html",
                controller: "DetailsController"
            })

            //table views links
            .when("/postTable", {
                templateUrl: "views/post/postTable.view.html",
                controller: "PostTableController"
            })
            .when("/userTable", {
                templateUrl: "views/user/userTable.view.html",
                controller: "UserTableController"
            })
            .when("/reviewTable", {
                templateUrl: "views/review/reviewTable.view.html",
                controller: "ReviewTableController"
            })
            .otherwise({
                redirectTo:"/home"
            })
    }
})();