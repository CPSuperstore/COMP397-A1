"use strict";
var objects;
(function (objects) {
    var Vector2 = /** @class */ (function () {
        // CONSTRUCTOR
        function Vector2(x, y, displayObject) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            // Initialize member variables
            this._x = 0;
            this._y = 0;
            this._magnitude = 0;
            this._sqrMagnitude = 0;
            if (displayObject != undefined) {
                this._displayObject = displayObject;
            }
            // set x and y
            this.x = x;
            this.y = y;
        }
        Object.defineProperty(Vector2.prototype, "x", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._x;
            },
            set: function (newX) {
                this._x = newX;
                this.sqrMagnitude = this._computeSqrMagnitude();
                this.magnitude = this._computeMagnitude();
                if (this._displayObject != undefined) {
                    this._displayObject.x = this._x;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector2.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (newY) {
                this._y = newY;
                this.sqrMagnitude = this._computeSqrMagnitude();
                this.magnitude = this._computeMagnitude();
                if (this._displayObject != undefined) {
                    this._displayObject.y = this._y;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector2.prototype, "magnitude", {
            get: function () {
                return this._magnitude;
            },
            set: function (newMagnitude) {
                this._magnitude = newMagnitude;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector2.prototype, "sqrMagnitude", {
            get: function () {
                return this._sqrMagnitude;
            },
            set: function (newSqrMagnitude) {
                this._sqrMagnitude = newSqrMagnitude;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        Vector2.prototype._computeSqrMagnitude = function () {
            return (this._x * this._x) + (this._y * this._y);
        };
        Vector2.prototype._computeMagnitude = function () {
            return Math.sqrt(this._computeSqrMagnitude());
        };
        // PUBLIC METHODS
        Vector2.prototype.add = function (rhs) {
            this.x += rhs.x;
            this.y += rhs.y;
        };
        Vector2.prototype.subtract = function (rhs) {
            this.x -= rhs.x;
            this.y -= rhs.y;
        };
        Vector2.prototype.scale = function (scalar) {
            this.x *= scalar;
            this.y *= scalar;
        };
        Vector2.prototype.toString = function () {
            return "(" + this.x + ", " + this.y + ")";
        };
        /**
         * This method sets the current vector to a magnitude of 1 (the unit vector)
         *
         * @memberof Vector2
         */
        Vector2.prototype.normalize = function () {
            var tempX = this.x / this.magnitude;
            var tempY = this.y / this.magnitude;
            this.x = tempX;
            this.y = tempY;
        };
        /**
         * Computes the current vector's direction without changing it
         *
         * @returns {Vector2}
         * @memberof Vector2
         */
        Vector2.prototype.normalized = function () {
            var vector = new Vector2(this.x, this.y);
            vector.normalize();
            return vector;
        };
        // PUBLIC STATIC METHODS
        Vector2.zero = function () {
            return new Vector2(0, 0);
        };
        Vector2.one = function () {
            return new Vector2(1, 1);
        };
        Vector2.up = function () {
            return new Vector2(0, -1);
        };
        Vector2.down = function () {
            return new Vector2(0, 1);
        };
        Vector2.left = function () {
            return new Vector2(-1, 0);
        };
        Vector2.right = function () {
            return new Vector2(1, 0);
        };
        Vector2.dot = function (lhs, rhs) {
            return (lhs.x * rhs.x) + (lhs.y * rhs.y);
        };
        Vector2.distance = function (P1, P2) {
            var diffXs = P2.x - P1.x;
            var diffYs = P2.y - P1.y;
            return Math.sqrt((diffXs * diffXs) + (diffYs * diffYs));
        };
        Vector2.sqrDistance = function (P1, P2) {
            var diffXs = P2.x - P1.x;
            var diffYs = P2.y - P1.y;
            return (diffXs * diffXs) + (diffYs * diffYs);
        };
        return Vector2;
    }());
    objects.Vector2 = Vector2;
})(objects || (objects = {}));
//# sourceMappingURL=Vector2.js.map