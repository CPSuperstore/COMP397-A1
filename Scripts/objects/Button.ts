module objects{
    export class Button extends GameObject{
        
        /**
         *Creates an instance of Button.
         * @param {string} imagePath - the path to the image file which will represent the button
         * @param {number} [x=0] - the x position of the button
         * @param {number} [y=0] - the y position of the button
         * @param {boolean} [isCentered=false] - if the button's x,y position should be placed at its center
         * @param {() => void} action - the callback function to run when the button is clicked
         * @memberof Button
         */
        constructor(imagePath:string, x:number = 0, y:number= 0, isCentered:boolean = false, action:() => void){
            super(imagePath, x, y, isCentered);

            // set the mouse events
            this.on("mouseover", this.MouseOver);
            this.on("mouseout", this.MouseOut);
            this.on("click", action);

            this.Start();
        }
        
        // PRIVATE METHODS
        protected _checkBounds():void {
            
        }

        MouseClick():void {
        }

        // PUBLIC METHODS
        MouseOver():void {
            this.alpha = 0.7;
        }

        MouseOut():void {
            this.alpha = 1.0;
        }

        /**
         * This function is used for initialization
         *
         * @memberof Button
         */
        public Start(): void {
            
        }

        public Update(): void {
            
        }

        public Reset(): void {
            
        }
    }
}