(function(){
    angular
        .module("FormBuilderApp")
        .config(configuration);
    function configuration($routeProvider){

        $routeProvider
            //header links where profile and admin are common amongst header and sidebar
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                // controller: "HomeController"
            })
            .when("/register",{
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/login",{
                templateUrl: "views/users/login.view.html",
              //  controller: "LoginController"
            })
            .when("/profile",{
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/admin",{
                templateUrl: "views/admin/admin.view.html",
               // controller: "AdminController"
            })
        // sidebar config links
            .when("/forms",{
                templateUrl: "views/forms/forms.view.html",
                //controller: "FormController"
            })
            .when("/form-fields",{
                templateUrl: "views/forms/form-fields.view.html",
                //controller: "FormController"
            })
            .otherwise({
                redirectTo:"/home"
            })
    }
})();