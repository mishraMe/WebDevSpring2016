module.exports = function(app, formModel) {
    app.get("/api/assignment/form/:formId/field", getFieldsOfForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldOfForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldFromForm);
    app.post("/api/assignment/form/:formId/field", createFieldInForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldInForm);
    app.get("/api/assignment/form/:formId", getMyForm);

    function getFieldsOfForm(req, res){
        console.log("entered get Fields of form in server services");
        var formId = req.params.formId;
        var fields =[];
        fields =
            formModel
                .findAllFieldsInForm(formId)
                .then(
                    function(result)
                    {
                        res.json(result);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
    };

    function getFieldOfForm(req, res){
        var fieldId = req.params.fieldId;
        var formId = req.params.formId;
            formModel
                .findFieldInForm(fieldId, formId)
                .then(
                    function(result)
                    {
                        res.json(result);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
    };


    function createFieldInForm(req, res){
        console.log("CreateFieldInForm in server service");
        var newField = req.body;
        var formId = req.params.formId;
        formModel
            .createFieldInForm(formId, newField)
            .then(
                function(result)
                {
                    res.json(result);

                },
                function(err){
                    res.status(400).send(err);
                }
            );
    };

    function deleteFieldFromForm(req, res){
        var fieldId = req.params.fieldId;
        var formId = req.params.formId;
           formModel.deleteFieldFromForm(fieldId,formId)
               .then(
                   function(result)
                   {
                       console.log("entered the then and result");
                       res.json(result);

                   },
                   function(err){
                       console.log("entered the then and err");
                       res.status(400).send(err);
                   }
               );
    };

    function updateFieldInForm(req, res){
        console.log("entered the updateFieldInForm server wc_services")
        var updatedField = req.body;
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var allFields =
            formModel
                .updateFieldInForm(formId,fieldId, updatedField)
                .then(
                    function(result)
                    {
                        res.json(result);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
    };

    function getMyForm(req, res){
        var form =
            formModel
                .findFormById(req.params.formId)
                .then(
                    function(result)
                    {
                        res.json(result);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
    }
};
