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
    var Image = /** @class */ (function (_super) {
        __extends(Image, _super);
        // constructor
        function Image(imagePath, x, y, isCentered) {
            if (imagePath === void 0) { imagePath = './Assets/images/button.png'; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = false; }
            var _this = _super.call(this, imagePath, x, y, isCentered) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Image.prototype._checkBounds = function () {
        };
        /**
         * This function is used for initialization
         *
         * @memberof Button
         */
        Image.prototype.Start = function () {
        };
        Image.prototype.Update = function () {
        };
        Image.prototype.Reset = function () {
        };
        return Image;
    }(objects.GameObject));
    objects.Image = Image;
})(objects || (objects = {}));
//# sourceMappingURL=Image.js.map