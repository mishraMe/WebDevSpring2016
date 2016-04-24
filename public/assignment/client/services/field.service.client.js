(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http){
        var fieldsApi = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField,
            getMyForm: getMyForm,
            sortFields: sortFields
        };
        //$rootScope.forms = formsApi.forms;
        return fieldsApi;

        function createFieldForForm(formId, field){
            return $http.post("/api/assignment/form/"+formId+"/field", field);
        };

        function getFieldsForForm(formId){
            return $http.get("/api/assignment/form/"+formId+"/field");
        };

        function getFieldForForm(formId, fieldId){
            return $http.get("/api/assignment/form/"+formId+"/field/"+ fieldId);
        };

        function deleteFieldFromForm(formId, fieldId){
            return $http.delete("/api/assignment/form/"+ formId+"/field/"+ fieldId);
        }

        function updateField(formId, fieldId, field){
            console.log("entered the updateField in client services");
            return $http.put("/api/assignment/form/"+formId+"/field/"+ fieldId, field);
        };

        function getMyForm(formId){
            return $http.get("/api/assignment/form/"+ formId);
        };

        function sortFields(formId, startIndex, endIndex) {
            return $http.put("/api/assignment/form/"+formId+"/field?startIndex="+startIndex+"&endIndex="+endIndex);
        }
    }
})();
