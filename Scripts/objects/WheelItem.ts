module objects{
    export class WheelItem extends GameObject{
        private spinning:boolean;
        private velocity:number = 4;
        private itemName:string

        /**
         *Creates an instance of WheelItem.
         * @param {string} name - the name of the wheel item
         * @memberof WheelItem
         */
        constructor(name:string){
            // generate the path to the image file based on the name
            super("./Assets/images/machineParts/icons/" + name + ".png", 0, 0, true);
            this.itemName = name;
            this.spinning = false;
            this.Start();
        }

        public GetName():string{
            // return the name of this object
            return this.itemName
        }

        // change the item
        public ChangeItem(item:string){

            // set this image
            this.SetImage(item);

            // re-center the image
            this.width = this.image.width;
            this.height = this.image.height;
            this.RecenterImage();
            
            // change the path of the image to the name of the image
            // the name is the basename of the path minus the file extension
            item = item.substring(item.lastIndexOf("/") + 1);
            this.itemName = item.substring(0, item.indexOf("."));
        }

        public SetPosition(x:number, y:number){
            // sets this item's position
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
            // if the object is allowed to spin, and move this object by its velocity
            if(this.spinning){
                this.y += this.velocity;
            }
            
        }

        public Reset(): void {
            
        }
    }
}