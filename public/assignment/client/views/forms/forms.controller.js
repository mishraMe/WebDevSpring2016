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
        console.log(vm.currentUser);

        function init(){
            UserService.getCurrentUser()
                .then(function(resp){
                    vm.currentUser = resp.data;
                    FormService
                        .findAllFormsForUser(vm.currentUser._id)
                        .then(function(response){
                            vm.forms= response.data;
                            vm.form = null;
                        });
                })
        }
        init();

        function addForm(form){
                FormService
                    .createFormForUser(vm.currentUser._id, form)
                    .then(function(response) {
                        init();
                    });
        }

        function deleteForm(form){
            var formsAfterDeletion=[];
            FormService
                .deleteFormById(form._id)
                .then(function(response){
                    init();
                });
        }

        function updateForm(newForm){
            var renewedForm = {
                title: newForm.title,
                userId: newForm.userId
            };

            if(vm.form._id == null){
                vm.error = "Form name cannot be empty";
            }
            FormService
                .updateFormById(vm.form._id, renewedForm)
                .then(function(response){
                    init();
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
