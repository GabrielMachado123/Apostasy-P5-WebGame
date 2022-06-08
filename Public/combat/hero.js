let heroaction = {
    "source": {
        "instance": null,
        "team": "Ally",
        "type": null,
        "action": null,
        "name": null
      },
      "target": {
        "instance": null,
        "team": null
      }
    }
let combatmenu = 1;
let combatInventory = [];

class Hero {
    constructor(i, id){
        //Name Box
        this.x = (((i+1) / 4 * width)) - width/8 - (80 + (150))/2,
        this.y = 400,
        this.w = 80,
        this.h = 80,

        this.extraw = 160,

        this.atbBorder = "Black",
        this.atbGuageColor = "Green",
        this.atbGuageTimer = 0,
        this.atbGuageMax,
        this.atbGuageSize = 0,

        //Combat Information
        this.alive = true,
        this.instance = i,
        this.id = id,
        this.name = "",
        this.role = "",
        this.maxHP = "",
        this.currentHP = "",
        this.currentMP = "",
        this.cover = 0,
        this.thornmail = 0,
        this.down = 0,

        this.babilityname = "",
        this.ability1name = "",
        this.ability1cost = "",
        this.ability2name = "",
        this.ability2cost = "",
        this.ability3name = "",
        this.ability3cost = "",
        this.ability4name = "",
        this.ability4cost = "",
        this.whp = 0,
        this.wmp = 0,

        this.scrollnum = 0,
        this.ready = false,

        this.update = false,
        this.setup = false

    }

    draw(){

        //setup
        if(this.update == false){
            let heroId = this.id;
            let fightId = combatsetup.fightId;
            loadJSON('/getHero/'+heroId+'/'+fightId,(dataReceived)=>{
                if(dataReceived.length > 0){
                    this.name = dataReceived[0].hero_name;
                    this.role = dataReceived[0].class;
                    this.currentHP = dataReceived[0].currentHP;
                    this.maxHP = dataReceived[0].maxHP
                    this.currentMP = dataReceived[0].currentMP;
                    this.cover = dataReceived[0].cover;
                    this.thornmail = dataReceived[0].thornmail;
                    this.down = dataReceived[0].down;


                    if(this.setup == false){
                        if(this.role == "warrior"){
                            this.babilityname = "Bash";
                            this.ability1name = "Execute";
                            this.ability1cost = "25% cHP";
                            this.ability2name = "Cleave";
                            this.ability2cost = "10% cHP";
                            this.ability3name = "Battle Rage";
                            this.ability3cost = "";
                            this.ability4name = "War Cry";
                            this.ability4cost = "50% mHP";
                            this.atbGuageMax = 7;
                        } else if(this.role == "knight"){
                            this.babilityname = "Slash";
                            this.ability1name = "Cover";
                            this.ability1cost = "10 Mana";
                            this.ability2name = "Sword Art";
                            this.ability2cost = "20 Mana";
                            this.ability3name = "Shield Magic";
                            this.ability3cost = "80 Mana";
                            this.ability4name = "Thornmail";
                            this.ability4cost = "30 Mana";
                            this.atbGuageMax = 8;
                        } else if (this.role == "witch"){
                            this.babilityname = "Meditate";
                            this.ability1name = "Resurrection";
                            this.ability1cost = "80 Mana";
                            this.ability2name = "Area Heal";
                            this.ability2cost = "40 Mana";
                            this.ability3name = "Dark Flare";
                            this.ability3cost = "100 Mana";
                            this.ability4name = "Flash Heal";
                            this.ability4cost = "20 Mana";
                            this.atbGuageMax = 9;
                        } else if (this.role == "ranger"){
                            this.babilityname = "Arcane Shot";
                            this.ability1name = "Focus";
                            this.ability1cost = "30 Mana";
                            this.ability2name = "Deadly Shot";
                            this.ability2cost = "40 Mana";
                            this.ability3name = "Barrage";
                            this.ability3cost = "20 Mana";
                            this.ability4name = "Hunter's Mark";
                            this.ability4cost = "30 Mana";
                            this.atbGuageMax = 6;
                        }
                        this.setup = true;
                    }
                }
            });
            this.update = true;
        }

        if(heroaction.source.instance != null && heroaction.source.type != null && heroaction.source.action != null){
            if(mouseX > this.x && mouseX < this.x + this.w + this.extraw && mouseY > this.y && mouseY < this.y + this.h){
                if(heroaction.source.name == "War Cry" || heroaction.source.name == "Shield Magic" || heroaction.source.name == "Area Heal"){
                    for(let i = 0; i < 4; i++){
                        if(Heroes[i]){
                            Heroes[i].drawcursor();
                        }
                    }
                } else if(heroaction.source.name == "Cover" && this.instance != heroaction.source.instance){
                    Heroes[this.instance].drawcursor();
                } else if(heroaction.source.name == "Flash Heal" || heroaction.source.name == "Resurrection" || heroaction.source.name == "Health Potion" || heroaction.source.name == "Revive Potion" || heroaction.source.name == "Mana Potion"){
                    Heroes[this.instance].drawcursor();
                } else if((heroaction.source.name == "Battle Rage" || heroaction.source.name == "Thornmail" || heroaction.source.name == "Meditate" || heroaction.source.name == "Focus") && this.instance == heroaction.source.instance){
                    Heroes[this.instance].drawcursor();
                }
            }
        }
        


        //ATB bar
        CombatCanvas.rectMode(CORNER);
        ActionTimeBar(this.x, this.y + this.h * 4 + 5, this.w + this.extraw, this.h/2, this.atbBorder, this.atbGuageColor, this.atbGuageSize);

        if(this.setup == true && stopcombat == false){
            this.atbGuageSize = (this.w + this.extraw) * (this.atbGuageTimer / this.atbGuageMax);
            if(this.atbGuageTimer < this.atbGuageMax){
                this.atbGuageTimer = this.atbGuageTimer + deltaTime / 1000;
                this.atbBorder = "Black";
            } else {
                this.ready = true;
                this.atbBorder = "#55ff00";
            }
        }


        
        if(this.cover == 1){
            CombatCanvas.imageMode(CENTER);
            CombatCanvas.image(cover1, this.x + 10, this.y - 20);
        } else if(this.cover == 2){
            CombatCanvas.imageMode(CENTER);
            CombatCanvas.image(cover2, this.x + 10, this.y - 20);
        } else if(this.cover == 3){
            CombatCanvas.imageMode(CENTER);
            CombatCanvas.image(cover3, this.x + 10, this.y - 20);
        }

        if(this.thornmail == 1){
            CombatCanvas.imageMode(CENTER);
            CombatCanvas.image(thornmail, this.x + 70, this.y - 20);
        }


        if(action[0]){
            if(action[0].source.instance == this.instance && action[0].source.team == "Ally"){
                CombatCanvas.fill("green");
            }else{
                CombatCanvas.fill("black");
            }
        } else {
            CombatCanvas.fill("black");
        }
        CombatCanvas.rect(this.x-4, this.y-4, this.w + this.extraw+6, this.h * 4+6);

        // Character name Box
        CreateBoxInformation(this.x, this.y, this.w, this.h);
        CreateText(this.name, this.x + this.w / 2, this.y + this.h / 2 + 6, CENTER);

        //Health Box
        this.whp = (this.currentHP / this.maxHP)*this.extraw;
        CombatCanvas.fill("black");
        CombatCanvas.rect(this.x + this.w + 2, this.y + 2, this.extraw - 4, this.h / 2 - 4);
            if(action[0] && action[0].target.team == "Ally" && combatanimation.target.id == this.instance){
                CombatCanvas.fill("red");
            } else {
                CombatCanvas.fill("green");
            }
        CombatCanvas.rect(this.x + this.w + 2, this.y + 2, this.whp - 4, this.h / 2 - 4);
        CombatCanvas.fill("white");
        CombatCanvas.textAlign(LEFT);
        CombatCanvas.text("Health: "+this.currentHP+"/"+this.maxHP, this.x + this.w + 10, this.y + this.h / 4 + 6);

        //Mana Box
        this.wmp = (this.currentMP / 100)*this.extraw;
        CombatCanvas.fill("black");
        CombatCanvas.rect(this.x + this.w + 2, this.y + this.h/2 + 2, this.extraw - 4, this.h / 2 - 4);
        CombatCanvas.fill("#6a92d4");
        CombatCanvas.rect(this.x + this.w + 2, this.y + this.h/2 + 2, this.wmp - 4, this.h / 2 - 4);
        CombatCanvas.fill("white");
        CombatCanvas.textAlign(LEFT);
        CombatCanvas.text("Mana: "+this.currentMP+"/100", this.x + this.w + 10, this.y + this.h/2 + this.h / 4 + 6);

        if(this.ready == true && this.down == 0){
            heroDeath[this.instance] = 0;
            if(combatmenu == 1 || heroaction.source.instance != this.instance){
                //Basic Ability Box
                CreateBoxOption(this.x, this.y + this.h, this.w + this.extraw, this.h, this.instance, 1);
                CreateText(this.babilityname, this.x + (this.w + this.extraw)/2, this.y + this.h + this.h/2 + 6, CENTER);
                    
                //Abilities Box
                CreateBoxOption(this.x, this.y + this.h * 2, this.w + this.extraw, this.h);
                CreateText("Abilities", this.x + (this.w + this.extraw)/2, this.y + this.h * 2 + this.h/2 + 6, CENTER);

                //Items Box
                CreateBoxOption(this.x, this.y + this.h * 3, this.w + this.extraw, this.h);
                CreateText("Items", this.x + (this.w + this.extraw)/2, this.y + this.h * 3 + this.h/2 + 6, CENTER);

            } else if(combatmenu == 2 && heroaction.source.instance == this.instance){

                //Ability1
                CreateBoxAbility(this.x, this.y + this.h, this.w + this.extraw - 100, this.h / 2, this.instance, 2);
                CreateText(this.ability1name, this.x + 10, this.y + this.h + this.h/4 + 6, LEFT);
                CreateText(this.ability1cost, this.x + this.w + this.extraw - 50, this.y + this.h + this.h/4 + 6, CENTER);
    
                //Ability2
                CreateBoxAbility(this.x, this.y + this.h + this.h/2, this.w + this.extraw - 100, this.h / 2, this.instance, 3);
                CreateText(this.ability2name, this.x + 10, this.y + this.h + this.h/2 + this.h/4 + 6, LEFT);
                CreateText(this.ability2cost, this.x + this.w + this.extraw - 50, this.y + this.h + this.h/2 + this.h/4 + 6, CENTER);
    
                //Ability3
                CreateBoxAbility(this.x, this.y + this.h * 2, this.w + this.extraw - 100, this.h /2, this.instance, 4);
                CreateText(this.ability3name, this.x + 10, this.y + this.h * 2 + this.h / 4 + 6, LEFT);
                CreateText(this.ability3cost, this.x + this.w + this.extraw - 50, this.y + this.h * 2 + this.h/4 + 6, CENTER);
    
                //Ability4
                CreateBoxAbility(this.x, this.y + this.h * 2 + this.h /2, this.w + this.extraw - 100, this.h / 2, this.instance, 5);
                CreateText(this.ability4name, this.x + 10, this.y + this.h * 2 + this.h / 2 + this.h / 4 + 6, LEFT);
                CreateText(this.ability4cost, this.x + this.w + this.extraw - 50, this.y + this.h * 2 + this.h/2 + this.h/4 + 6, CENTER);
    
                //Return
                CreateBoxOption(this.x, this.y + this.h * 3, this.w + this.extraw, + this.h);
                CreateText("Return", this.x + (this.w + this.extraw)/2, this.y + this.h * 3 + this.h/2 + 6, CENTER);

            } else if(combatmenu == 3 && heroaction.source.instance == this.instance){

                for(let i = 0; i < 4; i++){
                    CreateBoxItem(this.x, this.y + this.h + (this.h/2)*i, this.w + this.extraw - 100, this.h / 2, combatInventory[i+this.scrollnum], this.instance, i+this.scrollnum);
                    if(combatInventory[i+this.scrollnum]){
                        CreateText(combatInventory[i+this.scrollnum].name, this.x + 10, this.y + this.h + (this.h/2)*i + this.h/4 + 6, LEFT);
                        CreateText(combatInventory[i+this.scrollnum].quantity, this.x + this.w + this.extraw - 75, this.y + this.h + (this.h/2)*i + this.h/4 + 6, CENTER);
                    }
                }

                CreateBoxOption(this.x + this.w + this.extraw - 50, this.y + this.h, 50, this.h);
                CreateBoxOption(this.x + this.w + this.extraw - 50, this.y + this.h * 2, 50, this.h);
                CombatCanvas.imageMode(CENTER);
                CombatCanvas.image(combatArrowUp, this.x + this.w + this.extraw - 25, this.y + this.h + this.h/2);
                CombatCanvas.image(combatArrowDown, this.x + this.w + this.extraw - 25, this.y + this.h * 2 + this.h/2);
    
    
                //Return
                CreateBoxOption(this.x, this.y + this.h * 3, this.w + this.extraw, + this.h);
                CreateText("Return", this.x + (this.w + this.extraw)/2, this.y + this.h * 3 + this.h/2 + 6, CENTER);

            }
        } else if(this.ready == false && this.down == 0) {
            CreateBoxInformation(this.x, this.y + this.h, this.w + this.extraw, this.h * 3);
            CreateText("Charging...", this.x + (this.w + this.extraw)/2, this.y + this.h + (this.h * 3)/2, CENTER);
        } else if(this.down == 1){
            CreateBoxInformation(this.x, this.y + this.h, this.w + this.extraw, this.h * 3);
            CreateText("Dead", this.x + (this.w + this.extraw)/2, this.y + this.h + (this.h * 3)/2, CENTER);
            heroDeath[this.instance] = 1;
        }

    }

    isclicked(){
        if(heroaction.source.instance != null && heroaction.source.type != null && heroaction.source.action != null){
            if(mouseX > this.x && mouseX < this.x + this.w + this.extraw && mouseY > this.y && mouseY < this.y + this.h){
                if(heroaction.source.name == "War Cry" || heroaction.source.name == "Shield Magic" || heroaction.source.name == "Area Heal"){
                    heroaction.target.instance = this.instance;
                    heroaction.target.team = "Ally";
                } else if(heroaction.source.name == "Cover" && this.instance != heroaction.source.instance){
                    heroaction.target.instance = this.instance;
                    heroaction.target.team = "Ally";
                } else if(heroaction.source.name == "Flash Heal" || heroaction.source.name == "Resurrection" || heroaction.source.name == "Health Potion" || heroaction.source.name == "Revive Potion" || heroaction.source.name == "Mana Potion"){
                    heroaction.target.instance = this.instance;
                    heroaction.target.team = "Ally";
                } else if((heroaction.source.name == "Battle Rage" || heroaction.source.name == "Thornmail" || heroaction.source.name == "Meditate" || heroaction.source.name == "Focus") && this.instance == heroaction.source.instance){
                    heroaction.target.instance = this.instance;
                    heroaction.target.team = "Ally";
                }
            }
        }
        if(this.ready == true && this.down == 0){
            if(combatmenu == 1 || heroaction.source.instance != this.instance){
                //Ability 1
                if(mouseX > this.x && mouseX < this.x + this.w + this.extraw && mouseY > this.y + this.h && mouseY < this.y + this.h * 2){
                    heroaction.source.instance = this.instance;
                    heroaction.source.type = "Ability";
                    heroaction.source.action = 1;
                    heroaction.source.name = this.babilityname;
                    combatmenu = 1;
                } else

                //Abilities
                if(mouseX > this.x && mouseX < this.x + this.w + this.extraw && mouseY > this.y + this.h * 2 && mouseY < this.y + this.h * 3){
                    heroaction.source.instance = this.instance;
                    heroaction.source.action = null;
                    combatmenu = 2;
                } else

                //Items
                if(mouseX > this.x && mouseX < this.x + this.w + this.extraw && mouseY > this.y + this.h * 3 && mouseY < this.y + this.h * 4){
                    heroaction.source.instance = this.instance;
                    heroaction.source.action = null;
                    combatmenu = 3;
                }


            } else if(combatmenu == 2 && heroaction.source.instance == this.instance){
                
                //Return
                if(mouseX > this.x && mouseX < this.x + this.w + this.extraw && mouseY > this.y + this.h*3 && mouseY < this.y + this.h*3 + this.h){
                    heroaction.source.instance = null;
                    heroaction.source.action = null;
                    combatmenu = 1;
                } else

                //Ability 2
                if(mouseX > this.x && mouseX < this.x + this.w + this.extraw - 100 && mouseY > this.y + this.h && mouseY < this.y + this.h + this.h / 2){
                    heroaction.source.instance = this.instance;
                    heroaction.source.type = "Ability";
                    heroaction.source.action = 2;
                    heroaction.source.name = this.ability1name;
                } else

                //Ability 3
                if(mouseX > this.x && mouseX < this.x + this.w + this.extraw - 100 && mouseY > this.y + this.h + this.h/2 && mouseY < this.y + this.h * 2){
                    heroaction.source.instance = this.instance;
                    heroaction.source.type = "Ability";
                    heroaction.source.action = 3;
                    heroaction.source.name = this.ability2name;
                } else

                //Ability 4
                if(mouseX > this.x && mouseX < this.x + this.w + this.extraw - 100 && mouseY > this.y + this.h * 2 && mouseY < this.y + this.h * 2 + this.h/2){
                    heroaction.source.instance = this.instance;
                    heroaction.source.type = "Ability";
                    heroaction.source.action = 4;
                    heroaction.source.name = this.ability3name;
                } else 

                //Ability 5
                if(mouseX > this.x && mouseX < this.x + this.w + this.extraw - 100 && mouseY > this.y + this.h * 2 + this.h/2 && mouseY < this.y + this.h * 3){
                    heroaction.source.instance = this.instance;
                    heroaction.source.type = "Ability";
                    heroaction.source.action = 5;
                    heroaction.source.name = this.ability4name;
                }

            } else if(combatmenu == 3 && heroaction.source.instance == this.instance){
                //Return
                if(mouseX > this.x && mouseX < this.x + this.w + this.extraw && mouseY > this.y + this.h*3 && mouseY < this.y + this.h*3 + this.h){
                    heroaction.source.instance = null;
                    heroaction.source.action = null;
                    combatmenu = 1;
                } else

                //scroll up
                if(mouseX > this.x + this.w + this.extraw - 50 && mouseX < this.x + this.w + this.extraw && mouseY > this.y + this.h && mouseY < this.y + this.h * 2){
                    if(this.scrollnum - 1 >= 0){
                        this.scrollnum--;
                    }
                } else 

                //scroll down
                if(mouseX > this.x + this.w + this.extraw - 50 && mouseX < this.x + this.w + this.extraw && mouseY > this.y + this.h * 2 && mouseY < this.y + this.h * 3){
                    if(this.scrollnum + 1 <= 10){
                        this.scrollnum++;
                    }
                }

                //items
                for(let i = 0; i < 4; i++){
                    if(mouseX > this.x && mouseX < this.x +this.w + this.extraw - 100 && mouseY > this.y + this.h + (this.h/2)*i && mouseY < this.y + this.h + (this.h/2)*i + this.h / 2){
                        if(combatInventory[i+this.scrollnum]){
                            heroaction.source.instance = this.instance;
                            heroaction.source.type = "Item";
                            heroaction.source.action = i+this.scrollnum;
                            heroaction.source.name = combatInventory[i+this.scrollnum].name;
                        }
                    }
                }
            }
        }
    }
    drawcursor(){
        CombatCanvas.imageMode(CENTER);
        CombatCanvas.image(handCursorDown, this.x + (this.w + this.extraw)/2, this.y - 20);
    }
    ATBreset(){
        this.atbGuageTimer = 0;
        this.ready = false;
    }
    reset(){
        this.update = false;
    }
}

//Information boxes
function CreateBoxInformation(x, y, w, h){
    CombatCanvas.fill("Black");
    CombatCanvas.rect(x, y, w, h);
    CombatCanvas.fill(0, 117, 143);
    CombatCanvas.imageMode(CORNER);
    CombatCanvas.image(combatUI, x+2, y+2, w-4, h-4);
}


//Combat option boxes
function CreateBoxOption(x, y, w, h, instance, ability){
    if(instance == heroaction.source.instance && ability == heroaction.source.action && instance != null && ability != null){
        CombatCanvas.fill("White");
    } else if(mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h){
        CombatCanvas.fill("White");
    } else {
        CombatCanvas.fill("Black"); 
    }
    CombatCanvas.rect(x, y, w, h);
    CombatCanvas.fill(0, 117, 143);
    CombatCanvas.imageMode(CORNER);
    CombatCanvas.image(combatUI, x+2, y+2, w-4, h-4);
    
}

function CreateBoxAbility(x, y, w, h, instance, ability){
    if(instance == heroaction.source.instance && ability == heroaction.source.action){
        CombatCanvas.fill("White");
    } else if(mouseX > x && mouseX < x + w + 100 && mouseY > y && mouseY < y + h){
        CombatCanvas.fill("White");
    } else {
        CombatCanvas.fill("Black"); 
    }
    CombatCanvas.rect(x, y, w, h);
    CombatCanvas.rect(x+w, y, 100, h);
    CombatCanvas.fill(0, 117, 143);
    CombatCanvas.imageMode(CORNER);
    CombatCanvas.image(combatUI, x+2, y+2, w-4, h-4);
    CombatCanvas.image(combatUI, x+w+2, y+2, 100-4, h-4);
}

function CreateBoxItem(x, y, w, h, inventory, i, item){
    if(inventory){
        if(i == heroaction.source.instance && item == heroaction.source.action){
            CombatCanvas.fill("White");
        } else if(mouseX > x && mouseX < x + w + 50 && mouseY > y && mouseY < y + h){
            CombatCanvas.fill("White");
        } else {
            CombatCanvas.fill("Black"); 
        }
    } else {
        CombatCanvas.fill("Black");
    }
    CombatCanvas.rect(x, y, w, h);
    CombatCanvas.rect(x+w, y, 50, h);
    CombatCanvas.fill(0, 117, 143);
    CombatCanvas.imageMode(CORNER);
    CombatCanvas.image(combatUI, x+2, y+2, w-4, h-4);
    CombatCanvas.image(combatUI, x+w+2, y+2, 50-4, h-4);
}


function CreateText(words, x, y, type){
    CombatCanvas.textSize(20);
    CombatCanvas.fill("black");
    CombatCanvas.noStroke();
    CombatCanvas.textAlign(type);
    CombatCanvas.text(words, x, y);
}

function ActionTimeBar(x, y, w, h, border, guagecolor, size){
    CombatCanvas.fill(border);
    CombatCanvas.rect(x, y, w, h);
    CombatCanvas.fill("white");
    CombatCanvas.rect(x+2, y+3, w-4, h-5);
    CombatCanvas.fill(guagecolor);
    CombatCanvas.rect(x+2, y+3, size-4, h-5)
}