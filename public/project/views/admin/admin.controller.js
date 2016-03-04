(function(){
    "use strict";
    angular
        .module("WritersClubApp")
        .controller("AdminController", AdminController);

    function FormController(FormService, $scope, $rootScope){
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
            //function is responsible for deleting a form by the index value
            var formsAfterDeletion=[];
            var callback=
                function(response){
                    formsAfterDeletion= response;
                };

            FormService.deleteFormById($scope.forms[$index]._id,callback);

        }

        function updateForm(newForm){
            //function is reponsible for updating selected form to the new form's value
            var updatedForm;
            var callback =
                function (newForm){
                    updatedForm=newForm;
                };
            FormService.updateFormById($rootScope.currentForm._id, newForm,callback);
            $scope.form = {};
        }

        function selectForm($index){
            // console.log("hello select form");
            //function is responsible for selecting a form to edit
            $scope.form = {
                _id: $scope.forms[$index]._id,
                title: $scope.forms[$index].title,
                userId: $scope.forms[$index].userId
            };
            $rootScope.currentForm =$scope.form;
        }
    }
})();
