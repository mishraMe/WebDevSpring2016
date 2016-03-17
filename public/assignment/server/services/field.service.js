module.exports = function(app, formModel) {
    app.get("/api/assignment/form/:formId/field", getFieldsOfForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldOfForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldFromForm);
    app.post("/api/assignment/form/:formId/field", createFieldInForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldInForm);

    function getFieldsOfForm(req, res){

    };

    function getFieldOfForm(req, res){

    };

    function deleteFieldFromForm(req, res){

    };

    function createFieldInForm(req, res){

    };

    function updateFieldInForm(req, res){

    };
};
