module objects{
    export class Rectangle extends createjs.Shape{
        /**
         *Creates an instance of the solid colored Rectangle
         * @param {number} x - the x position of the rectangle
         * @param {number} y - the y position of the rectangle
         * @param {number} w - the width of the rectangle
         * @param {number} h - the height of the rectangle
         * @param {string} color - the color of the rectangle
         * @memberof Rectangle
         */
        constructor(x:number, y:number, w:number, h:number, color:string){
            super();
            this.graphics.beginFill(color);
            this.graphics.drawRect(x, y, w, h);
            this.graphics.endFill();
        }
    }
}