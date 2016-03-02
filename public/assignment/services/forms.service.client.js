(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);
    function FormService($scope, $location, $rootScope){
        var formsApi = {
            forms:
                [
                    {"_id": "000", "title": "Contacts", "userId": 123},
                    {"_id": "010", "title": "ToDo",     "userId": 123},
                    {"_id": "020", "title": "CDs",      "userId": 234},
                ],
            createFormForUsers: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        }
        return formsApi;


    }

})();
