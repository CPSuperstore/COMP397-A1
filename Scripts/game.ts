//IIFE -- Immediatly Invoked Function Expression
// Annonomys self executing function
// run lite-server to run
let game = (function(){

    let canvas:HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
    let stage:createjs.Stage;
    let playButton:objects.Button;
    let slotItems:objects.WheelItem[][];
    const SLOT_START_X:number[] = [135, 245, 350, 460, 570];
    const SLOT_START_Y:number = 560;
    const SLOT_Y_OFFSET = 130;
    const SPINNER_ROWS = 10;

    function Start():void{
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60;     // Declare the framerate at 60fps
        createjs.Ticker.on("tick", Update);

        Main();
    }

    function startSpinning():void{
        slotItems.forEach(row => {
            row.forEach(col => {
                col.StartSpinning();
            });
        });
    }

    function Update():void{
        // Every frame
        stage.update();
        slotItems.forEach(row => {
            row.forEach(col => {
                col.Update();
            });
        });
        if(slotItems[slotItems.length-1][0].y > 170){
            slotItems.forEach(row => {
                row.forEach(col => {
                    col.StopSpinning();
                });
            });
        }
    }

    function GenerateSlotItems():void{
        slotItems = [[], [], [], [], []];
        for (let i = 0; i < slotItems.length; i++) {
            for (let j = SPINNER_ROWS; j > 0; j--) {
                slotItems[i].push(new objects.WheelItem("./Assets/images/machineParts/icons/python.png", SLOT_START_X[i], SLOT_START_Y - (j * SLOT_Y_OFFSET), true));   
            }
        }

        slotItems.forEach(row => {
            row.forEach(col => {
                stage.addChild(col);
            });
        });
    }

    function Main():void{

        GenerateSlotItems();
        
        stage.addChild(new objects.Image("./Assets/images/machineParts/title.png", 13, 10));
        stage.addChild(new objects.Image("./Assets/images/machineParts/slots.png", 350, 300, true));
    
        playButton = new objects.Button("./Assets/images/buttons/play.png", 100, 100, false, startSpinning);
        stage.addChild(playButton);
    }

    window.addEventListener("load", Start);

})();