(function(){
    "use strict"
    angular
        .module("FormBuilderApp")
        .controller("FieldController",FieldController);

    function FieldController(FieldService, $routeParams){

        var vm = this;
        var formId = $routeParams.formId;

        var fieldTypes =[
            {
                fieldOption: "singleText",
                template:
                {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"}
            },
            {
                fieldOption: "paragraphTextField",
                template:
                {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"}
            },
            {
                fieldOption: "date",
                template:{"_id": null, "label": "New Date Field", "type": "DATE"}
            },
            {
                fieldOption: "dropDown",
                template:
                {"_id": null, "label": "New Dropdown", "type": "OPTIONS",
                    "options": [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                    ]
                }
            },
            {
                fieldOption: "checkboxes",
                template:
                {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES",
                    "options": [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                    ]
                }
            },
            {
                fieldOption: "radioButtons",
                template:
                {"_id": null, "label": "New Radio Buttons", "type": "RADIOS",
                    "options": [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                    ]
                }
            }
        ];

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
                           //     console.log("response data is passed from model YAY");
                               vm.fields=(response.data);
                            });
                    });
        }
        init();

        vm.addField = addField;
        vm.removeField = removeField;
        vm.editField = editField;

        function addField(fieldType){
            var newFieldTemplate = findTemplateForFieldType(fieldType);
            console.log("newFieldTemplate is");
            console.log(newFieldTemplate);
            console.log("CurrentForm value is :");
            console.log(vm.currentForm);
            FieldService
                .createFieldForForm(vm.currentForm._id, newFieldTemplate)
                .then(function(response){
                 vm.fields = response.data;
                });

        };

        function findTemplateForFieldType(fieldType){
            for (var index in fieldTypes){
                if(fieldTypes[index].fieldOption=== fieldType){
                    return fieldTypes[index].template;
                }
            }

        };

        function removeField(field){

        };

        function editField(field){

        }

    }

})();