module objects{
    export class Rectangle extends createjs.Shape{
        constructor(x:number, y:number, w:number, h:number, color:string){
            super();
            this.graphics.beginFill(color);
            this.graphics.drawRect(x, y, w, h);
            this.graphics.endFill();
        }
    }
}