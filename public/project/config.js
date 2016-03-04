(function(){
    "use strict";
    angular
        .module("WritersClubApp")
        .config(configuration);
    function configuration($routeProvider){

        $routeProvider
            //header links where profile and admin are common amongst header and sidebar
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
                templateUrl: "views/user/userProfile.view.html",
                controller: "ProfileController"
            })
            .when("/admin",{
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController"
            })
            .when("/document",{
                templateUrl: "views/document/document.view.html",
                // controller: "AdminController"
            })
            .otherwise({
                redirectTo:"/home"
            })
    }
})();