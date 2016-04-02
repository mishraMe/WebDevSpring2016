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
        console.log(vm.currentUser);

        function init(){
            FormService
                .findAllFormsForUser(vm.currentUser._id)
                .then(function(response){
                    vm.forms= response.data;
                });
        }
        init();

        function addForm(form){
                FormService
                    .createFormForUser(vm.currentUser._id, form)
                    .then(function(response){
                        FormService
                            .findAllFormsForUser(vm.currentUser._id)
                            .then(function(resp){
                                vm.forms= resp.data;
                            });
                    });
            vm.form = null;
        }

        function deleteForm(form){
            var formsAfterDeletion=[];
            FormService
                .deleteFormById(form._id)
                .then(function(response){
                    FormService
                        .findAllFormsForUser(vm.currentUser._id)
                        .then(function(resp){
                            vm.forms= resp.data;
                            vm.error = null;
                        });
                });
        }

        function updateForm(newForm){
            var renewedForm = {
                _id: newForm._id,
                title: newForm.title,
                userId: newForm.userId
            };

            var currentFormId = vm.form._id;
            delete vm.form._id;

            if(currentFormId == null){
                vm.error = "Form name cannot be empty";
            }
            FormService
                .updateFormById(currentFormId, renewedForm)
                .then(function(response){
                    FormService
                        .findAllFormsForUser(vm.currentUser._id)
                        .then(function(resp){
                            vm.forms= resp.data;
                            vm.error = null;
                            vm.form = null;
                        });
                });

        }


        function selectForm($index){
            var formId = vm.forms[$index]._id;
            delete vm.forms[$index]._id;
            vm.form = {
                _id: formId,
                title: vm.forms[$index].title,
                userId: vm.forms[$index].userId
            }
        }
    }

})();
