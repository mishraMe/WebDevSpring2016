module.exports = function(app, formModel) {
    app.get("/api/assignment/form/:formId/field", getFieldsOfForm);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldOfForm);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldFromForm);
    app.post("/api/assignment/form/:formId/field", createFieldInForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldInForm);
    app.put("/api/assignment/form/:formId/field", sortFields);
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
        console.log("entered the updateFieldInForm server services")
        var updatedField = req.body;
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
            formModel
                .updateFieldInForm(formId,fieldId, updatedField)
                .then(
                    function(result)
                    {
                        console.log("entered the result");
                        res.send(result);
                    },
                    function(err){
                        console.log("entered err")
                        res.status(400).send(err);
                    }
                );
    };


    function sortFields(req, res) {
        console.log("entered the sortFields in fieldService");
        var formId = req.params.formId;
        var startIndex = req.query.startIndex;
        var endIndex = req.query.endIndex;

        if(startIndex && endIndex) {

            formModel.sortFields(formId, startIndex, endIndex)

                .then(function (stat) {
                        console.log("entered the then  and success of sortFields")

                       res.json(200);
                    },
                    function (err) {

                        res.json(400);
                    })
        }else{
            updateFieldInForm(req, res);
        }

    }

    function getMyForm(req, res){
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
