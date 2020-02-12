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
    var SpinningLabel = /** @class */ (function (_super) {
        __extends(SpinningLabel, _super);
        function SpinningLabel(labelString, fontSize, fontFamily, fontColor, x, y, onFinishedRotating) {
            var _this = _super.call(this, labelString, fontSize, fontFamily, fontColor, x, y, true) || this;
            _this.onFinishedRotating = onFinishedRotating;
            return _this;
        }
        SpinningLabel.prototype.Update = function () {
            this.rotation += 7;
            if (this.rotation > 1140) {
                this.onFinishedRotating();
            }
        };
        return SpinningLabel;
    }(objects.Label));
    objects.SpinningLabel = SpinningLabel;
})(objects || (objects = {}));
//# sourceMappingURL=SpinningLabel.js.map