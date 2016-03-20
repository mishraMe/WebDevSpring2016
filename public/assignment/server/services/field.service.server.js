module.exports = function(app, formModel) {
    app.get("/api/assignment/form/:formId/field", getFieldsOfForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldOfForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldFromForm);
    app.post("/api/assignment/form/:formId/field", createFieldInForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldInForm);

    function getFieldsOfForm(req, res){
        console.log("entered get Fields of form in server service");
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
        formModel.deleteFieldFromForm(fieldId,formId);
    };

    function createFieldInForm(req, res){
        var newField = req.body;
        var formId = req.params.formId;
        newField._id = (new Date).getTime();
        formModel.createFieldInForm(formId, newField);
    };

    function updateFieldInForm(req, res){
        var updatedField = req.body;
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel.updateFieldInForm(formId,fieldId, updatedField);
    };
};
