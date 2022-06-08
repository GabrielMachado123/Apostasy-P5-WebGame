class equipment{
    constructor(){
        this.x = 20,
        this.y = 20,
        this.w = 300,
        this.h = 500,
        this.update = false,
        this.items = [],
        this.scrollnum = 0

    }

    draw(){

        if(this.update == false){
            this.update = true;
            loadJSON('/getEquipment/'+playerId,(dataReceived)=>{
                this.items = [];
                for(let i = 0; i<dataReceived.length; i++){
                    this.items[i] = {
                        "id": dataReceived[i].itemId,
                        "name": dataReceived[i].item_name,
                        "description": dataReceived[i].item_description,
                        "quantity": dataReceived[i].quantity,
                        "damage": dataReceived[i].item_damage,
                        "health": dataReceived[i].item_health,
                    }
                }
            });
        }

        scroll(this.x+this.w, this.y, this.h/10, this.h/2, "up");
        scroll(this.x+this.w, this.y+this.h/2, this.h/10, this.h/2, "down");
        for(let i = 0; i< 10; i++){
            if(this.items[i+this.scrollnum]){
                playerEquipment(this.x, this.y + i * this.h/10, this.w, this.h/10, this.items[i+this.scrollnum]);
            } else {
                playerEquipment(this.x, this.y + i * this.h/10, this.w, this.h/10, null);
            }
        }



        
    }
    isclicked(){
        for(let i = 0; i < 10; i++){
            if(mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y + i * this.h/10 && mouseY < this.y + i * this.h/10 + this.h/10 && this.items[i+this.scrollnum]){
                CharacterScreenInfo.InvEquip = this.items[i+this.scrollnum].id;
                itemSwapAttempt = false;
            }
        }
        if(mouseX > this.x + this.w && mouseX < this.x + this.w + this.h/10 && mouseY > this.y && mouseY < this.y + this.h/2){
            if(this.scrollnum + 1 <= 10){
                this.scrollnum++;
            }
        }
        if(mouseX > this.x + this.w && mouseX < this.x + this.w + this.h/10 && mouseY > this.y + this.h/2 && mouseY < this.y + this.h){
            if(this.scrollnum - 1 >= 0){
                this.scrollnum--;
            }
        }

    }
    reset(){
        this.update = false;
    }
}

function playerEquipment(x, y, w, h, item){

    if(item != null){
        if(CharacterScreenInfo.InvEquip == item.id){
            CharCV.fill("White");
        } else {
            if(mouseX >= x && mouseX <= x+w && mouseY >= y && mouseY <= y+h){
                CharCV.fill("White");
            } else {
                CharCV.fill(23, 129, 210);
            }
        }
    } else {
        CharCV.fill(23, 129, 210);
    }
    CharCV.rect(x, y, w, h);

    CharCV.fill(0, 46, 107);
    CharCV.rect(x+2, y+2, w-h-4, h-4);
    CharCV.rect(x+w-h+1, y+2, h-4, h-4);
    if(item != null){
        itemtext(x, y, w, item);
    }
}

function itemtext(x, y, w, item){
    CharCV.textAlign(LEFT);
    CharCV.textSize(20);
    CharCV.noStroke();
    CharCV.fill(23, 129, 210);
    CharCV.text(item.name, x+35, y+30);
    CharCV.textAlign(CENTER);
    CharCV.text(item.quantity, x+w-25, y+30);
}

function scroll(x, y, w, h, text){
    if(mouseX >= x && mouseX <= x+w && mouseY >= y && mouseY <= y+h){
        CharCV.fill("White");
    } else {
        CharCV.fill(23, 129, 210);
    }
    CharCV.rect(x, y, w, h);
    CharCV.fill(0, 46, 107);
    CharCV.rect(x+2, y+2, w-4, h-4);

    CharCV.textAlign(CENTER);
    CharCV.textSize(20);
    CharCV.noStroke();
    CharCV.fill(23, 129, 210);
    CharCV.text(text, x + w/2, y + h/2);
}   