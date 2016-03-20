(function(){
    "use strict"
    angular
        .module("FormBuilderApp")
        .controller("FieldController",FieldController);

    function FieldController(FormService, FieldService){


        var vm = this;
        function init(){
            vm.currentForm = FormService.getCurrentForm();
            console.log("currentForm value is");
            console.log(vm.currentForm);
            console.log("inside FieldController init");
            FieldService
                .getFieldsForForm(vm.currentForm._id)
                .then(function(response){
                    console.log("response data is passed from model YAY");
                   vm.fields=(response.data);
                });
        }
        init();

    }

})();