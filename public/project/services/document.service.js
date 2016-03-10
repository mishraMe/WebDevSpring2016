// document.service.js
(function(){
    angular
        .module("WritersClubApp")
        .factory("DocumentService", documentService);

        function documentService($rootScope){

        var documentApi = {
            documents:
                [
                    {"_id": "000", "title": "First Day At School",
                        "rating":3, "userId": 123},
                    {"_id": "001", "title": "A Dream",
                        "rating":4, "userId": 123},
                    {"_id": "002", "title": "Love is literally in the air",
                        "rating":5,"userId": 234},
                    {"_id": "003", "title": "The most beautiful girl",
                        "rating":5, "userId": 456},
                    {"_id": "004", "title": "God is on a Holiday",
                        "rating":5, "userId": 567},
                    {"_id": "005", "title": "55, Mahaveer Nagar, Indore",
                        "rating":5,"userId": 567},
                ],
            getCurrentDocument: getCurrentDocument,
            setCurrentDocument: setCurrentDocument,
            getAllDocuments: getAllDocuments,
            createDocumentForUser: createDocumentForUser,
            findAllDocumentsForUser: findAllDocumentsForUser,
            deleteDocumentById: deleteDocument,
            updateDocumentById: updateDocument,
        };
        return documentApi;

        function setCurrentDocument(document){
            $rootScope.currentDocument= document;
        };

        function getCurrentDocument(){
            return $rootScope.currentDocument;
        };

        function getAllDocuments(){
            return documentApi.documents;
        };

        function createDocumentForUser(userId, document, callback){
            if(document!= null){
                var newDocument = {
                    "_id": (new Date).getTime(),
                    "title": document.title,
                    "userId": userId
                }
                documentApi.documents.push(newDocument);
                callback(newDocument);
            }
            callback();
        };

        function findAllDocumentsForUser(userId){
            var documentsForUser = [];
            if(!userId){
                return null;
            }
            for(var i in documentApi.documents){
                if(documentApi.documents[i].userId == userId){
                    documentsForUser.push(documentApi.documents[i]);
                }
            }
            return documentsForUser;
        };

        function updateDocument(documentId){
            var updatedDocument;
            for(var k in updatedDocument.documents){
                if(documentApi.documents[k]._id == documentId){
                    documentApi.documents[k].title = newDocument.title;
                    updatedDocument=documentApi.documents[k];
                    callback(updatedDocument);
                    break;
                }
            }
        };
        function deleteDocument(documentId){
            var documentsAfterDeletion=[];
            for(var j in documentApi.documents){
                if(documentApi.documents[j]._id == documentId){
                    documentApi.documents.splice(j,1);
                }
            }
            documentsAfterDeletion = documentApi.documents;
            callback(documentsAfterDeletion);
        };
    };


})();