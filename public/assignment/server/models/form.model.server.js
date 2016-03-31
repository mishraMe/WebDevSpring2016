module.exports = function(app, db, mongoose){


    var FormSchema = require('./form.schema.server.js')(mongoose);
    var FieldSchema = require('./field.schema.server.js')(mongoose);

    // create user model from schema
    var FormModel = mongoose.model("Form", FormSchema);
    var FieldModel= mongoose.model("Field", FieldSchema);


    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle,
        findFormsForUser: findFormsForUser,

        //field model;
        findAllFieldsInForm: findAllFieldsInForm,
        findFieldInForm: findFieldInForm,
        deleteFieldFromForm: deleteFieldFromForm,
        createFieldInForm: createFieldInForm,
        updateFieldInForm: updateFieldInForm
    };

    return api;

    function createForm (form) {
       return FormModel.create(form);
    };

    function findAllForms () {
        return FormModel.find();
    };

    function findFormById (formId) {
        return FormModel.findById(formId);
    };

    function updateForm (formId, form) {
        return FormModel.update({_id: formId}, {$set: form});
    };

    function deleteForm (formId) {
       return FormModel.remove({_id: formId});
    };

    function findFormByTitle(title) {
       return FormModel.findOne({title: title});
    };

    function findFormsForUser(userId) {
        console.log("entred find forms for user in form wc_models server");
        console.log("userId is " + userId);
        var formsForUser = [];
         formsForUser = FormModel.find({userId: userId});
        return formsForUser;
    };


    //functions for fields of the form
    function findAllFieldsInForm(formId){
    return  FormModel.findById({_id: formId}).select("fields");
    };

    function findFieldInForm(fieldId, formId){

        FormModel.findById({_id: formId})
            .then(function(form){
                return form.fields.id(fieldId);
            });
    };

    function deleteFieldFromForm(fieldId, formId){
        console.log("entered the deleteFieldFromForm in wc_models");
        FormModel.findOne({_id: formId})
            .then(function(form){
                FormModel.form.fields.id(fieldId).remove();
                return form.save();
            })
    };

    // note as the function in assignment doesn't mention any return this returns nothing,
    //there is still a possibility of change and a return to be added or the updated form to be accessed
    //from another method.
    function createFieldInForm(formId, newField){
     FormModel.findById({_id: formId})
         .then(function(form){
             form.fields.push(newField);
             return form.save();
         })
    };

    function updateFieldInForm(formId, fieldId, updatedField){
        var field;
       FormModel.findOne({_id: formId})
           .then(function(form){
               form.fields.update({_id: fieldId}, {$set: updatedField});
               return form.save();
           })
    };
}
