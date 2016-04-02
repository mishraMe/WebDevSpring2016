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
        vm.updateField = updateField;
        vm.fields = [];
        vm.fieldType = null;

        //variables
        var formId = $routeParams.formId;
        var fieldTypes =
            [
            {
                fieldOption: "singleText",
                heading: "Single Line Text Field",
                type: "TEXT",
                template:
                {"label": "New Text Field", "type": "TEXT", "placeholder": "New Field"}
            },
            {
                fieldOption: "paragraphTextField",
                heading: "Multi Line Text Field",
                type: "TEXTAREA",
                template:
                {"label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"}
            },
            {
                fieldOption: "date",
                heading: "Date Field",
                type: "DATE",
                template:{"label": "New Date Field", "type": "DATE"}
            },
            {
                fieldOption: "dropDown",
                heading: "Dropdown Field",
                type: "OPTIONS",
                template:
                { "label": "New Dropdown", "type": "OPTIONS",
                    "options": [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                    ]
                }
            },
            {
                fieldOption: "checkBoxes",
                heading: "Checkbox Field",
                type: "CHECKBOXES",
                template:
                {"label": "New Checkboxes", "type": "CHECKBOXES",
                    "options": [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                    ]
                }
            },
            {
                fieldOption: "radioButtons",
                heading: "Radio Button Field",
                type: "RADIOS",
                template:
                {"label": "New Radio Buttons", "type": "RADIOS",
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
                               vm.fields= response.data;
                            });
                    });
        }
        init();

        function addField(fieldType){
        console.log("entered addField");
            vm.fieldType = fieldType;
            var newFieldTemplate = findTemplateForFieldType(vm.fieldType);
            FieldService
                .createFieldForForm(vm.currentForm._id, newFieldTemplate)
                .then(init);
            vm.fieldType = null;
        };

        function findTemplateForFieldType(fieldType){
            for (var index in fieldTypes){
                if(fieldTypes[index].fieldOption== fieldType){
                    return fieldTypes[index].template;
                }
            }

        };

        function removeField(field){
            FieldService
                .deleteFieldFromForm(vm.currentForm._id, field._id)
                .then(init);

        };


        function editField(field){
            vm.field = field;
            vm.modalHeading = findHeadingForModal(vm.field);
            if(vm.field.type == "OPTIONS"
                || vm.field.type == "CHECKBOXES"
                || vm.field.type == "RADIOS"){
                var editedOptions = [];
                var opts=[];
                opts = vm.field.options;
                console.log(opts);
                for (var index in opts) {
                    editedOptions.push(opts[index].label + ":" + opts[index].value);
                }
                vm.newOptions = editedOptions.join("\n");
            }
        };

        function updateField(field){
            vm.field = field;
            if (vm.field.type == "OPTIONS"
                || vm.field.type == "CHECKBOXES"
                || vm.field.type == "RADIOS") {
                var newOptions=[];
                var enteredOptions = vm.newOptions;
                for(var index in enteredOptions){
                    newOptions.push
                    ({
                        "label": enteredOptions[index].split(":")[0],
                        "value": enteredOptions[index].split(":")[1],
                    });
                }
                vm.field.options = newOptions;
            }
            FieldService
                .updateField(vm.currentForm._id, vm.field._id, vm.field)
                .then(init);
        }

        function findHeadingForModal(field){
            for(var index in fieldTypes){
                if(fieldTypes[index].type == field.type){
                    return fieldTypes[index].heading;
                }
            }
        };




    }

})();