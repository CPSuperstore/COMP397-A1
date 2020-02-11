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
    var Label = /** @class */ (function (_super) {
        __extends(Label, _super);
        /**
         * Creates an instance of Label.
         * @param {string} labelString The text to insert into the label
         * @param {string} fontSize The size of the font to use. You must include the units here. Examples: 20px, 20pt, 20%
         * @param {string} fontFamily The font family to render the font in. Examples: Consolas, Arial
         * @param {string} fontColor The color to render the text in as a HEX code. Examples: #FF00FF, #0A21F3
         * @param {number} x The x position to draw the text at
         * @param {number} y The y position to draw the text at
         * @param {boolean} isCentered If the pivot point of the text should be based arround the object's center
         * @memberof Label
         */
        function Label(labelString, fontSize, fontFamily, fontColor, x, y, isCentered) {
            var _this = _super.call(this, labelString, fontSize + " " + fontFamily, fontColor) || this;
            if (isCentered) {
                _this.regX = _this.getBounds().width * 0.5;
                _this.regY = _this.getMeasuredLineHeight() * 0.5;
            }
            _this.centered = isCentered;
            _this.x = x;
            _this.y = y;
            return _this;
        }
        /**
         * Changes the label's text to the specified value, and re-calculates
         * the center position of the label if it is centered (see constructor)
         * @param {string} newText The new text to change the label to
         * @memberof Label
         */
        Label.prototype.setText = function (newText) {
            this.text = newText;
            if (this.centered) {
                this.regX = this.getBounds().width * 0.5;
                this.regY = this.getMeasuredLineHeight() * 0.5;
            }
        };
        return Label;
    }(createjs.Text));
    objects.Label = Label;
})(objects || (objects = {}));
//# sourceMappingURL=Label.js.map