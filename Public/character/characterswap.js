class characterswap{
    constructor(){
        this.x = 20,
        this.y = 20,
        this.w = 150,
        this.h = 50,

        this.cx = 70,
        this.cy = 480,
        this.cw = 250,
        this.ch = 50

        this.ux = this.x,
        this.uy = this.y + this.h * 8 + 20,
        this.uw = this.w - 50,
        this.uh = this.h,

        this.role = ["warrior", "knight", "witch", "ranger"],
        this.rolei = 0,
        this.inputname,

        this.character = [],
        this.charactercount = 0,
        this.allcharacters = [],
        this.allcharactersi = 0,

        this.state = 1,

        this.update = false,

        this.killtextbox = false
    }

    draw(){

        if(this.update == false){
            this.update = true;
            loadJSON('/getAllCharacters/'+playerId,(dataReceived)=>{
                this.character = [];
                if(dataReceived.length > 0){
                    for(let i = 0; i < dataReceived.length; i++){
                        this.character[i] = {
                            "name": dataReceived[i].hero_name,
                            "class": dataReceived[i].class,
                            "level": dataReceived[i].lvl
                        }
                    }
                }
            });

            loadJSON('/countCharacters/'+playerId,(dataReceived)=>{
                if(dataReceived.length > 0){
                    for(let i = 0; i < dataReceived.length; i++){
                        this.allcharacters[i] = dataReceived[i].hero_name;
                    }
                }
                this.charactercount = dataReceived.length;
            });

        }



        CharBoxSelect(this.x, this.y, this.w * 2 + 50, this.h * 8);

        if(this.character.length > 0){
            for(let i = 0; i < this.character.length; i++){
                CharBoxSelect(this.x, this.y + this.h * i, this.w, this.h, "Select", i);
                CharText(this.character[i].name, this.x + this.w/2, this.y + this.h * i + this.h/2 + 6, CENTER);
                CharText("Level "+this.character[i].level+" "+this.character[i].class, this.x + this.w + 10, this.y + this.h * i + this.h/2 + 6, LEFT);
            }
        }
        CharText(this.charactercount+"/8 Characters", this.cx + this.cw / 2, this.cy - 25, CENTER);

        if(this.state == 1){
            CharBoxSelect(this.cx, this.cy, this.cw, this.ch, "Create");
            CharText("Create Character", this.cx + this.cw / 2, this.cy + this.ch / 2 + 6, CENTER);

            CharBoxSelect(this.cx, this.cy + this.ch + 20, this.cw, this.ch, "Delete");
            CharText("Delete Character", this.cx + this.cw / 2, this.cy + this.ch + 20 + this.ch / 2 + 6, CENTER);
        } else if(this.state == 2){

            //Name
            CharBoxSelect(this.ux, this.uy, this.uw, this.uh);
            CharText("Name:", this.ux + this.uw / 2, this.uy + this.uh / 2 + 6, CENTER);

            CharBoxSelect(this.ux + this.uw, this.uy, 250, this.uh);
            if(this.inputname != null){
                this.inputname.position(this.ux + this.uw + 370, this.uy + 100);
                this.inputname.size(220);
            }

            //Role
            CharBoxSelect(this.ux, this.uy + this.uh, this.uw, this.uh);
            CharText("Role:", this.ux + this.uw / 2, this.uy + this.uh + this.uh / 2 + 6, CENTER);

            CharBoxHover(this.ux + this.uw, this.uy + this.uh, 50, this.uh);
            CharCV.imageMode(CENTER);
            CharCV.image(leftarrow, this.ux + this.uw + 25, this.uy + this.uh + this.uh/2)
            CharBoxSelect(this.ux + this.uw + 50, this.uy + this.uh, 150, this.uh);
            CharText(this.role[this.rolei], this.ux + this.uw + 50 + 150/2, this.uy + this.uh + this.uh/2 + 6, CENTER);
            CharBoxHover(this.ux + this.uw + 200, this.uy + this.uh, 50, this.uh);
            CharCV.image(rightarrow, this.ux + this.uw + 200 + 25, this.uy + this.uh + this.uh/2);

            //Confirm
            CharBoxHover(this.ux, this.uy + this.uh * 2, 175, this.uh);
            CharText("Confirm", this.ux + 175/2, this.uy + this.uh * 2 + this.uh/2 + 6, CENTER);
            CharBoxHover(this.ux + 175, this.uy + this.uh * 2, 175, this.uh);
            CharText("Back", this.ux + 175 + 175/2, this.uy + this.uh * 2 + this.uh/2 + 6, CENTER);

        } else if(this.state == 3){
            CharBoxSelect(this.ux, this.uy + this.uh, this.uw, this.uh);
            CharText("Role:", this.ux + this.uw / 2, this.uy + this.uh + this.uh / 2 + 6, CENTER);

            CharBoxHover(this.ux + this.uw, this.uy + this.uh, 50, this.uh);
            CharCV.imageMode(CENTER);
            CharCV.image(leftarrow, this.ux + this.uw + 25, this.uy + this.uh + this.uh/2)
            CharBoxSelect(this.ux + this.uw + 50, this.uy + this.uh, 150, this.uh);
            if(this.charactercount != 0){
                CharText(this.allcharacters[this.allcharactersi], this.ux + this.uw + 50 + 150/2, this.uy + this.uh + this.uh/2 + 6, CENTER);
            }
            CharBoxHover(this.ux + this.uw + 200, this.uy + this.uh, 50, this.uh);
            CharCV.image(rightarrow, this.ux + this.uw + 200 + 25, this.uy + this.uh + this.uh/2);

            //Confirm
            CharBoxHover(this.ux, this.uy + this.uh * 2, 175, this.uh);
            CharText("Confirm", this.ux + 175/2, this.uy + this.uh * 2 + this.uh/2 + 6, CENTER);
            CharBoxHover(this.ux + 175, this.uy + this.uh * 2, 175, this.uh);
            CharText("Back", this.ux + 175 + 175/2, this.uy + this.uh * 2 + this.uh/2 + 6, CENTER);
        }

    }

    isclicked(){
        for(let i = 0; i < this.character.length; i++){
            if(mouseX > this.x, mouseX < this.x + this.w * 2 + 50 && mouseY > this.y + this.h * i && mouseY < this.y + this.h * i + this.h){
                CharacterScreenInfo.SwapCharacter = i;
                itemSwapAttempt = false;
            }
        }

        if(this.state == 1){
            if(mouseX > this.cx && mouseX < this.cx + this.cw && mouseY > this.cy && mouseY < this.cy + this.ch && this.charactercount < 8){
                this.state = 2;
                this.inputname = createInput('');
            } else if(mouseX > this.cx && mouseX < this.cx + this.cw && mouseY > this.cy + this.ch + 20 && mouseY < this.cy + this.ch * 2 + 20 && this.charactercount > 0){
                console.log("Delete");
                this.state = 3;
            }
        } else if(this.state == 2){
            if(mouseX > this.ux + 175 && mouseX < this.ux + 175 + 175 && mouseY > this.uy + this.uh * 2 && mouseY < this.uy + this.uh * 3){
                this.inputname.remove();
                this.state = 1;
            } else if(mouseX > this.ux + this.uw && mouseX < this.ux + this.uw + 50 && mouseY > this.uy + this.uh && mouseY < this.uy + this.uh * 2){
                if(this.rolei > 0){
                    this.rolei--;
                } else {
                    this.rolei = 3;
                }
            } else if(mouseX > this.ux + this.uw + 200 && mouseX < this.ux + this.uw + 200 + 50 && mouseY > this.uy + this.uh && mouseY < this.uy + this.uh * 2){
                if(this.rolei < 3){
                    this.rolei++;
                } else {
                    this.rolei = 0;
                }
            } else if(mouseX > this.ux && mouseX < this.ux + 175 && mouseY > this.uy + this.uh * 2 && mouseY < this.uy + this.uh * 3){
                if(this.inputname.value().length<10 && this.inputname.value().length>0 && this.charactercount < 8){
                    CharacterScreenInfo.Insert.name = this.inputname.value();
                    CharacterScreenInfo.Insert.role = this.role[this.rolei];
                    CharacterScreenInfo.Insert.playerId = playerId;
                    httpPost('/InsertCharacter', 'json',CharacterScreenInfo.Insert,(dataReceived)=>{
                        if(dataReceived == true){
                            this.update = false;
                            this.state = 1;
                            this.inputname.remove();
                            CharacterScreenInfo.Insert.name = null;
                            CharacterScreenInfo.Insert.role = null;
                        }
                    });
                }
            }
        } else if(this.state == 3){
            if(mouseX > this.ux + 175 && mouseX < this.ux + 175 + 175 && mouseY > this.uy + this.uh * 2 && mouseY < this.uy + this.uh * 3){
                this.state = 1;
            } else if(mouseX > this.ux + this.uw && mouseX < this.ux + this.uw + 50 && mouseY > this.uy + this.uh && mouseY < this.uy + this.uh * 2){
                if(this.allcharactersi > 0 && this.charactercount > 0){
                    this.allcharactersi--;
                } else {
                    this.allcharactersi = this.charactercount - 1;
                }
            } else if(mouseX > this.ux + this.uw + 200 && mouseX < this.ux + this.uw + 200 + 50 && mouseY > this.uy + this.uh && mouseY < this.uy + this.uh * 2){
                if(this.allcharactersi < this.charactercount - 1 && this.charactercount > 0){
                    this.allcharactersi++;
                } else {
                    this.allcharactersi = 0;
                }
            }else if(mouseX > this.ux && mouseX < this.ux + 175 && mouseY > this.uy + this.uh * 2 && mouseY < this.uy + this.uh * 3 && this.charactercount > 0){
                CharacterScreenInfo.Delete.name = this.allcharacters[this.allcharactersi];
                CharacterScreenInfo.Delete.row = this.allcharactersi;
                CharacterScreenInfo.Delete.playerId = playerId;
                httpPost('/DeleteCharacter', 'json',CharacterScreenInfo.Delete,(dataReceived)=>{
                    this.update = false;
                    if(dataReceived.slot != 0){
                        CharacterScreenInfo.CharEquip = "All";
                        characterObj[dataReceived.slot-1].reset()
                    }
                    equipmentObj.reset();
                    CharacterScreenInfo.Delete.name = null;
                    CharacterScreenInfo.Delete.row = null;
                    CharacterScreenInfo.Delete.playerId = null;
                    this.state = 1;
                });
            }
        }
    }

    reset(){
        this.update = false;
    }

    killtextboxfunc(){
        if(this.inputname){
            this.inputname.remove();
        }
    }

    resetstate(){
        this.state = 1;
    }
}

function CharBoxSelect(x, y, w, h, type, i){
    if(type == "Select"){
        if(CharacterScreenInfo.SwapCharacter == i){
            CharCV.fill("White");
        } else if(mouseX > x && mouseX < x + w * 2 + 50 && mouseY > y && mouseY < y + h){
            CharCV.fill("White");
        } else {
            CharCV.fill(23, 129, 210);
        }
        CharCV.rect(x, y, w, h);
        CharCV.rect(x + w, y, w + 50, h);
        CharCV.fill(0, 46, 107);
        CharCV.rect(x+2, y+2, w-4, h-4);
        CharCV.rect(x + w + 2, y + 2, w - 4 + 50, h - 4);
    
    } else if(type == "Create" || type == "Delete"){
        if(mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h){
            CharCV.fill("White");
        } else {
            CharCV.fill(23, 129, 210);
        }
        CharCV.rect(x, y, w, h);
        CharCV.fill(0, 46, 107);
        CharCV.rect(x+2, y+2, w-4, h-4);
    } else {
        CharCV.fill(23, 129, 210);
        CharCV.rect(x, y, w, h);
        CharCV.fill(0, 46, 107);
        CharCV.rect(x+2, y+2, w-4, h-4);
    }
}

function CharBoxHover(x, y, w, h){
    if(mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h){
        CharCV.fill("White");
    } else {
        CharCV.fill(23, 129, 210);
    }
    CharCV.rect(x, y, w, h);
    CharCV.fill(0, 46, 107);
    CharCV.rect(x+2, y+2, w-4, h-4);
}