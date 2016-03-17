var mockForms = require("./form.mock.json");

module.exports = function(app){
    var formApi = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle,
        findFormsForUser: findFormsForUser,
    };

    return formApi;

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
    }

    function deleteForm (formId) {
        for (var index in mockForms) {
            if (mockForms[index]._id === formId) {
                mockForms.splice(index, 1);
               break;
            }
        }
    }

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

}
