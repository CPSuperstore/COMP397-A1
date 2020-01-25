//IIFE -- Immediatly Invoked Function Expression
// Annonomys self executing function
// run lite-server to run
let game = (function(){

    let canvas:HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
    let stage:createjs.Stage;
    let helloLabel:createjs.Text;

    function Start():void{
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60;     // Declare the framerate at 60fps
        createjs.Ticker.on("tick", Update);

        Main();
    }

    function Update():void{
        // Every frame
        stage.update();
    }

    function Main():void{
        helloLabel = new createjs.Text("Hello World", "40px Consolas", "#000000");
        stage.addChild(helloLabel);
    }

    window.addEventListener("load", Start);

})();