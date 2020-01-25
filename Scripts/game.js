"use strict";
//IIFE -- Immediatly Invoked Function Expression
// Annonomys self executing function
// run lite-server to run
var game = (function () {
    var canvas = document.getElementsByTagName("canvas")[0];
    var stage;
    var helloLabel;
    function Start() {
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // Declare the framerate at 60fps
        createjs.Ticker.on("tick", Update);
        Main();
    }
    function Update() {
        // Every frame
        stage.update();
    }
    function Main() {
        helloLabel = new createjs.Text("Hello World", "40px Consolas", "#000000");
        stage.addChild(helloLabel);
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=game.js.map