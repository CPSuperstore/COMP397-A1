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
    var WheelItem = /** @class */ (function (_super) {
        __extends(WheelItem, _super);
        // constructor
        function WheelItem(imagePath, x, y, isCentered) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = false; }
            var _this = _super.call(this, imagePath, x, y, isCentered) || this;
            _this.velocity = 4;
            _this.Start();
            _this.spinning = false;
            return _this;
        }
        // PRIVATE METHODS
        WheelItem.prototype._checkBounds = function () {
        };
        WheelItem.prototype.StartSpinning = function () {
            this.spinning = true;
        };
        WheelItem.prototype.StopSpinning = function () {
            this.spinning = false;
        };
        /**
         * This function is used for initialization
         *
         * @memberof Button
         */
        WheelItem.prototype.Start = function () {
        };
        WheelItem.prototype.Update = function () {
            if (this.spinning) {
                this.y += this.velocity;
            }
        };
        WheelItem.prototype.Reset = function () {
        };
        return WheelItem;
    }(objects.GameObject));
    objects.WheelItem = WheelItem;
})(objects || (objects = {}));
//# sourceMappingURL=WheelItem.js.map