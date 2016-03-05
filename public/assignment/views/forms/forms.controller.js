(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $scope, UserService){

        //variables :
        $scope.error=null;
        $scope.message= null;
        $scope.selectForm= null;
        $scope.addForm = addForm;
        $scope.deleteForm = deleteForm;
        $scope.updateForm = updateForm;
        $scope.selectForm = selectForm;
        $scope.currentUser = UserService.getCurrentUser();
        $scope.forms=FormService.findAllFormsForUserId($scope.currentUser._id);


        function addForm(form){
            function callback (response) {
                if (form === null) {
                    $scope.message = "Please enter a form name";
                } else {
                    $scope.forms = FormService.findAllFormsForUserId($scope.currentUser._id);
                }
            }
                FormService.createFormForUser
                ($scope.currentUser._id, form, callback);
                $scope.form = null;
        }

        function deleteForm($index){
            //function is responsible for deleting a form by the index value
            var formsAfterDeletion=[];

            var callback=
                function(response){
                    formsAfterDeletion= response;
                    $scope.forms= FormService.findAllFormsForUserId($scope.currentUser._id);
                    $scope.error = null;
                };
            FormService.deleteFormById
            ($scope.forms[$index]._id,callback);
        }

        function updateForm(newForm){
            //function is responsible for updating selected form to the new form's value
            var renewedForm = {
                _id: newForm._id,
                title: newForm.title,
                userId: newForm.userId
            }
            function callback (newForm){
                $scope.forms= FormService.findAllFormsForUserId($scope.currentUser._id);
            };
            FormService.updateFormById(renewedForm._id, renewedForm,callback);
            $scope.form =null;
        }

        function selectForm($index){
           // console.log("hello select form");
            //function is responsible for selecting a form to edit
            $scope.selectedForm =$scope.forms[$index];
            $scope.selectedIndex = $index;
            $scope.form = {
                _id: $scope.forms[$index]._id,
                title: $scope.forms[$index].title,
                userId: $scope.forms[$index].userId
            };
        }
    }

})();
