module objects{
    export class WheelItem extends GameObject{
        private spinning:boolean;
        private velocity:number = 4;

        // constructor
        constructor(imagePath:string, x:number = 0, y:number= 0, isCentered:boolean = false){
            super(imagePath, x, y, isCentered);
            this.Start();
            this.spinning = false;
        }
        
        // PRIVATE METHODS
        protected _checkBounds():void {
            
        }

        public StartSpinning(): void{
            this.spinning = true;
        }
        public StopSpinning(): void{
            this.spinning = false;
        }
        /**
         * This function is used for initialization
         *
         * @memberof Button
         */
        public Start(): void {
            
        }

        public Update(): void {
            if(this.spinning){
                this.y += this.velocity;
            }
            
        }

        public Reset(): void {
            
        }
    }
}