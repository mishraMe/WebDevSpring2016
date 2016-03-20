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
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/login",{
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/profile",{
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/admin",{
                templateUrl: "views/admin/admin.view.html",
               // controller: "AdminController"
            })
        // sidebar config links
            .when("/forms",{
                templateUrl: "views/forms/forms.view.html",
                controller: "FormController",
                controllerAs: "model"
            })
            //.when("/fields", {
            //    templateUrl: "views/forms/fields.view.html",
            //    controller: "FieldsController",
            //    controllerAs: "model"
            //})
            .when("/form/:formId/fields",{
                templateUrl: "views/forms/field.view.html",
                controller: "FieldController",
                controllerAs: "model"
            } )
            .otherwise({
                redirectTo:"/home"
            })
    }
})();