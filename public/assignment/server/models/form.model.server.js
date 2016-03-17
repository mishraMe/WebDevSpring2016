var mockForms = require("./form.mock.json");

module.exports = function(app){
    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle,
        findFormsForUser: findFormsForUser,
        findAllFieldsInForm: findAllFieldsInForm,
        findFieldInForm: findFieldInForm,
        deleteFieldFromForm: deleteFieldFromForm,
        createFieldInForm: createFieldInForm,
        updateFieldInForm: updateFieldInForm
    };

    return api;

    function createForm (form) {
        form._id = (new Date).getTime();
        mockForms.push(form);
        return form;
    };

    function findAllForms () {
        return mockForms;
    };

    function findFormById (formId) {
        for (var index in mockForms) {
            if (mockForms[index]._id === formId) {
                return mockForms[index];
                break;
            }
        }
        return null;
    };

    function updateForm (formId, form) {
        for (var index in mockForms) {
            if (mockForms[index]._id === formId) {
                mockForms[index] = form;
                break;
            }
        }
    };

    function deleteForm (formId) {
        for (var index in mockForms) {
            if (mockForms[index]._id === formId) {
                mockForms.splice(index, 1);
               break;
            }
        }
    };

    function findFormByTitle(title) {
        var form;
        for (var index in mockForms) {
             form = mockForms[index];
            if (form.title === title) {
                return form;
                break;
            }
        }
        return null;
    };

    function findFormsForUser(userId) {
        var formsForUser = [];
        var form;
        for (var index in mockForms) {
            form = mockForms[index];
            if (form.userId === userId) {
                formsForUser.push(form);
            }
        }
        return formsForUser;
    };

    //functions for fields of the form
    function findAllFieldsInForm(formId){
        var fields = [];
        var form;
        for(var index in mockForms){
            form = mockForms[index];
            if(form._id=== formId){
                fields = form.fields;
                return fields;
                break;
            }
        }
        return null;
    };

    function findFieldInForm(fieldId, formId){
        var field;
        var form = findFormById(formId);
        for(var index in form.fields){
            field = form.fields[index];
            if(field._id === fieldId){
                return field;
                break;
            }
        }
        return null;
    };

    function deleteFieldFromForm(fieldId, formId){
        var field;
        var form = findFormById(formId);
        for (var index in form.fields){
            field = form.fields[index];
            if( field._id === fieldId){
                form.fields.splice(index, 1);
                break;
            }
        }
    };

    // note as the function in assignment doesn't mention any return this returns nothing,
    //there is still a possibility of change and a return to be added or the updated form to be accessed
    //from another method.
    function createFieldInForm(formId, newField){
        var form = findFormById(formId);
        newField._id = (new Date).getTime();
        form.fields.push(newField);
    };

    function updateFieldInForm(formId, fieldId, updatedField){
        var form = findFormById(formId);
        var field;
        for(var index in form.fields){
            if(form.fields[index]._id === fieldId){
                form.fields[index] = updatedField;
                break;
            }
        }
    };



}
