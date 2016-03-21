(function(){
    "use strict"
    angular
        .module("FormBuilderApp")
        .controller("FieldController",FieldController);

    function FieldController(FieldService, $routeParams){

        var vm = this;

        //methods(methods have been written before the variables so for their easy reference)
        vm.addField = addField;
        vm.removeField = removeField;
        vm.editField = editField;

        //variables
        var formId = $routeParams.formId;
        var fieldTypes =
            [
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
                fieldOption: "checkBoxes",
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
                        vm.currentForm = response.data;
                        FieldService
                            .getFieldsForForm(vm.currentForm._id)
                            .then(function(response){
                               vm.fields=(response.data);
                            });
                    });
        }
        init();

        function addField(fieldType){
            var newFieldTemplate = findTemplateForFieldType(fieldType);
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
            //console.log("entered remove field method of controller");
            //console.log("field is ")
            //console.log(field);
            FieldService
                .deleteFieldFromForm(vm.currentForm._id, field._id)
                .then(function(response){
                    console.log("response.data after removeFields is");
                    console.log(response.data);
                    vm.fields=response.data;
                });
        };

        function editField(field){
            vm.field = field;
            var fieldType = field.type
           if( fieldType == "TEXT"){
               textPopup(field._id, field.label, field.placeholder);
           }
           else if( fieldType == "TEXTAREA"){
               textAreaPopup(field._id, field.label, field.placeholder);
           }
           else if (fieldType == "DATE"){
               datePopup(field._id, field.label);
           }
           else if(fieldType == "OPTIONS"){
               dropDownPopup(field._id, field.label, field.options);
           }
           else if(fieldType == "CHECKBOXES"){
               checkBoxPopup(field._id, field.label, field.options);
           }
           else if(fieldType == "RADIOS"){
               radioPopup(field._id, field.label, field.options);
           }
           else{
            console.log("NONE OF THE TYPES MATCHED")
           };

        };


    }

})();