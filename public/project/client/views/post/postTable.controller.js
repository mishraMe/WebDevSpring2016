//document.controller.js
(function(){
    "use strict";
    angular.module("WritersClubApp")
        .controller("DocumentTableController", documentTableController);

    function documentTableController(DocumentService){

        var vm = this;
        //variables :
        vm.error=null;
        vm.message= null;
        vm.selectedDocument= null;
        vm.createDocument= createDocument;
        vm.deleteDocument = deleteDocument;
        vm.updateDocument = updateDocument;
        vm.selectDocument = selectDocument;
        vm.documentTable= DocumentService.getAllDocuments();

        // functions

        function createDocument(document){
            function callback (response) {
                if (document === null) {
                    $scope.message = "Please enter a post name";
                } else {
                    $scope.documentTable = DocumentService.getAllDocuments();
                }
            }
            DocumentService.createDocumentInTable
            (document, callback);
            $scope.document = null;
        }

        function deleteDocument($index){
            //function is responsible for deleting a post by the index value
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

            //function is responsible for updating selected post to the new post's value
            if(!newDocument){
                $scope.message = "Please enter updates";
            }
            var renewedDocument = {
                title: newDocument.title,
                username: newDocument.username,
                tag: newDocument.tag,
                type: newDocument.type,
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
            // console.log("hello select post");
            //function is responsible for selecting a post to edit
            $scope.document = {
                _id: $scope.documentTable[$index]._id,
                title: $scope.documentTable[$index].title,
                username: $scope.documentTable[$index].username,
                tag: $scope.documentTable[$index].tag,
                type: $scope.documentTable[$index].type
            };
        }
    }
})();
