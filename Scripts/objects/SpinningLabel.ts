module objects{
    export class SpinningLabel extends objects.Label{
        private onFinishedRotating:CallableFunction;

        constructor(labelString:string, fontSize:string, fontFamily:string, fontColor:string, x:number, y:number, onFinishedRotating:() => void){
            super(labelString, fontSize, fontFamily, fontColor, x, y, true);
            this.onFinishedRotating = onFinishedRotating;
        }

        public Update():void{
            this.rotation += 7;
            if (this.rotation > 1140){
                this.onFinishedRotating();
            }
        }

    }
}