// document.service.js
(function(){
    angular
        .module("WritersClubApp")
        .factory("DocumentService", documentService);

        function documentService($rootScope) {

            var documentApi = {
                documents: [
                    {
                        "_id": "000", "title": "First Day At School",
                        "tag": "story" ,  "type": "private",
                        "userId": 123, "username": "alice"
                    },
                    {
                        "_id": "001", "title": "A Dream",
                        "tag": "poem", "type": "private",
                        "userId": 123, "username": "alice"
                    },
                    {
                        "_id": "002", "title": "Love is literally in the air",
                        "tag": "story", "type": "public",
                        "userId": 234, "username": "bob",
                        "rating" : 5, "comments" : ["hahaha interesting Story"]
                    },
                    {
                        "_id": "003", "title": "The most beautiful girl",
                        "tag": "play", "type": "public",
                        "userId": 456, "username": "dan"
                    },
                    {
                        "_id": "004", "title": "God is on a Holiday",
                        "tag": "story", "type": "public",
                        "userId": 567, "username": "ed"
                    },
                    {
                        "_id": "005", "title": "55, Mahaveer Nagar, Indore",
                        "tag": "script", "type":"private",
                        "userId": 567, "username": "ed"
                    },
                ],

                reviews: [
                    {
                        "_id": "005", "documentId": "005",
                        "title": "55, Mahaveer Nagar, Indore",
                        "rating": 2, "comments":"",
                    },
                    {
                        "_id": "004", "documentId": "004",
                        "title": "God is on a Holiday",
                        "rating" : 4, "comments" : "Great work!"
                    },
                    {
                        "_id": "003", "documentId": "003",
                        "title": "The most beautiful girl",
                        "rating" : 3,
                        "comments" : "Good concept, but the story could be better"
                    },
                    {
                       "_id": "002",  "documentId": "002",
                        "title": "Love is literally in the air",
                        "rating" : 5, "comments" : "hahaha interesting Story"
                    },
                    {
                        "_id": "000", "documentId": "000",
                        "title": "First Day At School",
                        "rating" : 4, "comments": "Great Story"
                    },
                    {
                        "_id": "007", "documentId": "000",
                        "title": "First Day At School",
                        "rating" : 5, "comments": "Wow! I never observed so damn true!!"
                    }
                ],
                getCurrentDocument: getCurrentDocument,
                setCurrentDocument: setCurrentDocument,
                getAllDocuments: getAllDocuments,
                getAllReviews: getAllReviews,
                createDocumentForUser: createDocumentForUser,
                findAllDocumentsForUser: findAllDocumentsForUser,
                deleteDocumentById: deleteDocument,
                updateDocumentById: updateDocument,
                createDocumentInTable: createDocumentInTable,
                deleteDocumentInTable: deleteDocumentInTable,
                updateDocumentInTable: updateDocumentInTable,
                createReviewInTable: createReviewInTable,
                deleteReviewInTable: deleteReviewInTable,
                updateReviewInTable: updateReviewInTable,
            };
            return documentApi;


            function setCurrentDocument(document) {
                $rootScope.currentDocument = document;
            };

            function getCurrentDocument() {
                return $rootScope.currentDocument;
            };

            function getAllDocuments() {
                return documentApi.documents;
            };


            function createDocumentForUser(userId, document, callback) {
                if (document != null) {
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


            function findAllDocumentsForUser(userId) {
                var documentsForUser = [];
                if (!userId) {
                    return null;
                }
                for (var i in documentApi.documents) {
                    if (documentApi.documents[i].userId == userId) {
                        documentsForUser.push(documentApi.documents[i]);
                    }
                }
                return documentsForUser;
            };

            function updateDocument(documentId) {
                var updatedDocument;
                for (var k in updatedDocument.documents) {
                    if (documentApi.documents[k]._id == documentId) {
                        documentApi.documents[k].title = newDocument.title;
                        updatedDocument = documentApi.documents[k];
                        callback(updatedDocument);
                        break;
                    }
                }
            };
            function deleteDocument(documentId) {
                var documentsAfterDeletion = [];
                for (var j in documentApi.documents) {
                    if (documentApi.documents[j]._id == documentId) {
                        documentApi.documents.splice(j, 1);
                    }
                }
                documentsAfterDeletion = documentApi.documents;
                callback(documentsAfterDeletion);
            };
//************************functions for review table***************************************

            function createReviewInTable(review, callback){
                if (review != null) {
                    var newReviewInTable = {
                        "_id": (new Date).getTime(),
                        "documentId":review.documentId,
                        "title": review.title,
                        "rating": review.rating,
                        "comments": review.comments
                    }
                    documentApi.reviews.push(newReviewInTable);
                    callback(newReviewInTable);
                }
                callback();
            }
            function deleteReviewInTable(reviewId, callback){
                var reviewsInTableAfterDeletion = [];
                for (var j in documentApi.reviews) {
                    if (documentApi.reviews[j]._id == reviewId) {
                        documentApi.reviews.splice(j, 1);
                    }
                }
                reviewsInTableAfterDeletion = documentApi.reviews;
                callback(reviewsInTableAfterDeletion);
            }
            function updateReviewInTable(documentId,newDocument, callback){
                console.log("entered updateDocumentInTable document for table view");
                var updatedReviewInTable;
                for (var k in documentApi.documents) {
                    if (documentApi.reviews[k]._id == documentId) {
                        documentApi.reviews[k].documentId= newDocument.documentId;
                        documentApi.reviews[k].rating= newDocument.rating;
                        documentApi.reviews[k].comments = newDocument.comments;
                        updatedReviewInTable = documentApi.documents[k];
                        console.log(updatedReviewInTable);
                        callback(updatedReviewInTable);
                        break;
                    }
                }
            }
            function getAllReviews(){
                return documentApi.reviews;
            }
 //*********************************functions for document Table*****************************************

            function createDocumentInTable(document, callback){
                if (document != null) {
                    var newDocumentInTable = {
                        "_id": (new Date).getTime(),
                        "title": document.title,
                        "username": document.username,
                        "tag": document.tag,
                        "type": document.type
                    }
                    documentApi.documents.push(newDocumentInTable);
                    callback(newDocumentInTable);
                }
                callback();
            }
            function deleteDocumentInTable(documentId, callback){
                var documentsInTableAfterDeletion = [];
                for (var j in documentApi.documents) {
                    if (documentApi.documents[j]._id == documentId) {
                        documentApi.documents.splice(j, 1);
                    }
                }
                documentsInTableAfterDeletion = documentApi.documents;
                callback(documentsInTableAfterDeletion);
            }
            function updateDocumentInTable(documentId,newDocument, callback){
                console.log("entered updateDocumentInTable document for table view");
                var updatedDocumentInTable;
                for (var k in documentApi.documents) {
                    if (documentApi.documents[k]._id == documentId) {
                        documentApi.documents[k].title = newDocument.title;
                        documentApi.documents[k].username= newDocument.username;
                        documentApi.documents[k].type= newDocument.type;
                        documentApi.documents[k].tag= newDocument.tag;
                        updatedDocumentInTable = documentApi.documents[k];
                        console.log(updatedDocumentInTable);
                        callback(updatedDocumentInTable);
                        break;
                    }
                }
            }
        };



})();