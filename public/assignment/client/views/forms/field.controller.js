(function(){
    "use strict"
    angular
        .module("FormBuilderApp")
        .controller("FieldController",FieldController);

    function FieldController(FormService,FieldService,$location,$rootScope,$scope){


        var vm = this;
        vm.currentForm = FormService.getCurrentForm();
        console.log("currentForm value is");
        console.log(vm.currentForm);
        console.log("inside FieldController");


        //vm.addForm = addForm;

        function init(){
            console.log("inside FieldController init");
            FieldService
                .getFieldsForForm(vm.currentForm._id)
                .then(function(response){
                    vm.fields=response.data;
                });
        }
        init();

        //function addField(fieldType){
        //
        //    var newField = {
        //        label:
        //    }
        //
        //
        //    FormService
        //        .createFieldInForm(vm.currentForm._id, )
        //        .then(function(response){
        //            FormService
        //                .findAllFormsForUser(vm.currentUser._id)
        //                .then(function(resp){
        //                    vm.forms= resp.data;
        //                });
        //        });
        //    vm.form = null;
        //}


    }

})();