module objects{
    export class SpinningLabel extends objects.Label{
        private onFinishedRotating:CallableFunction;

        
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
        constructor(labelString:string, fontSize:string, fontFamily:string, fontColor:string, x:number, y:number, onFinishedRotating:() => void){
            super(labelString, fontSize, fontFamily, fontColor, x, y, true);
            this.onFinishedRotating = onFinishedRotating;
        }

        public Update():void{
            // rotate the image until it has been rotated by 1140 degress (7 degrees 60x/s -> 420 degrees/s)
            this.rotation += 7;
            if (this.rotation > 1140){
                // on completion, run the callback
                this.onFinishedRotating();
            }
        }

    }
}