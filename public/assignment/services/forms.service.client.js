(function(){
    "use strict";
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($rootScope){
        var formsApi = {
            forms:
                [
                    {"_id": "000", "title": "Contacts", "userId": 123},
                    {"_id": "010", "title": "ToDo",     "userId": 123},
                    {"_id": "020", "title": "CDs",      "userId": 234},
                ],
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        $rootScope.forms = formsApi.forms;
        return formsApi;

        function setCurrentUser(form){
            $rootScope.currentForm= form;
        }

        function getCurrentUser(){
            return $rootScope.currentForm;
        }
        function createFormForUser(userId, form, callback){
           var newForm = {
               "_id": (new Date).getTime(),
               "title": form.title,
               "userId": userId
           }
            formsApi.forms.push(newForm);
            callback(newForm);
        }

        function findAllFormsForUser(userId, callback){
            var formsForUser = [];
            for(var i in formsApi.forms){
                if(formsApi.forms[i].userId == userId){
                    formsForUser = formsForUser.add(formsApi.forms[i]);
                }
            }
            if(formsForUser){
                callback(formsForUser);
            }else{
                callback();
            }
        }

        function deleteFormById(formId, callback){
             var formsAfterDeletion=[];
            for(var j in formsApi.forms){
                if(formsApi.forms[j]._id == formId){
                    formsApi.forms.splice(j,1);
                }
            }
            formsAfterDeletion = formsApi.forms;
            callback(formsAfterDeletion);
        }

        function updateFormById(formId, newForm, callback){
            var editForm;
            for(var k in formsApi.forms){
                if(formsApi.forms[k]._id == formId){
                    formsApi.forms[k].title = newForm.title;
                    editForm=formsApi.forms[k];
                    callback(editForm);
                    break;
                }

            }

        }
    }
})();
