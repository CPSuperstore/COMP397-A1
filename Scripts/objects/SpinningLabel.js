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
        /**
         * Creates an instance of Label.
         * @param {string} labelString The text to insert into the label
         * @param {string} fontSize The size of the font to use. You must include the units here. Examples: 20px, 20pt, 20%
         * @param {string} fontFamily The font family to render the font in. Examples: Consolas, Arial
         * @param {string} fontColor The color to render the text in as a HEX code. Examples: #FF00FF, #0A21F3
         * @param {number} x The x position to draw the text at
         * @param {number} y The y position to draw the text at
         * @param {() => void} onFinishedRotating - the callback function to run when the rotation is finished
         * @memberof Label
         */
        function SpinningLabel(labelString, fontSize, fontFamily, fontColor, x, y, onFinishedRotating) {
            var _this = _super.call(this, labelString, fontSize, fontFamily, fontColor, x, y, true) || this;
            _this.onFinishedRotating = onFinishedRotating;
            return _this;
        }
        SpinningLabel.prototype.Update = function () {
            // rotate the image until it has been rotated by 1140 degress (7 degrees 60x/s -> 420 degrees/s)
            this.rotation += 7;
            if (this.rotation > 1140) {
                // on completion, run the callback
                this.onFinishedRotating();
            }
        };
        return SpinningLabel;
    }(objects.Label));
    objects.SpinningLabel = SpinningLabel;
})(objects || (objects = {}));
//# sourceMappingURL=SpinningLabel.js.map