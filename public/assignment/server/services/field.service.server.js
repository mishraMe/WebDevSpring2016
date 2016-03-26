module.exports = function(app, formModel) {
    app.get("/api/assignment/form/:formId/field", getFieldsOfForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldOfForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldFromForm);
    app.post("/api/assignment/form/:formId/field", createFieldInForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldInForm);
    app.get("/api/assignment/form/:formId", getMyForm);

    function getFieldsOfForm(req, res){
        console.log("entered get Fields of form in server wc_services");
        var formId = req.params.formId;
        var fields =[];
        fields = formModel.findAllFieldsInForm(formId);
        res.json(fields);
    };

    function getFieldOfForm(req, res){
        var fieldId = req.params.fieldId;
        var formId = req.params.formId;
        var field =  formModel.findFieldInForm(fieldId, formId);
        res.send(field);
    };

    function deleteFieldFromForm(req, res){
        var fieldId = req.params.fieldId;
        var formId = req.params.formId;
       var formsAfterDeletion = formModel.deleteFieldFromForm(fieldId,formId);
        res.json(formsAfterDeletion);
    };

    function createFieldInForm(req, res){
        var newField = req.body;
        var formId = req.params.formId;
        newField._id = (new Date).getTime();
        var allFields= formModel.createFieldInForm(formId, newField);
        res.json(allFields);
    };

    function updateFieldInForm(req, res){
        console.log("entered the updateFieldInForm server wc_services")
        var updatedField = req.body;
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var allFields = formModel.updateFieldInForm(formId,fieldId, updatedField);
        allFields = res.json(allFields);
    };

    function getMyForm(req, res){
        var form = formModel.findFormById(req.params.formId);
        res.send(form);
    }
};
