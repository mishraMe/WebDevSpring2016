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
    function createFieldInForm(formId, newField){

       return FormModel
            .findById(formId)
            .then(function(result) {
                result.fields.push(newField);
                result.save();
                });

            //return  FormModel
            //    .findOne({_id: formId})
            //    .then(
            //        function(form) {
            //            console.log("entered the then of findOne for createFieldInform");
            //           FieldModel
            //               .create(newField)
            //               .then(function(createdField){
            //                  form.fields.push(createdField);
            //                  return form.save();
            //               });
            //        });
    };


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

    function updateFieldInForm(formId, fieldId, updatedField){
        var field;
       FormModel.findOne({_id: formId})
           .then(function(form){
               form.fields.update({_id: fieldId}, {$set: updatedField});
               return form.save();
           })
    };
}
