(function(){
    "use strict"
    angular
        .module("FormBuilderApp")
        .controller("FieldController",FieldController);

    function FieldController(FieldService, $routeParams){


        var vm = this;
        var formId = $routeParams.formId;
        console.log("formId is "+ formId);

        function init(){
                FieldService
                    .getMyForm(formId)
                    .then(function(response){
                      //  console.log("entered the then condition for field service get form");
                      //  console.log(response.data);
                        vm.currentForm = response.data;
                      //  console.log("current form value is ");
                     //   console.log(vm.currentForm);
                        FieldService
                            .getFieldsForForm(vm.currentForm._id)
                            .then(function(response){
                                console.log("response data is passed from model YAY");
                               vm.fields=(response.data);
                            });
                    });
            console.log("inside FieldController init");

        }
        init();

        function addField(fieldType){

        };

        function removeField(field){

        };

        function editField(field){

        }

    }

})();