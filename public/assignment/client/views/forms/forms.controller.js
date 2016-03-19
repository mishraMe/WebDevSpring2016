(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService,UserService){

        //variables :
        var vm = this;
        vm.message= null;
        vm.error= null;
        vm.selectedForm= null;
        vm.addForm = addForm;
        vm.deleteForm = deleteForm;
        vm.updateForm = updateForm;
        vm.selectForm = selectForm;
        vm.currentUser = UserService.getCurrentUser();
        vm.forms=FormService.findAllFormsForUser(vm.currentUser._id);

        function addForm(form){
            function callback (response) {
                if (form == null) {
                    vm.message = "Please enter a form name";
                } else {
                    vm.forms = FormService.findAllFormsForUser(vm.currentUser._id);
                }
            }
                FormService.createFormForUser
                (vm.currentUser._id, form, callback);
            vm.form = null;
        }

        function deleteForm($index){
            //function is responsible for deleting a form by the index value
            var formsAfterDeletion=[];

            var callback=
                function(response){
                    formsAfterDeletion= response;
                    vm.forms= FormService.findAllFormsForUserId(vm.currentUser._id);
                    vm.error = null;
                };
            FormService.deleteFormById
            (vm.forms[$index]._id,callback);
        }

        function updateForm(newForm){
            //function is responsible for updating selected form to the new form's value
            var renewedForm = {
                _id: newForm._id,
                title: newForm.title,
                userId: newForm.userId
            };
            function callback (newForm){
                if(vm.form._id == null){
                    vm.error = "Form name cannot be empty";
                }else {
                    vm.forms = FormService.findAllFormsForUserId(vm.currentUser._id);
                    vm.error=null;
                }
            };
            FormService.updateFormById(vm.form._id, renewedForm,callback);
            vm.form=null;
        }

        function selectForm($index){
           // console.log("hello select form");
            //function is responsible for selecting a form to edit
            vm.form = {
                _id: vm.forms[$index]._id,
                title: vm.forms[$index].title,
                userId: vm.forms[$index].userId
            };
        }
    }

})();
