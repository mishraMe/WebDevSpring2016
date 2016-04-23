(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($rootScope, $http){
        var formsApi = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            setCurrentForm: setCurrentForm,
            getCurrentForm: getCurrentForm,
            getFormById: getFormById,
        };
        //$rootScope.forms = formsApi.forms;
        return formsApi;


        function setCurrentForm(form){
            $rootScope.currentForm= form;
        }

        function getCurrentForm(){
            return $rootScope.currentForm;
        }

        function createFormForUser(userId, form){
            return $http.post("/api/assignment/user/"+userId+"/form", form);
        };

        function findAllFormsForUser(userId){
       //     console.log("entered find All forms for User");
           return $http.get("/api/assignment/user/"+userId+"/form");
        };

        function deleteFormById(formId){
        //    console.log("entered deleteFormById in forms wc_services client");
           return $http.delete("/api/assignment/form/"+ formId);
        };

        function updateFormById(formId, newForm){
            return $http.put("/api/assignment/form/"+ formId, newForm);
        };

        function getFormById (formId) {
            return $http.get("/api/assignment/form/" + formId);
        }
    }
})();
