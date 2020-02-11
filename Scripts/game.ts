//IIFE -- Immediatly Invoked Function Expression
// Annonomys self executing function
// run lite-server to run
let game = (function(){

    let canvas:HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
    let stage:createjs.Stage;
    let playButton:objects.Button;
    let slotItems:objects.WheelItem[][];
    // Array Structure:
    // [
    //  1  | 1  | 1  | 1  | 1 
    //  2  | 2  | 2  | 2  | 2 
    //  3  | 3  | 3  | 3  | 3 
    //  4  | 4  | 4  | 4  | 4 
    //  5  | 5  | 5  | 5  | 5 
    //  6  | 6  | 6  | 6  | 6 
    //  7  | 7  | 7  | 7  | 7 
    //  8  | 8  | 8  | 8  | 8 
    //  9  | 9  | 9  | 9  | 9 
    //  10 | 10 | 10 | 10 | 10
    // ]
    let calculated:boolean;

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

    function checkRange(value:number, lowerBounds:number, upperBounds:number):boolean {
        return value >= lowerBounds && value <= upperBounds;
    }

    function GetImage():objects.WheelItem{
        let reelSeed:number = Math.floor((Math.random() * 65) + 1);
        let itemName:string = "ruby";

        switch (true) {
            case checkRange(reelSeed, 1, 27):  // 41.5% probability
                itemName = "ruby";
                break;
            case checkRange(reelSeed, 28, 37): // 15.4% probability
                itemName = "swift";
                break;
            case checkRange(reelSeed, 38, 46): // 13.8% probability
                itemName = "csharp";
                break;
            case checkRange(reelSeed, 47, 54): // 12.3% probability
                itemName = "cplusplus";
                break;
            case checkRange(reelSeed, 55, 59): //  7.7% probability
                itemName = "html";
                break;
            case checkRange(reelSeed, 60, 62): //  4.6% probability
                itemName = "typescript";
                break;
            case checkRange(reelSeed, 63, 64): //  3.1% probability
                itemName = "java";
                break;
            case checkRange(reelSeed, 65, 65): //  1.5% probability
                itemName = "python";
                break;
        }
        return new objects.WheelItem(itemName);
    }

    function startSpinning():void{
        stage.removeAllChildren();
        GenerateSlotItems(true);
        calculated = false;
        slotItems.forEach(row => {
            row.forEach(col => {
                col.StartSpinning();
            });
        });
        DrawMachine();
    }

    function Update():void{
        // Every frame
        stage.update();
        slotItems.forEach(row => {
            row.forEach(col => {
                col.Update();
            });
        });
        if(slotItems[0][slotItems[0].length-1].y > 170){
            slotItems.forEach(row => {
                row.forEach(col => {
                    col.StopSpinning();
                    if (!calculated){
                        CalculateWinnings();
                        calculated = true;
                    }
                    
                });
            });
        }
    }

    function GenerateSlotItems(reload:boolean=false):void{
        if (!reload){
            slotItems = [[], [], [], [], []];
        }
        for (let i = 0; i < slotItems.length; i++) {
            for (let j = SPINNER_ROWS; j > 0; j--) {
                let wheel: objects.WheelItem;

                if (reload){
                    wheel = slotItems[i][j - 1];
                    wheel.ChangeItem(GetImage().imageName)
                } else {
                    wheel = GetImage();
                }

                wheel.SetPosition( SLOT_START_X[i], SLOT_START_Y - (j * SLOT_Y_OFFSET));
                if (!reload){
                    slotItems[i].push(wheel);
                }
                stage.setChildIndex(wheel, 100);
            }
        }

        slotItems.forEach(row => {
            row.forEach(col => {
                stage.addChild(col);
            });
        });
    }
    function CalculateWinnings():number{
        let multiplier:number = 1;

        var nameToMultiplier: {[key: string]: number} = {
            python: 16,
            java: 8,
            typescript: 4,
            html: 2,
            cplusplus: 1,
            csharp: 0.5,
            swift: 0.25,
            ruby: 0.125
        }

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 5; col++) {
                // it does not think "itemName" is an attribute for some reason...
                multiplier *= nameToMultiplier[slotItems[col][row].GetName()];
                console.log(multiplier);
            }      
        }
        return multiplier;
    }

    function DrawMachine(): void{


        stage.addChild(new objects.Rectangle(0, 0, 700, 100, "black"));
        stage.addChild(new objects.Rectangle(0, 500, 700, 200, "black"));
        stage.addChild(new objects.Rectangle(0, 0, 75, 700, "black"));
        stage.addChild(new objects.Rectangle(625, 0, 75, 700, "black"));

        stage.addChild(new objects.Image("./Assets/images/machineParts/title.png", 13, 10));
        stage.addChild(new objects.Image("./Assets/images/machineParts/slots.png", 350, 300, true));
    
        playButton = new objects.Button("./Assets/images/buttons/play.png", 10, 500, false, startSpinning);
        stage.addChild(playButton);
    }

    function Main():void{
        GenerateSlotItems();
        DrawMachine();
    }

    window.addEventListener("load", Start);

})();