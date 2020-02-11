module objects{
    export class WheelItem extends GameObject{
        private spinning:boolean;
        private velocity:number = 4;
        private itemName:string

        // constructor
        constructor(name:string){
            super("./Assets/images/machineParts/icons/" + name + ".png", 0, 0, true);
            this.itemName = name;
            this.Start();
            this.spinning = false;
        }

        public GetName():string{
            return this.itemName
        }

        public ChangeItem(item:string){
            this.SetImage(item);

            this.width = this.image.width;
            this.height = this.image.height;
            this.RecenterImage();
            
            item = item.substring(item.lastIndexOf("/") + 1);
            this.itemName = item.substring(0, item.indexOf("."));
        }

        public SetPosition(x:number, y:number){
            this.x = x;
            this.y = y;
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