(function(){
    angular
        .module("FormBuilderApp",[UserService])
        .controller("RegisterController", registerController);

    function registerController($scope, $location){

        var api = {
            register: register
        };

        return api;

        function register(){

        }

    }

})();