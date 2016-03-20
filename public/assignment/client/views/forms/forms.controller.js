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

        function init(){
            FormService
                .findAllFormsForUser(vm.currentUser._id)
                .then(function(response){
                    vm.forms= response.data;
                    //console.log("response is ");
                    //console.log(response);
                    //console.log("response data is");
                    //console.log(response.data);
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
            //function is responsible for deleting a form by the index value
            var formsAfterDeletion=[];
           // console.log("form Id is");
           // console.log(form._id);

            FormService
                .deleteFormById(form._id)
                .then(function(response){
             //       console.log("entered then condition of deleteFormByID");
                    FormService
                        .findAllFormsForUser(vm.currentUser._id)
                        .then(function(resp){
                          //  console.log("entrered then condition of find All forms in delete funciton");
                          //  console.log(resp);
                            vm.forms= resp.data;
                            vm.error = null;
                        });
                });
        }

        function updateForm(newForm){
            //function is responsible for updating selected form to the new form's value
           // console.log("entered updatedForm")
            var renewedForm = {
                _id: newForm._id,
                title: newForm.title,
                userId: newForm.userId
            };
            if(vm.form._id == null){
                vm.error = "Form name cannot be empty";
            }
            FormService
                .updateFormById(vm.form._id, renewedForm)
                .then(function(response){
                    FormService
                        .findAllFormsForUser(vm.currentUser._id)
                        .then(function(resp){
                            vm.forms= resp.data;
                            vm.error = null;
                           // vm.form = null;
                        });
                });

        }

        function selectForm($index){
           // console.log("hello select form");
            //function is responsible for selecting a form to edit
            vm.form = {
                _id: vm.forms[$index]._id,
                title: vm.forms[$index].title,
                userId: vm.forms[$index].userId
            }
            FormService.setCurrentForm(vm.form);

        }
    }

})();
