module.exports = function(app, db, mongoose){


    var FormSchema = require('./form.schema.server.js')(mongoose);
    var FieldSchema = require('./field.schema.server.js')(mongoose);
    // create user model from schema
    var FormModel = mongoose.model("Form", FormSchema);
    var FieldModel= mongoose.model("Field", FieldSchema);
    var q = require('q');

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
        updateFieldInForm: updateFieldInForm,
        sortFields: sortFields,
    };

    return api;

    function createForm (form) {
        var deferred = q.defer();
        var newForm = {
            userId : form.userId,
            title : form.title,
            fields : [],
            created: new Date(),
            updated: new Date()
        };
        FormModel.create(newForm,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }


    function findAllForms () {
        var deferred = q.defer();
        FormModel.find(
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;
    }


    function findFormById (formId) {
        var deferred = q.defer();
        FormModel.findById(formId,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;
    }

    function updateForm (formId, form) {
        var deferred = q.defer();
        FormModel.update({_id: formId}, {$set: form},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }

            });
        return deferred.promise;
    }

    function deleteForm (formId) {
        var deferred = q.defer();
       FormModel.remove({_id: formId},
           function (err, doc) {
               if (err) {
                   deferred.reject(err);
               }
               else {
                   deferred.resolve(doc);
               }

           });
        return deferred.promise;
    }


    function findFormByTitle(title) {
        var deferred = q.defer();
       FormModel.findOne({title: title},
           function (err, doc) {
               if (err) {
                   deferred.reject(err);
               }
               else {
                   deferred.resolve(doc);
               }
           });
        return deferred.promise;
    }

    function findFormsForUser(userId) {
        var deferred = q.defer();
        console.log("userId is " + userId);
        var formsForUser = [];
         FormModel.find({userId: userId},

             function (err, doc) {
                 if (err) {
                     deferred.reject(err);
                 }
                 else {
                     deferred.resolve(doc);
                 }
             });
        return deferred.promise;
    }

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


    function sortFields(formId, startIndex, endIndex) {
        return FormModel.findOne(formId)
            .then(function (form) {
                console.log("entered the then of sortFields");
                    form.fields[0].splice(endIndex, 0, form.fields.splice(startIndex, 1));
                    form.markModified("fields");
                   return form.save();

                }
            );

    }
}
