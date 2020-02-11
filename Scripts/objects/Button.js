"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var objects;
(function (objects) {
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        // constructor
        function Button(imagePath, x, y, isCentered, action) {
            if (imagePath === void 0) { imagePath = './Assets/images/button.png'; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = false; }
            var _this = _super.call(this, imagePath, x, y, isCentered) || this;
            _this.on("mouseover", _this.MouseOver);
            _this.on("mouseout", _this.MouseOut);
            _this.on("click", action);
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Button.prototype._checkBounds = function () {
        };
        Button.prototype.MouseClick = function () {
        };
        // PUBLIC METHODS
        Button.prototype.MouseOver = function () {
            this.alpha = 0.7;
        };
        Button.prototype.MouseOut = function () {
            this.alpha = 1.0;
        };
        /**
         * This function is used for initialization
         *
         * @memberof Button
         */
        Button.prototype.Start = function () {
        };
        Button.prototype.Update = function () {
        };
        Button.prototype.Reset = function () {
        };
        return Button;
    }(objects.GameObject));
    objects.Button = Button;
})(objects || (objects = {}));
//# sourceMappingURL=Button.js.map