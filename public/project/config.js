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
                templateUrl: "views/User/register.view.html",
                controller: "RegisterController"
            })
            .when("/login",{
                templateUrl: "views/User/login.view.html",
                controller: "LoginController"
            })
            .when("/account",{
                templateUrl: "views/User/account.view.html",
                controller: "AccountController"
            })
            .when("/admin",{
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController"
            })
            .when("/document",{
                templateUrl: "views/document/writeDocument.view.html",
                 controller: "DocumentController"
            })
            .when("/myDocuments",{
                templateUrl: "views/document/myDocuments.view.html",
                controller: "DocumentController"
            })
            .when("/allDocuments",{
                templateUrl: "views/document/allDocuments.view.html",
                controller: "DocumentController"
            })
            .when("/viewDocument",{
            templateUrl: "views/document/viewDocument.view.html",
            controller: "DocumentController"
            })
            .otherwise({
                redirectTo:"/home"
            })
    }
})();