class swapbutton{
    constructor(){
        this.x = 650,
        this.y = 500,
        this.w = 200,
        this.h = 50,

        this.text = "Change Party";
    }

    draw(){
        if(mouseX >= this.x && mouseX <= this.x + this.w && mouseY >= this.y && mouseY <= this.y + this.h){
            CharCV.fill("White");
        } else {
            CharCV.fill(23, 129, 210);
        }
        CharCV.rect(this.x, this.y, this.w, this.h);
        CharCV.fill(0, 46, 107);
        CharCV.rect(this.x+2, this.y+2, this.w-4, this.h-4);

        CharCV.fill(23, 129, 210);
        CharCV.textAlign(CENTER);
        CharCV.text(this.text, this.x + this.w/2, this.y + this.h/2 + 6);
    }

    isclicked(){
        if(mouseX >= this.x && mouseX <= this.x + this.w && mouseY >= this.y && mouseY <= this.y + this.h){
            if(charScreen == 1){
                charScreen = 2;
                this.text = "Change Equipment";
            } else {
                charScreen = 1;
                this.text = "Change Party";
            }
            CharacterScreenInfo.CharSlot = null;
            CharacterScreenInfo.CharEquip = null;
            CharacterScreenInfo.InvEquip = null;
            CharacterScreenInfo.SwapCharacter = null;
            characterswapObj.killtextboxfunc();
            characterswapObj.resetstate();

        }
    }
}