//document.controller.js
(function(){
    "use strict";
    angular.module("WritersClubApp")
        .controller("DocumentController", documentController);

    function documentController($scope, $http, UserService, DocumentService){

        //variables :
        $scope.error=null;
        $scope.message= null;
        $scope.selectedDocument= null;
        $scope.createDocument= createDocument;
        $scope.deleteDocument = deleteDocument;
        $scope.updateDocument = updateDocument;
        $scope.selectDocument = selectDocument;
        $scope.currentUser = UserService.getCurrentUser();
        if($scope.currentUser){
            $scope.myDocuments=DocumentService.findAllDocumentsForUser($scope.currentUser._id);
        }
        $scope.allDocuments=DocumentService.getAllDocuments();

        // functions

        function createDocument(document){
            function callback (response) {
                if (document === null) {
                    $scope.message = "Please enter a document name";
                } else {
                    $scope.document = DocumentService.findAllDocumentsForUser($scope.currentUser._id);
                }
            }
            DocumentService.createDocumentForUser
            ($scope.currentUser._id, document, callback);
            $scope.document = null;
        }

        function deleteDocument($index){
            //function is responsible for deleting a document by the index value
            var documentsAfterDeletion=[];
            var callback=
                function(response){
                    documentsAfterDeletion= response;
                    $scope.documents= DocumentService.findAllDocumentsForUser($scope.currentUser._id);
                    $scope.error = null;
                };
            DocumentService.deleteDocumentById()
            ($scope.documents[$index]._id, callback);
        }

        function updateDocument(newDocument){
            //function is responsible for updating selected document to the new document's value
            if(!newDocument){
                $scope.message = "Please enter updates";
            }
            var renewedDocument = {
                _id: newDocument._id,
                title: newDocument.title,
                userId: newDocument.userId
            };
            function callback (response){
                if($scope.document.title == null){
                    $scope.error = "Document name cannot be empty";
                }else {
                    $scope.documents = DocumentService.findAllDocumentsForUser($scope.currentUser._id);
                    $scope.error=null;
                }
            };
            DocumentService.updateDocumentById($scope.document._id, renewedDocument,callback);
            $scope.document=null;
        }

        function selectDocument($index){
            // console.log("hello select document");
            //function is responsible for selecting a document to edit
            $scope.document = {
                _id: $scope.documents[$index]._id,
                title: $scope.documents[$index].title,
                userId: $scope.documents[$index].userId
            };
        }
    }
})();
