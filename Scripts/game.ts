//IIFE -- Immediatly Invoked Function Expression
// Annonomys self executing function
// run lite-server to run
let game = (function(){

    let canvas:HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
    let stage:createjs.Stage;
    let slotItems:objects.WheelItem[][];

    let multiplierLineOne:objects.Label;
    let multiplierLineTwo:objects.Label;
    let multiplierLineThree:objects.Label;
    let multiplierTotal:objects.Label;


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
    let calculated:boolean = true;
    let cheatMode:boolean = false;

    let betAmount:number = -1;
    let betAmountLabel:objects.Label;

    let wallet:number = -1;
    let walletLabel: objects.Label;

    const SLOT_START_X:number[] = [135, 245, 350, 460, 570];
    const SLOT_START_Y:number = 560;
    const SLOT_Y_OFFSET = 130;
    const SPINNER_ROWS = 10;

    function ResetGame(reloadText:boolean=true, walletAmount:number=1000, bet:number=0):void{
        if (reloadText){
            ChangeBetAmount(-betAmount, false);
            ChangeWallet(-wallet);

            ChangeWallet(walletAmount);
            ChangeBetAmount(bet, false);
        } else {
            betAmount = 0;
            wallet = walletAmount;
        }
    }

    function Start():void{
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60;     // Declare the framerate at 60fps
        createjs.Ticker.on("tick", Update);
        ResetGame(false);
        Main();
    }

    function checkRange(value:number, lowerBounds:number, upperBounds:number):boolean {
        return value >= lowerBounds && value <= upperBounds;
    }

    function GetImage():objects.WheelItem{
        let reelSeed:number = Math.floor((Math.random() * 65) + 1);
        if (cheatMode){
            reelSeed = 65;
        }
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
                        let multiplier:number = CalculateWinnings();
                        ChangeWallet(betAmount * multiplier);
                        ChangeBetAmount(-betAmount, false);
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
        let multiplier:number;
        let totalMultiplier:number = 1;

        
        var nameToMultiplier: {[key: string]: number} = {
            python:         32,
            java:           16,
            typescript:     8,
            html:           4,
            cplusplus:      2,
            csharp:         1,
            swift:          0.5,
            ruby:           0.25
        }

        for (let row = 0; row < 3; row++) {
            multiplier = 1;

            for (let col = 0; col < 5; col++) {
                // it does not think "itemName" is an attribute for some reason...
                multiplier *= nameToMultiplier[
                    slotItems[col][slotItems[col].length - row - 1].GetName()
                ];
            }      
            switch (row){
                case 0:
                    multiplierLineOne.setText("x" + Round(multiplier));
                    break;
                case 1:
                    multiplierLineTwo.setText("x" + Round(multiplier));
                    break;
                case 2:
                    multiplierLineThree.setText("x" + Round(multiplier));
                    break;
            }
            totalMultiplier *= multiplier;

        }
        multiplierTotal.setText("Total: x" + Round(totalMultiplier));
        return Round(totalMultiplier);
    }

    function Round(input:number):number{
        return Math.round(input * 100) / 100;
    }

    function DrawMachine(): void{


        stage.addChild(new objects.Rectangle(0, 0, 700, 100, "black"));
        stage.addChild(new objects.Rectangle(0, 500, 700, 200, "black"));
        stage.addChild(new objects.Rectangle(0, 0, 75, 700, "black"));
        stage.addChild(new objects.Rectangle(625, 0, 75, 700, "black"));

        stage.addChild(new objects.Image("./Assets/images/machineParts/title.png", 13, 10));
        stage.addChild(new objects.Image("./Assets/images/machineParts/slots.png", 350, 300, true));
    
        stage.addChild( new objects.Button("./Assets/images/buttons/play.png", 10, 500, false, startSpinning));

        stage.addChild( new objects.Button("./Assets/images/buttons/plus1.png", 144, 500, false, function(){
            ChangeBetAmount(1);
        }));
        stage.addChild( new objects.Button("./Assets/images/buttons/plus10.png", 278, 500, false, function(){
            ChangeBetAmount(10);
        }));
        stage.addChild( new objects.Button("./Assets/images/buttons/plus100.png", 412, 500, false, function(){
            ChangeBetAmount(100);
        }));

        stage.addChild( new objects.Button("./Assets/images/buttons/reset.png", 10, 635, false, ResetGame));
        stage.addChild( new objects.Button("./Assets/images/buttons/quit.png", 144, 635, false, function(){
            ChangeBetAmount(100);
        }));

        multiplierLineOne = new objects.Label("x?", "20px", "Consolas", "green", 625, 170, false);
        stage.addChild(multiplierLineOne);

        multiplierLineTwo = new objects.Label("x?", "20px", "Consolas", "green", 625, 295, false);
        stage.addChild(multiplierLineTwo);

        multiplierLineThree = new objects.Label("x?", "20px", "Consolas", "green", 625, 425, false);
        stage.addChild(multiplierLineThree);

        multiplierTotal = new objects.Label("Total: x?", "25px", "Consolas", "green", 278, 568, false);
        stage.addChild(multiplierTotal);

        betAmountLabel = new objects.Label("Bet: $" + betAmount, "30px", "Consolas", "green", 10, 565, false);
        stage.addChild(betAmountLabel);

        walletLabel = new objects.Label("Wallet: $" + wallet, "30px", "Consolas", "green", 10, 600, false);
        stage.addChild(walletLabel);

    }

    function Main():void{
        GenerateSlotItems();
        DrawMachine();
    }

    function ChangeBetAmount(delta:number, updateWallet:boolean=true){
        betAmount += delta;
        betAmountLabel.setText("Bet: $" + Round(betAmount));
        if (updateWallet){
            ChangeWallet(-delta);
        }
        if (wallet < 0){
            ChangeBetAmount(wallet);
        }
    }

    function ChangeWallet(delta:number){
        wallet += delta;
        walletLabel.setText("Wallet: $" + Round(wallet));
    }

    window.addEventListener("load", Start);

})();