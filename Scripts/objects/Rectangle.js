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
    var Rectangle = /** @class */ (function (_super) {
        __extends(Rectangle, _super);
        function Rectangle(x, y, w, h, color) {
            var _this = _super.call(this) || this;
            _this.graphics.beginFill(color);
            _this.graphics.drawRect(x, y, w, h);
            _this.graphics.endFill();
            return _this;
        }
        return Rectangle;
    }(createjs.Shape));
    objects.Rectangle = Rectangle;
})(objects || (objects = {}));
//# sourceMappingURL=Rectangle.js.map