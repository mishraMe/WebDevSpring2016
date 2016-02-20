(function(){
    $(init);
    var $movieTitleText;
    var $searchMovieBtn;
    var searchUrl= "https://www.omdbapi.com/?s=TITLE&page=PAGE";
    function init(){
        $movieTitleText=$("#movieTitleText");
        $searchMovieBtn=$("#searchMovieBtn");
        $searchMovieBtn.click(searchMovieBtnOnClick);
    }

    function searchMovieBtnOnClick(){
        var url=searchUrl
            .replace("TITLE", $movieTitleText.val())
            .replace("PAGE",1);
        alert(url);


    }

})();