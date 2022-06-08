class character{
    constructor(i){
        this.instance = i,
        this.x = null,
        this.y = null,
        this.w = 200,
        this.h = 50,

        this.information = {
            "player": playerId,
            "slot": this.instance+1,
        },

        this.update = false,
        this.updateIdentity = false,
        this.updateWeapon = false,
        this.updateArmor = false,
        this.updateAcessory = false,
        this.updateStats = false,

        this.empty = true,

        this.name = "",
        this.level = "",
        this.role = "",
        this.weapon = "Nothing",
        this.armor = "Nothing",
        this.acessory = "Nothing",
        this.attack = "",
        this.health = ""
    }

    draw(){
        if(this.x == null && this.y == null){
            if(this.instance == 0){
                this.x = 400;
                this.y = 20;
            } else if(this.instance == 1){
                this.x = 800;
                this.y = 20;
            } else if(this.instance == 2){
                this.x = 400;
                this.y = 260;
            } else if(this.instance == 3){
                this.x = 800;
                this.y = 260;
            }
        }
        
        if(this.update == false){
            this.update = true;
            let slot = this.instance + 1;

            if(this.updateIdentity == false){
                this.updateIdentity = true;
                loadJSON('/getCharacterIdentity/'+playerId+'/'+slot,(dataReceived)=>{
                    if(dataReceived.length > 0){
                        this.name = dataReceived[0].hero_name;
                        this.level = dataReceived[0].lvl;
                        this.role = dataReceived[0].class;
                        this.empty = false;
                    } else {
                        this.name = "";
                        this.level = "";
                        this.role = "";
                        this.empty = true;
                    }
                });
            }
            if(this.updateWeapon == false){
                this.updateWeapon = true;
                loadJSON('/getCharacterWeapon/'+playerId+'/'+slot,(dataReceived)=>{
                    if(dataReceived.length > 0){
                        this.weapon = dataReceived[0].item_name;
                        this.update = false;
                        this.updateStats = false;
                    }
                });
            }
            if(this.updateArmor == false){
                this.updateArmor = true;
                loadJSON('/getCharacterArmor/'+playerId+'/'+slot,(dataReceived)=>{
                    if(dataReceived.length > 0){
                        this.armor = dataReceived[0].item_name;
                        this.update = false;
                        this.updateStats = false;
                    }
                });
            }
            if(this.updateAcessory == false){
                this.updateAcessory = true;
                loadJSON('/getCharacterAcessory/'+playerId+'/'+slot,(dataReceived)=>{
                    if(dataReceived.length > 0){
                        this.acessory = dataReceived[0].item_name;
                        this.update = false;
                        this.updateStats = false;
                    }
                });
            }

            if(this.updateStats == false){
                this.updateStats = true;
                loadJSON('/getCharacterStats/'+playerId+'/'+slot,(dataReceived)=>{
                    if(dataReceived != false){
                        this.attack = dataReceived.damage.final;
                        this.health = dataReceived.health.final;
                    }
                });
            }
        }
    
        //full box
        CharBox(this.x - 2, this.y - 2, this.w + this.w * 0.8 + 4, this.h * 4 + 4, "Character", this.instance, this.empty);
        
        //name
        if(this.empty == false){
            CharBox(this.x, this.y, this.w, this.h);
            CharText(this.name, this.x + this.w/2, this.y + this.h/2+6, CENTER)
            //Level and Role
            CharBox(this.x + this.w, this.y, this.w * 0.8, this.h);
            CharText("Level "+this.level+" "+this.role, this.x + this.w + (this.w * 0.8)/2, this.y + this.h/2 + 6, CENTER);

            //Weapon
            CharBox(this.x, this.y + this.h, this.w, this.h, "Weapon", this.instance);
            CharText(this.weapon, this.x + this.w/2, this.y + this.h + this.h/2 + 6, CENTER);

            //Armor
            CharBox(this.x, this.y + this.h * 2, this.w, this.h, "Armor", this.instance);
            CharText(this.armor, this.x + this.w/2, this.y + this.h * 2 + this.h/2 + 6, CENTER);

            //Acessory
            CharBox(this.x, this.y + this.h * 3, this.w, this.h, "Acessory", this.instance);
            CharText(this.acessory, this.x + this.w/2, this.y + this.h * 3 + this.h/2 + 6, CENTER);

            //Attack
            CharBox(this.x + this.w, this.y + this.h, this.w * 0.5, this.h);
            CharText("Attack", this.x + this.w + 25, this.y + this.h + this.h/2 + 6, LEFT);

            //Attack value
            CharBox(this.x + this.w + this.w * 0.5, this.y + this.h, this.w * 0.3, this.h);
            CharText(this.attack, this.x + this.w + this.w * 0.5 + (this.w * 0.3/2), this.y + this.h + this.h/2 + 6, CENTER);

            //Health
            CharBox(this.x + this.w, this.y + this.h * 2, this.w * 0.5, this.h);
            CharText("Health", this.x + this.w + 25, this.y + this.h * 2 + this.h/2 + 6, LEFT);

            //Health Value
            CharBox(this.x + this.w + this.w * 0.5, this.y + this.h * 2, this.w * 0.3, this.h);
            CharText(this.health, this.x + this.w + this.w * 0.5 + (this.w * 0.3/2), this.y + this.h * 2 + this.h/2 + 6, CENTER);

            //Remove gear
            CharBox(this.x + this.w, this.y + this.h * 3, this.w * 0.8, this.h, "Remove", this.instance, this.empty);
            if(charScreen ==1){
                CharText("Remove Gear", this.x + this.w + (this.w * 0.8)/2, this.y + this.h * 3 + this.h/2 + 6, CENTER);
            } else if(charScreen == 2){
                CharText("Store Character", this.x + this.w + (this.w * 0.8)/2, this.y + this.h * 3 + this.h/2 + 6, CENTER);
            }
        } else {
            CharText("Empty Slot", this.x + (this.w + this.w * 0.8)/2, this.y + this.h*2 + 6, CENTER);
        }


    }

    isclicked(){
        if(charScreen == 1 && this.empty == false){
            if(mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y + this.h && mouseY < this.y + this.h * 2){
                CharacterScreenInfo.CharSlot = this.instance+1;
                CharacterScreenInfo.CharEquip = "Weapon";
                itemSwapAttempt = false;
            } else if(mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y + this.h * 2 && mouseY < this.y + this.h * 3) {
                CharacterScreenInfo.CharSlot = this.instance+1;
                CharacterScreenInfo.CharEquip = "Armor";
                itemSwapAttempt = false;
            } else if(mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y + this.h * 3 && mouseY < this.y + this.h * 4) {
                CharacterScreenInfo.CharSlot = this.instance+1;
                CharacterScreenInfo.CharEquip = "Acessory";
                itemSwapAttempt = false;
            } else if (mouseX > this.x + this.w && mouseX < this.x + this.w + this.w * 0.8 && mouseY > this.y + this.h * 3 && mouseY < this.y + this.h * 4){
                CharacterScreenInfo.CharSlot = this.instance+1;
                CharacterScreenInfo.PlayerId = playerId;
        
                httpPost('/RemoveGear', 'json',CharacterScreenInfo,(dataReceived)=>{
                    this.updateWeapon = false;
                    this.updateArmor = false;
                    this.updateAcessory = false;
                    this.update = false;
                    CharacterScreenInfo.CharSlot = null;
                    CharacterScreenInfo.CharEquip = null;
                    CharacterScreenInfo.InvEquip = null;

                    equipmentObj.reset();
                });
            }
        } else if (charScreen == 2){
            if(this.empty == false){
                if((mouseX > this.x && mouseX < this.x + this.w + this.w * 0.8 && mouseY > this.y && mouseY < this.y + this.h * 4) && !(mouseX > this.x + this.w && mouseX < this.x + this.w + this.w * 0.8 && mouseY > this.y + this.h * 3 && mouseY < this.y + this.h * 4)){
                    CharacterScreenInfo.CharSlot = this.instance+1;
                    itemSwapAttempt = false;
                } else if (mouseX > this.x + this.w && mouseX < this.x + this.w + this.w * 0.8 && mouseY > this.y + this.h * 3 && mouseY < this.y + this.h * 4){
                    CharacterScreenInfo.CharSlot = this.instance+1;
                    CharacterScreenInfo.PlayerId = playerId;
                    httpPost('/RemoveCharacter', 'json',CharacterScreenInfo,(dataReceived)=>{
                        this.updateWeapon = false;
                        this.updateArmor = false;
                        this.updateAcessory = false;
                        this.updateIdentity = false;
                        this.update = false;
                        CharacterScreenInfo.CharSlot = null;

                        equipmentObj.reset();
                        characterswapObj.reset();
                    });
                }
            } else if (this.empty == true){
                if(mouseX > this.x && mouseX < this.x + this.w + this.w * 0.8 && mouseY > this.y && mouseY < this.y + this.h * 4){
                    CharacterScreenInfo.CharSlot = this.instance+1;
                    itemSwapAttempt = false;
                }
            }
        }
    }

    reset(){
        if(CharacterScreenInfo.CharEquip == "All"){
            this.updateWeapon = false;
            this.updateArmor = false;
            this.updateAcessory = false;
            this.updateIdentity = false;
        }
        if(CharacterScreenInfo.CharEquip == "Weapon"){
            this.updateWeapon = false;
        }
        if(CharacterScreenInfo.CharEquip == "Armor"){
            this.updateArmor = false;
        }
        if(CharacterScreenInfo.CharEquip == "Acessory"){
            this.updateAcessory = false;
        }
        CharacterScreenInfo.CharEquip = null;
        this.update = false;
    }
}


function CharBox(x, y, w, h, type, instance, empty){
    if((type == "Weapon" || type == "Armor" || type == "Acessory" || type == "Remove") && charScreen == 1){
        if(CharacterScreenInfo.CharEquip == type && CharacterScreenInfo.CharSlot == instance+1){
            CharCV.fill("White");
        } else {
            if(mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h){
                CharCV.fill("White");
            } else {
                CharCV.fill(23, 129, 210);
            }
        }
    } else if ((type == "Character" || type == "Remove") && charScreen == 2){
        if(empty == false){
            if(type == "Character"){
                if(CharacterScreenInfo.CharSlot == instance+1){
                    CharCV.fill("White");
                } else if((mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) && !(mouseX > x + 200 && mouseX < x + w && mouseY > y + 150 && mouseY < y + h)){
                    CharCV.fill("White");
                } else {
                    CharCV.fill(23, 129, 210);
                }
            } else if (type == "Remove"){
                if(mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h){
                    CharCV.fill("White");
                } else {
                    CharCV.fill(23, 129, 210);
                }
            }
        } else if(empty == true){
            if(CharacterScreenInfo.CharSlot == instance+1){
                CharCV.fill("White");
            } else if(mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h){
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
    CharCV.rect(x+2, y+2, w-4, h-4);
}

function CharText(content, x, y, align){
    CharCV.fill(23, 129, 210);
    CharCV.noStroke();
    CharCV.textAlign(align);
    CharCV.textSize(20);
    CharCV.text(content, x, y);
}