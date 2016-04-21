//config.js
(function(){
    "use strict";
    angular
        .module("WritersClubApp")
        .config(configuration);
    function configuration($routeProvider){

        $routeProvider
            //header links where account and admin are common amongst header and sidebar
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                // controller: "HomeController"
            })

            .when("/register",{
                templateUrl: "views/user/register/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })

            .when("/login",{
                templateUrl: "views/user/login/login.view.html",
                controller: "LoginController",
                controllerAs: "model"

            })

            .when("/profile",{
                templateUrl: "views/user/profile/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve:{
                    loggedin:checkLoggedin
                }
            })

            .when("/account/:username",{
                templateUrl: "views/user/account/account.view.html",
                controller: "AccountController",
                controllerAs: "model"
            })

            // paths for posts
            .when("/editPost",{
                templateUrl: "views/post/editPost.view.html",
                controller: "PostController",
                controllerAs: "model"
            })

            //this view is handled by the same controller and provides a different view.
            .when("/viewPost",{
                templateUrl: "views/post/viewPost.view.html",
                controller: "PostController",
                controllerAs: "model"
            })

            //this view is handled by the same controller and provides a different view.
            .when("/myPosts",{
                templateUrl: "views/post/myPosts.view.html",
                controller: "PostController",
                controllerAs: "model",
                resolve:{
            loggedin:checkLoggedin
        }
            })

            //this view is handled by the same controller and provides a different view.
            .when("/publicPosts",{
                templateUrl: "views/post/publicPosts.view.html",
                controller: "PostController",
                controllerAs: "model"
            })

            //reviews on post

            .when("/post/:postId/review/usersLiked",{
                templateUrl: "views/post/review/usersLiked.view.html",
                controller: "ReviewController",
                controllerAs: "model"
            })

            //follower and following
            .when("/followers/:username",{
                templateUrl: "views/user/follow/followers.view.html",
                controller: "FollowController",
                controllerAs: "model",
            })

            .when("/following/:username",{
                templateUrl: "views/user/follow/following.view.html",
                controller: "FollowController",
                controllerAs: "model",
            })

            //search paths
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
            })

            .when("/search/:title",{
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
            })

            .when("/details/:id", {
                templateUrl: "views/details/details.view.html",
                controller: "DetailsController",
                controllerAs: "model"
            })

            //admin paths //table views links
            .when("/admin/postTable", {
                templateUrl: "views/admin/postTable.view.html",
                controller: "PostTableController",
                controllerAs: "model",
                resolve:{
                    loggedin:checkAdmin
                }
            })
            .when("/admin/userTable", {
                templateUrl: "views/admin/userTable.view.html",
                controller: "UserTableController",
                controllerAs: "model",
                resolve:{
                    loggedin:checkAdmin
                }
            })
            .when("/admin/reviewTable", {
                templateUrl: "views/admin/reviewTable.view.html",
                controller: "ReviewTableController",
                controllerAs: "model",
                resolve:{
                    loggedin:checkAdmin
                }
            })
            .otherwise({
                redirectTo:"/home"
            })
    }

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.error = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.error = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };
    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.error = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };


    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin')
            .success(function(user){
                $rootScope.errorMessage = null;
                    // User is Authenticated
                if (user !== '0' && user.roles.indexOf('admin') != -1)
                {
                    $rootScope.currentUser = user;
                    deferred.resolve();
                }
            });
            return deferred.promise;
        };


})();