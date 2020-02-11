module objects{
    export class Label extends createjs.Text{

        public centered:boolean;

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
        constructor(labelString:string, fontSize:string, fontFamily:string, fontColor:string, x:number, y:number, isCentered:boolean){
            super(labelString, fontSize + " " + fontFamily, fontColor);

            if(isCentered){
                this.regX = this.getBounds().width * 0.5;
                this.regY = this.getMeasuredLineHeight() * 0.5;
            }
            this.centered = isCentered;
            this.x = x
            this.y = y
        }

        /**
         * Changes the label's text to the specified value, and re-calculates 
         * the center position of the label if it is centered (see constructor)
         * @param {string} newText The new text to change the label to
         * @memberof Label
         */
        public setText(newText:string)
        {
            this.text = newText;
            if(this.centered){
                this.regX = this.getBounds().width * 0.5;
                this.regY = this.getMeasuredLineHeight() * 0.5;
            }
        }
    }
}