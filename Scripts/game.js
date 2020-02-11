"use strict";
//IIFE -- Immediatly Invoked Function Expression
// Annonomys self executing function
// run lite-server to run
var game = (function () {
    var canvas = document.getElementsByTagName("canvas")[0];
    var stage;
    var playButton;
    var slotItems;
    var multiplierLineOne;
    var multiplierLineTwo;
    var multiplierLineThree;
    var multiplierTotal;
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
    var calculated = true;
    var SLOT_START_X = [135, 245, 350, 460, 570];
    var SLOT_START_Y = 560;
    var SLOT_Y_OFFSET = 130;
    var SPINNER_ROWS = 10;
    function Start() {
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // Declare the framerate at 60fps
        createjs.Ticker.on("tick", Update);
        Main();
    }
    function checkRange(value, lowerBounds, upperBounds) {
        return value >= lowerBounds && value <= upperBounds;
    }
    function GetImage() {
        var reelSeed = Math.floor((Math.random() * 65) + 1);
        var itemName = "ruby";
        switch (true) {
            case checkRange(reelSeed, 1, 27): // 41.5% probability
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
    function startSpinning() {
        stage.removeAllChildren();
        GenerateSlotItems(true);
        calculated = false;
        slotItems.forEach(function (row) {
            row.forEach(function (col) {
                col.StartSpinning();
            });
        });
        DrawMachine();
    }
    function Update() {
        // Every frame
        stage.update();
        slotItems.forEach(function (row) {
            row.forEach(function (col) {
                col.Update();
            });
        });
        if (slotItems[0][slotItems[0].length - 1].y > 170) {
            slotItems.forEach(function (row) {
                row.forEach(function (col) {
                    col.StopSpinning();
                    if (!calculated) {
                        var multiplier = CalculateWinnings();
                        console.log(multiplier);
                        calculated = true;
                    }
                });
            });
        }
    }
    function GenerateSlotItems(reload) {
        if (reload === void 0) { reload = false; }
        if (!reload) {
            slotItems = [[], [], [], [], []];
        }
        for (var i = 0; i < slotItems.length; i++) {
            for (var j = SPINNER_ROWS; j > 0; j--) {
                var wheel = void 0;
                if (reload) {
                    wheel = slotItems[i][j - 1];
                    wheel.ChangeItem(GetImage().imageName);
                }
                else {
                    wheel = GetImage();
                }
                wheel.SetPosition(SLOT_START_X[i], SLOT_START_Y - (j * SLOT_Y_OFFSET));
                if (!reload) {
                    slotItems[i].push(wheel);
                }
                stage.setChildIndex(wheel, 100);
            }
        }
        slotItems.forEach(function (row) {
            row.forEach(function (col) {
                stage.addChild(col);
            });
        });
    }
    function CalculateWinnings() {
        var multiplier;
        var totalMultiplier = 1;
        var nameToMultiplier = {
            python: 32,
            java: 16,
            typescript: 8,
            html: 4,
            cplusplus: 2,
            csharp: 1,
            swift: 0.5,
            ruby: 0.25
        };
        for (var row = 0; row < 3; row++) {
            multiplier = 1;
            for (var col = 0; col < 5; col++) {
                // it does not think "itemName" is an attribute for some reason...
                multiplier *= nameToMultiplier[slotItems[col][row].GetName()];
            }
            switch (row) {
                case 0:
                    multiplierLineOne.setText("< " + Round(multiplier));
                    break;
                case 1:
                    multiplierLineTwo.setText("< " + Round(multiplier));
                    break;
                case 2:
                    multiplierLineThree.setText("< " + Round(multiplier));
                    break;
            }
            totalMultiplier *= multiplier;
        }
        multiplierTotal.setText("> " + Round(totalMultiplier));
        return Round(totalMultiplier);
    }
    function Round(input) {
        return Math.round(input * 100) / 100;
    }
    function DrawMachine() {
        stage.addChild(new objects.Rectangle(0, 0, 700, 100, "black"));
        stage.addChild(new objects.Rectangle(0, 500, 700, 200, "black"));
        stage.addChild(new objects.Rectangle(0, 0, 75, 700, "black"));
        stage.addChild(new objects.Rectangle(625, 0, 75, 700, "black"));
        stage.addChild(new objects.Image("./Assets/images/machineParts/title.png", 13, 10));
        stage.addChild(new objects.Image("./Assets/images/machineParts/slots.png", 350, 300, true));
        playButton = new objects.Button("./Assets/images/buttons/play.png", 10, 500, false, startSpinning);
        stage.addChild(playButton);
        multiplierLineOne = new objects.Label("< ", "20px", "Consolas", "green", 625, 170, false);
        stage.addChild(multiplierLineOne);
        multiplierLineTwo = new objects.Label("< ", "20px", "Consolas", "green", 625, 295, false);
        stage.addChild(multiplierLineTwo);
        multiplierLineThree = new objects.Label("< ", "20px", "Consolas", "green", 625, 425, false);
        stage.addChild(multiplierLineThree);
        multiplierTotal = new objects.Label("> ", "20px", "Consolas", "green", 625, 555, false);
        stage.addChild(multiplierTotal);
    }
    function Main() {
        GenerateSlotItems();
        DrawMachine();
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=game.js.map