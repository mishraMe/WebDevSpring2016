module.exports = function(app, formModel) {
    app.get("/api/assignment/user/:userId/form", getFormsForUser);
    app.get("/api/assignment/form/:formId", getFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormById);

    function getFormsForUser(req, res){
        var userId = req.params.userId;
        var forms = formModel.findFormsForUser(userId);
        res.json(forms);
    };

    function getFormById(req, res){
        var formId = req.params.formId;
        var form = formModel.findFormById(formId);
        res.send(form);
    };

    function deleteFormById(req, res){
        var deleteFormId = req.params.formId;
        formModel.deleteForm(deleteFormId);
    };

    function createFormForUser(req, res){
        var form = req.body;
        var userId = req.params.userId;
        form.userId = userId;
        var createdForm = formModel.createForm(form);
        res.send(createdForm);
    };

    function updateFormById(req, res){
        var formId = req.params.formId;
        var updatedForm = req.body;
        formModel.updateForm(formId, updatedForm);
    };
};
