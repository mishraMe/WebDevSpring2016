(function(){
    angular
        .module("HelloFromAngular", [])
        .controller("HelloController", HelloController);
    function HelloController(){
        console.log("Hello From Angular");
    }
})();