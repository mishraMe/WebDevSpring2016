//document.controller.js
(function(){
    "use strict";
    angular.module("WritersClubApp")
        .controller("DocumentTableController", documentTableController);

    function documentTableController($scope, $http, UserService, DocumentService){

        //variables :
        $scope.error=null;
        $scope.message= null;
        $scope.selectedDocument= null;
        $scope.createDocument= createDocument;
        $scope.deleteDocument = deleteDocument;
        $scope.updateDocument = updateDocument;
        $scope.selectDocument = selectDocument;
        $scope.documentTable= DocumentService.getAllDocuments();

        // functions

        function createDocument(document){
            function callback (response) {
                if (document === null) {
                    $scope.message = "Please enter a document name";
                } else {
                    $scope.documentTable = DocumentService.getAllDocuments();
                }
            }
            DocumentService.createDocumentInTable
            (document, callback);
            $scope.document = null;
        }

        function deleteDocument($index){
            //function is responsible for deleting a document by the index value
            var documentsAfterDeletion=[];
            var callback=
                function(response){
                    documentsAfterDeletion= response;
                    $scope.documentTable = DocumentService.getAllDocuments();
                    $scope.error = null;
                };
            DocumentService.deleteDocumentInTable
            ($scope.documentTable[$index]._id, callback);
        }

        function updateDocument(newDocument){

            //function is responsible for updating selected document to the new document's value
            if(!newDocument){
                $scope.message = "Please enter updates";
            }
            var renewedDocument = {
                title: newDocument.title,
                username: newDocument.username,
                rating: newDocument.rating
            };
            function callback (response){
                console.log(response);
                if($scope.document.title == null){
                    $scope.error = "Document name cannot be empty";
                }else {
                    $scope.documentTable= DocumentService.getAllDocuments();
                    $scope.error=null;
                }
            };
            DocumentService.updateDocumentInTable($scope.document._id, renewedDocument,callback);
            $scope.document=null;
        }

        function selectDocument($index){
            // console.log("hello select document");
            //function is responsible for selecting a document to edit
            $scope.document = {
                _id: $scope.documentTable[$index]._id,
                title: $scope.documentTable[$index].title,
                username: $scope.documentTable[$index].username,
                rating: $scope.documentTable[$index].rating
            };
        }
    }
})();
