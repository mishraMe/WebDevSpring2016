(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $scope, $location, $rootScope){
        console.log("Form controller hey!");

        $scope.addForm = addForm;
        $scope.deleteForm = deleteForm;
        $scope.updateForm = updateForm;
        $scope.selectForm = selectForm;

        function addForm(form){
            console.log("hi add form fired");
            var newForm;
            function callback(response){
                newForm=response;
            }
            FormService.createFormForUser
            ($scope.currentUser, form, callback);
            $scope.form ={};
        }
        function deleteForm($index){
            var formsAfterDeletion=[];
            var callback=
                function(response){
                    formsAfterDeletion= response;
                }

            FormService.deleteFormById($scope.forms[$index]._id,callback);


        }

        function updateForm(newForm){
            var updatedForm;

            var callback =
                function (newForm){
                updatedForm=newForm;
            };
            FormService.updateFormById($rootScope.currentForm._id, newForm,callback);
            $scope.form = {};
        }

        function selectForm($index){
            console.log("hello select form");
            $scope.form = {
                _id: $scope.forms[$index]._id,
                title: $scope.forms[$index].title,
                userId: $scope.forms[$index].userId
            };
            $rootScope.currentForm =$scope.form;
        }

    }
})();
