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
        /**
         *Creates an instance of WheelItem.
         * @param {string} name - the name of the wheel item
         * @memberof WheelItem
         */
        function WheelItem(name) {
            var _this = 
            // generate the path to the image file based on the name
            _super.call(this, "./Assets/images/machineParts/icons/" + name + ".png", 0, 0, true) || this;
            _this.velocity = 4;
            _this.itemName = name;
            _this.spinning = false;
            _this.Start();
            return _this;
        }
        WheelItem.prototype.GetName = function () {
            // return the name of this object
            return this.itemName;
        };
        // change the item
        WheelItem.prototype.ChangeItem = function (item) {
            // set this image
            this.SetImage(item);
            // re-center the image
            this.width = this.image.width;
            this.height = this.image.height;
            this.RecenterImage();
            // change the path of the image to the name of the image
            // the name is the basename of the path minus the file extension
            item = item.substring(item.lastIndexOf("/") + 1);
            this.itemName = item.substring(0, item.indexOf("."));
        };
        WheelItem.prototype.SetPosition = function (x, y) {
            // sets this item's position
            this.x = x;
            this.y = y;
        };
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
            // if the object is allowed to spin, and move this object by its velocity
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