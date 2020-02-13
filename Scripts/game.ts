//IIFE -- Immediatly Invoked Function Expression
// Annonomys self executing function
// run lite-server to run
let game = (function(){
    let canvas:HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
    let stage:createjs.Stage;

    // create variable for the 2-dimensional array (matrix) of "WheelItem" to store the 10 items per slot
    // Array Structure:
    // [
    //  ┌1,┐  ┌1,┐  ┌1,┐  ┌1,┐  ┌1,┐
    //  |2,|  |2,|  |2,|  |2,|  |2,|
    //  |3,|  |3,|  |3,|  |3,|  |3,|
    //  |4,|  |4,|  |4,|  |4,|  |4,|
    //  |5,|, |5,|, |5,|, |5,|, |5,|
    //  |6,|  |6,|  |6,|  |6,|  |6,|
    //  |7,|  |7,|  |7,|  |7,|  |7,|
    //  |8,|  |8,|  |8,|  |8,|  |8,|
    //  |9,|  |9,|  |9,|  |9,|  |9,|
    //  └10┘  └10┘  └10┘  └10┘  └10┘
    // ]
    // The number indicates the image row. 8-10 are the initial images, and 1-3 are the final images
    let slotItems:objects.WheelItem[][];

    let multiplierLineOne:objects.Label;
    let multiplierLineTwo:objects.Label;
    let multiplierLineThree:objects.Label;
    let multiplierTotal:objects.Label;
    let jackpotTotal:objects.Label;
    let jackpotMessage:objects.SpinningLabel;
    
    let calculated:boolean = true;
    let cheatMode:boolean = false;

    let betAmount:number = -1;
    let betAmountLabel:objects.Label;

    let wallet:number = -1;
    let walletLabel: objects.Label; 

    let cheatModeCheckBox:HTMLInputElement;

    // declare constants
    const SLOT_START_X:number[] = [135, 245, 350, 460, 570];
    const SLOT_START_Y:number = 560;
    const SLOT_Y_OFFSET = 130;
    const SPINNER_ROWS = 10;
    const NAME_TO_MULTIPLIER: {[key: string]: number} = {
        python:         2,
        java:           1.75,
        typescript:     1.5,
        html:           1.25,
        cplusplus:      1,
        csharp:         0.75,
        swift:          0.5,
        ruby:           0.25
    }
    const JACKPOT_VALUE = NAME_TO_MULTIPLIER.python ** 15;

    function ResetGame(reloadText:boolean=true, walletAmount:number=1000, bet:number=0):void{
        // resets the user's wallet and bet amount
        if (reloadText){
            // if text should be reloaded, set bet and wallet amounts to 0
            ChangeBetAmount(-betAmount, false);
            ChangeWallet(-wallet);
            
            // set them th their initial values
            ChangeWallet(walletAmount);
            ChangeBetAmount(bet, false);
        } else {
            // if they are not to be reloaded, simply set the variables
            betAmount = bet;
            wallet = walletAmount;
        }
    }

    function Start():void{
        // run when the application starts

        // select the canvas and set the refresh rate to 60
        // on each tick, run the "Update" method
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60;     // Declare the framerate at 60fps
        createjs.Ticker.on("tick", Update);

        // reset the game without reloading text
        ResetGame(false);

        // enter the main function
        Main();
    }

    function checkRange(value:number, lowerBounds:number, upperBounds:number):boolean {
        // returns if the input value is between the two other values
        return value >= lowerBounds && value <= upperBounds;
    }

    function GetImage():objects.WheelItem{
        // Returns a random wheel item

        // ramdomly generate the seed
        let reelSeed:number = Math.floor((Math.random() * 65) + 1);
        
        if (cheatMode){
            // if cheet mode is enabled, set this to 65 to get a Python logo
            reelSeed = 65;
        }

        // set the default name
        let itemName:string = "ruby";

        switch (true) {
            case checkRange(reelSeed, 1, 27):  // 41.5% probability of ruby
                itemName = "ruby";
                break;
            case checkRange(reelSeed, 28, 37): // 15.4% probability of swift
                itemName = "swift";
                break;
            case checkRange(reelSeed, 38, 46): // 13.8% probability of csharp
                itemName = "csharp";
                break;
            case checkRange(reelSeed, 47, 54): // 12.3% probability of cplusplus
                itemName = "cplusplus";
                break;
            case checkRange(reelSeed, 55, 59): //  7.7% probability of html
                itemName = "html";
                break;
            case checkRange(reelSeed, 60, 62): //  4.6% probability of typescript
                itemName = "typescript";
                break;
            case checkRange(reelSeed, 63, 64): //  3.1% probability of java
                itemName = "java";
                break;
            case checkRange(reelSeed, 65, 65): //  1.5% probability of python
                itemName = "python";
                break;
        }

        // create and return the wheel item
        return new objects.WheelItem(itemName);
    }

    function startSpinning():void{
        // generates the wheel array, and starts each item's spin process

        // clear the stage
        stage.removeAllChildren();

        // generate the slot item matrix
        GenerateSlotItems(true);

        calculated = false;
        
        // force each slot item to spin
        slotItems.forEach(row => {
            row.forEach(col => {
                col.StartSpinning();
            });
        });

        // re-draw the slot machine
        DrawMachine();
    }

    function Update():void{
        // Every frame

        // update the stage
        stage.update();

        // update each slot item
        slotItems.forEach(row => {
            row.forEach(col => {
                col.Update();
            });
        });

        // check if the top (last) item in the highest row of the slot machine has passed the 
        // threashold which each slot item should stop cycling
        if(slotItems[0][slotItems[0].length-1].y > 170){

            // iterate over each slot item
            slotItems.forEach(row => {
                row.forEach(col => {

                    // stop the slot item from cycling
                    col.StopSpinning();

                    // check if the total multiplier has been calculated
                    if (!calculated){

                        // if not, calculate the multiplier
                        let multiplier:number = CalculateWinnings();

                        // reward the player with the bet amount x multiplier
                        ChangeWallet(betAmount * multiplier);

                        // reset the bet amount
                        ChangeBetAmount(-betAmount, false);

                        // prevent the system from calculating the multiplier a seccond time
                        calculated = true;
                    }
                    
                });
            });
        }
        if (jackpotMessage != undefined){
            // if the jackpot message does exist, update it
            jackpotMessage.Update();
        }
    }

    function GenerateSlotItems(reload:boolean=false):void{
        // this function generates the slot items and places them in their proper starting positions

        if (!reload){
            // if reload is disabled, clear the matrix of slot items
            slotItems = [[], [], [], [], []];
        }

        // iterate over each row in the slot item matrix
        for (let i = 0; i < slotItems.length; i++) {
            for (let j = SPINNER_ROWS; j > 0; j--) {
                // generate a new wheel for each "SPINNER_ROWS" (10) rows in the slot column
                let wheel: objects.WheelItem;

                if (reload){
                    // if this is reload mode, change the image for each slot item
                    wheel = slotItems[i][j - 1];
                    wheel.ChangeItem(GetImage().imageName)
                } else {
                    // if this is generate mode (reload=false), get a new image
                    wheel = GetImage();
                }

                // position the wheel to the correct location
                wheel.SetPosition( SLOT_START_X[i], SLOT_START_Y - (j * SLOT_Y_OFFSET));

                // add the item to the grand matrix if in generate mode
                if (!reload){
                    slotItems[i].push(wheel);
                }

                // set the zindex of the item (this seems to have no effect...)
                stage.setChildIndex(wheel, 100);
            }
        }

        // add each slot item to the stage
        slotItems.forEach(row => {
            row.forEach(col => {
                stage.addChild(col);
            });
        });
    }

    function CalculateWinnings():number{
        // This function calculates the winnings the user will earn

        // the winnings are calculated as follows:
        // get teh multipliers per items in a row, and multiply those toghether. (row-level multiplier)
        // multiply the multipliers from each row together to get the grand multiplier, and return that (total multiplier)
        let multiplier:number;
        let totalMultiplier:number = 1;
        let jackpotCount:number = 0;
        let slotName:string;

        for (let row = 0; row < 3; row++) {
            // stores the row-level multiplier
            multiplier = 1;

            for (let col = 0; col < 5; col++) {
                // get the name of each item in a row
                slotName = slotItems[col][slotItems[col].length - row - 1].GetName();

                // get the multiplier based on the NAME_TO_MULTIPLIER JSON object
                multiplier *= NAME_TO_MULTIPLIER[slotName];

                if (slotName == "python"){
                    // if the item is the Python logo, add 1 to the jackpot counter
                    jackpotCount++;
                }
            }   
            
            // set the text to the respective row-level multiplier label
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

            // multiply to the grand total multiplier
            totalMultiplier *= multiplier;

        }
        if (jackpotCount == 15){
            // if 15 Python logos are present, show the "Jackpot" message
            ShowJackpot()
        }

        // set the total multiplier text, round to 2 digits, and return the value
        multiplierTotal.setText("Total: x" + Round(totalMultiplier));
        return Round(totalMultiplier);
    }

    function ShowJackpot():void{
        // this function starts the red "Jackpot" text which rotataes in front of the screen with the SpinningLabel object
        jackpotMessage = new objects.SpinningLabel("JACKPOT!!!!!", "40px", "Consolas", "red", 350, 350, function () {
            // on completion, remove from the stage
            stage.removeChild(jackpotMessage);
        });

        // add it to the stage
        stage.addChild(jackpotMessage);
    }

    function Round(input:number):number{
        // rounds the input to 2 decimal places
        return Math.round(input * 100) / 100;
    }

    function QuitGame(): void{
        // this function shows the quit (cash out) screen, which includes the "reset" button

        // clear the screen
        stage.removeAllChildren();

        // fill the screen in black
        stage.addChild(new objects.Rectangle(0, 0, 700, 700, "black"));

        // display the final payout (the value in the user's wallet)
        stage.addChild(new objects.Label("Your Final Payout:", "35px", "Consolas", "green", 10, 10, false));
        stage.addChild(new objects.Label("$" + wallet, "35px", "Consolas", "green", 10, 50, false));

        // show the reset button
        stage.addChild(new objects.Button("./Assets/images/buttons/reset.png", 10, 100, false, function(){
            // when clicked, clear the screen, reset the game, and call the Main function to completly restart everything
            stage.removeAllChildren();
            ResetGame(false);
            Main();
        }));

    }

    function DrawMachine(): void{
        // this is re-drawn to allow the slot images to be ordered underneeth the machine

        // draw 4 solid black rectabgles to surround the slot image
        stage.addChild(new objects.Rectangle(0, 0, 700, 100, "black"));
        stage.addChild(new objects.Rectangle(0, 500, 700, 200, "black"));
        stage.addChild(new objects.Rectangle(0, 0, 75, 700, "black"));
        stage.addChild(new objects.Rectangle(625, 0, 75, 700, "black"));

        // draw the slot name and slots section
        stage.addChild(new objects.Image("./Assets/images/machineParts/title.png", 13, 10));
        stage.addChild(new objects.Image("./Assets/images/machineParts/slots.png", 350, 300, true));
    
        // add the play button
        stage.addChild( new objects.Button("./Assets/images/buttons/play.png", 10, 500, false, startSpinning));

        // add the +1, +10, +100, and "all in" bet buttons
        stage.addChild( new objects.Button("./Assets/images/buttons/plus1.png", 144, 500, false, function(){
            ChangeBetAmount(1);
        }));
        stage.addChild( new objects.Button("./Assets/images/buttons/plus10.png", 278, 500, false, function(){
            ChangeBetAmount(10);
        }));
        stage.addChild( new objects.Button("./Assets/images/buttons/plus100.png", 412, 500, false, function(){
            ChangeBetAmount(100);
        }));
        stage.addChild( new objects.Button("./Assets/images/buttons/allIn.png", 546, 500, false, function(){
            ChangeBetAmount(wallet);
        }));

        // add the reset and quit buttons
        stage.addChild( new objects.Button("./Assets/images/buttons/reset.png", 10, 635, false, ResetGame));
        stage.addChild( new objects.Button("./Assets/images/buttons/quit.png", 144, 635, false, QuitGame));

        // create the row-multipler text boxes for line 1-3
        multiplierLineOne = new objects.Label("x?", "20px", "Consolas", "green", 625, 170, false);
        stage.addChild(multiplierLineOne);

        multiplierLineTwo = new objects.Label("x?", "20px", "Consolas", "green", 625, 295, false);
        stage.addChild(multiplierLineTwo);

        multiplierLineThree = new objects.Label("x?", "20px", "Consolas", "green", 625, 425, false);
        stage.addChild(multiplierLineThree);

        // create the total multipler label
        multiplierTotal = new objects.Label("Total: x?", "25px", "Consolas", "green", 278, 568, false);
        stage.addChild(multiplierTotal);

        // create the labels for the bet amount, user's wallet, and calculated jackpot value
        betAmountLabel = new objects.Label("Bet: $" + betAmount, "30px", "Consolas", "green", 10, 565, false);
        stage.addChild(betAmountLabel);

        walletLabel = new objects.Label("Wallet: $" + wallet, "30px", "Consolas", "green", 10, 600, false);
        stage.addChild(walletLabel);

        jackpotTotal = new objects.Label("Jackpot (x" + Round(JACKPOT_VALUE) + "): $0", "25px", "Consolas", "green", 278, 600, false)
        stage.addChild(jackpotTotal);
    }

    function Main():void{
        // generate the slots
        GenerateSlotItems();

        // draw the rest of the machine
        DrawMachine();

        // add the "click" event listener to the "cheat mode" text box to toggle "cheat mode"
        cheatModeCheckBox = <HTMLInputElement>document.body.querySelector("#cheatMode");
        cheatModeCheckBox.addEventListener("click", () => {
            cheatMode = cheatModeCheckBox.checked;
        });
    }

    function ChangeBetAmount(delta:number, updateWallet:boolean=true){
        // this function changes the amount the player is betting. This will handle the wallet changes, and ensure the player can not bet more money
        // than they have in their wallet

        // change the bet amount, and update the text
        betAmount += delta;
        betAmountLabel.setText("Bet: $" + Round(betAmount));

        // if the wallet value should be changed, apply the opposite operation on the user's wallet
        if (updateWallet){
            ChangeWallet(-delta);
        }

        // if the wallet balance is less than 0, use recursion (sort of) to bet what ever value is stored in the user's wallet
        if (wallet < 0){
            ChangeBetAmount(wallet);
        }

        // re-calculate the jackpot total based on the user's bet
        jackpotTotal.setText("Jackpot (x" + Round(JACKPOT_VALUE) + "): $" + Round(JACKPOT_VALUE * betAmount));
    }

    function ChangeWallet(delta:number){
        // this function changes the value in the user's wallet, as well as the label
        wallet += delta;
        walletLabel.setText("Wallet: $" + Round(wallet));
    }

    // when the window loads, run the Start sequence
    window.addEventListener("load", Start);

})();