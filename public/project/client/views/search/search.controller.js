(function(){
    var SEARCH_URL = "https://www.googleapis.com/books/v1/volumes?q=search+TITLE";

    angular
        .module("WritersClubApp")
        .controller("SearchController", searchController);

    function searchController($scope, $location, $routeParams,
                              BookService, PostService, UserService) {

        var vm = this;
        $scope.search=search;
        $scope.title= $routeParams.title;
        $scope.$location = $location;
        $scope.viewPost = viewPost;
        $scope.showWriter = showWriter;

        if($scope.title){
            search($scope.title);
        }
        function init(){

        }
        init();

        function search(title) {
            console.log("entered search");
            if(title) {
                fetchBooks(title);
                fetchPosts(title);
                $location.url("/search/"+ $scope.title);
            }
        }

        function fetchBooks(bookTitle) {
            BookService.findBooksByTitle(bookTitle, renderBooks)
        }
        function fetchPosts(title){
            PostService
                .searchPostsByTitle(title)
                .then(function(resp){
                    var bgPosts = [];
                    bgPosts = resp.data;
                    console.log("bg posts is ");
                    console.log(bgPosts);
                    $scope.posts = resp.data;
                })
        }

        function renderBooks(response) {
            $scope.books = response.items;
        }

        function viewPost(post) {
            PostService
                .getAllPublicPosts()
                .then(function(publicPosts) {
                    var posts = [];
                    posts= publicPosts.data;

                    for(var i in posts){
                        if(posts[i].title == (post.title)&&
                           posts[i].username == (post.username)){
                            PostService.setCurrentPost(posts[i])
                            $location.url("/viewPost");
                        }
                    }
                })
        }


        function showWriter(post){
            UserService
                .findUserByUsername(post.username)
                .then(function(response){
                    $location.url("/account/"+ post.username);
                })
        }


    }
})();