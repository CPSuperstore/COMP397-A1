"use strict";
//IIFE -- Immediatly Invoked Function Expression
// Annonomys self executing function
// run lite-server to run
var game = (function () {
    var canvas = document.getElementsByTagName("canvas")[0];
    var stage;
    var playButton;
    var slotItems;
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
    function startSpinning() {
        slotItems.forEach(function (row) {
            row.forEach(function (col) {
                col.StartSpinning();
            });
        });
    }
    function Update() {
        // Every frame
        stage.update();
        slotItems.forEach(function (row) {
            row.forEach(function (col) {
                col.Update();
            });
        });
        if (slotItems[slotItems.length - 1][0].y > 170) {
            slotItems.forEach(function (row) {
                row.forEach(function (col) {
                    col.StopSpinning();
                });
            });
        }
    }
    function GenerateSlotItems() {
        slotItems = [[], [], [], [], []];
        for (var i = 0; i < slotItems.length; i++) {
            for (var j = SPINNER_ROWS; j > 0; j--) {
                slotItems[i].push(new objects.WheelItem("./Assets/images/machineParts/icons/python.png", SLOT_START_X[i], SLOT_START_Y - (j * SLOT_Y_OFFSET), true));
            }
        }
        slotItems.forEach(function (row) {
            row.forEach(function (col) {
                stage.addChild(col);
            });
        });
    }
    function Main() {
        GenerateSlotItems();
        stage.addChild(new objects.Image("./Assets/images/machineParts/title.png", 13, 10));
        stage.addChild(new objects.Image("./Assets/images/machineParts/slots.png", 350, 300, true));
        playButton = new objects.Button("./Assets/images/buttons/play.png", 100, 100, false, startSpinning);
        stage.addChild(playButton);
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=game.js.map