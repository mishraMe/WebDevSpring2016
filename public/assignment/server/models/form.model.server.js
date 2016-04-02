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
        var newForm = {
            userId : form.userId,
            title : form.title,
            fields : [],
            created: new Date(),
            updated: new Date()
        };
       return FormModel.create(newForm);
    };

    function findAllForms () {
        return FormModel.find();
    };

    function findFormById (formId) {
        return FormModel.findById(mongoose.Types.ObjectId(formId));
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
        console.log("userId is " + userId);
        var formsForUser = [];
         formsForUser = FormModel.find({userId: userId});
        return formsForUser;
    };

    //functions for fields of the form
    function createFieldInForm(formId, newField){

       return FormModel
            .findById(formId)
            .then(function(result) {
                result.fields.push(newField);
               return result.save();
                });
    };


    function deleteFieldFromForm(fieldId, formId){
        console.log("entered the deleteFieldFromForm in model");
       return FormModel
            .findById(formId)
            .then(function(result){
                console.log("entered the then for delete");
                 result.fields.id(fieldId).remove();
                     return result.save();
            });

    };


    function findAllFieldsInForm(formId){
    return FormModel
        .findById(formId)
        .then(function(result){
            return result.fields;
        })

    };

    function findFieldInForm(fieldId, formId){

       return FormModel.findById(formId)
            .then(function(form){
                return form.fields.id(fieldId);
            });
    };


    function updateFieldInForm(formId, fieldId, updatedField){
       return FormModel
           .findById(formId)
           .then(function(form){
               console.log("entered the updatedFieldInForm");
               var field = form.fields.id(fieldId);
               field.label  = updatedField.label;
               field.placeholder = updatedField.placeholder;
               field.options = updatedField.options;
               return form.save();
           })
    };
}
