//document.controller.js
(function(){
    "use strict";
    angular.module("WritersClubApp")
        .controller("ReviewTableController", reviewTableController);

    function reviewTableController($scope, DocumentService) {

        //variables :
        $scope.error = null;
        $scope.message = null;
        $scope.selectedReview = null;
        $scope.createReview = createReview;
        $scope.deleteReview = deleteReview;
        $scope.updateReview = updateReview;
        $scope.selectReview = selectReview;
        $scope.reviewTable = DocumentService.getAllReviews();


        // functions

        function createReview(review) {
            function callback(response) {
                if (document === null) {
                    $scope.message = "Please enter a post name";
                } else {
                    $scope.documentTable = DocumentService.getAllReviews();
                }
            }

            DocumentService.createReviewInTable
            (review, callback);
            $scope.review = null;
        }

        function deleteReview($index) {
            //function is responsible for deleting a post by the index value
            var reviewsAfterDeletion = [];
            var callback =
                function (response) {
                    reviewsAfterDeletion = response;
                    $scope.reviewTable = DocumentService.getAllReviews();
                    $scope.error = null;
                };
            DocumentService.deleteReviewInTable
            ($scope.reviewTable[$index]._id, callback);
        }

        function updateReview(newReview) {

            //function is responsible for updating selected post to the new post's value
            if (!newReview) {
                $scope.message = "Please enter updates";
            }
            var renewedReview = {
                title: newReview.title,
                _id: newReview._id,
                rating: newReview.rating,
                comments: newReview.comments
            };

            function callback(response) {
                console.log(response);
                if ($scope.review.title == null) {
                    $scope.error = "Document name cannot be empty";
                } else {
                    $scope.reviewTable = DocumentService.getAllReviews();
                    $scope.error = null;
                }
            };
            DocumentService.updateReviewInTable($scope.review._id, renewedReview, callback);
            $scope.review = null;
        }

        function selectReview($index) {
            // console.log("hello select post");
            //function is responsible for selecting a post to edit
            $scope.review = {
                _id: $scope.reviewTable[$index]._id,
                documentId: $scope.reviewTable[$index].documentId,
                title: $scope.reviewTable[$index].title,
                rating: $scope.reviewTable[$index].rating,
                comments: $scope.reviewTable[$index].comments
            };
        }
    }

})();
