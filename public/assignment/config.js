(function(){
    angular
        .module("FormBuilderApp")
        .config(configuration);
    function configuration($routeProvider){

        $routeProvider
            //header links where profile and admin are common amongst header and sidebar
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/register",{
                templateUrl: "views/users/register.view.html"
            })
            .when("/login",{
                templateUrl: "views/users/login.view.html",
                controller: "RegisterController"
            })
            .when("/profile",{
                templateUrl: "views/users/profile.view.html"
            })
            .when("/admin",{
                templateUrl: "views/users/admin.view.html"
            })
        // sidebar config links
            .when("/forms",{
                templateUrl: "views/forms/forms.view.html"
            })
            .otherwise({
                redirectTo:"/home"
            })
    }
})();