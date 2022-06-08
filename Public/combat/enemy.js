class Enemy {
    constructor(instance, id){

        //sprite
        this.x = width / 2 - 350 + instance * 200,
        this.y = 100,
        this.w = 100,
        this.h = 200,

        this.name = "",
        this.instance = instance,
        this.maxHP,
        this.hp = 1,
        this.id = id,
        this.alive = true,
        this.mark = 0

        this.hpw = 0;

        this.atbMax = 6,
        this.atbTimer = 0;

        this.setup = false,
        this.lastHealthUpdateTime = 0,

        this.update = false

    }


    draw(){

        let enemyId = this.id;
        let fightId = combatsetup.fightId;

        if(this.alive == true){

            if(stopcombat == false){
                if(this.atbTimer < this.atbMax){
                    this.atbTimer = this.atbTimer + deltaTime / 1000;
                }else{
                    console.log("Enemy Attack");
                    action.push({
                        "source": {
                        "instance": this.instance,
                        "team": "Enemy",
                        "type": "Ability",
                        "action": null,
                        },
                        "target": {
                        "instance": null,
                        "team": "Ally"
                        },
                        "fightId": combatsetup.fightId,
                        "playerId": combatsetup.playerId
                    });
                    this.atbTimer = 0;
                }
            }

            //get ATBMaxTimer
            if(this.setup == false){
                this.setup = true;
                loadJSON('/getEnemyATBMaxTimer/'+enemyId,(dataReceived)=>{
                    if(dataReceived.length > 0){
                        this.atbMax = dataReceived[0].Max;
                    }
                });
            }

            //get HP
            if(this.update == false){
                this.update = true;
                loadJSON('/getEnemyStats/'+enemyId+'/'+fightId,(dataReceived)=>{
                    if(dataReceived.length > 0){
                        this.hp = dataReceived[0].currentHP;
                        this.maxHP = dataReceived[0].maxHP;
                        this.name = dataReceived[0].enemy_name;
                        this.mark = dataReceived[0].mark;
                    }
                });
            }


            if(heroaction.source.instance != null && heroaction.source.type != null && heroaction.source.action != null){
                if(mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h){
                    if(heroaction.source.name == "Bash" || heroaction.source.name == "Execute" || heroaction.source.name == "Slash" || heroaction.source.name == "Sword Art" || heroaction.source.name == "Arcane Shot" || heroaction.source.name == "Deadly Shot" || heroaction.source.name == "Hunter's Mark"){
                        Enemies[this.instance].drawcursor();
                    } else if(heroaction.source.name == "Cleave" || heroaction.source.name == "Dark Flare" || heroaction.source.name == "Barrage"){
                        for(let i = 0; i < 4; i++){
                            if(Enemies[i]){
                                Enemies[i].drawcursor();
                            }
                        }
                    }
                }
                
            }

                CombatCanvas.imageMode(CENTER);
                if(this.name == "Jealosy"){
                    if(action[0] && action[0].source.team == "Enemy" && action[0].source.instance == this.instance){
                        CombatCanvas.image(jealosyPNG, this.x + this.w / 2, this.y + this.h/2 + 20);
                    } else {
                        CombatCanvas.image(jealosyPNG, this.x + this.w / 2, this.y + this.h/2);
                    }
                } else if(this.name == "Virtue"){
                    if(action[0] && action[0].source.team == "Enemy" && action[0].source.instance == this.instance){
                        CombatCanvas.image(virtuePNG, this.x + this.w / 2, this.y + this.h/2 + 20);
                    } else {
                        CombatCanvas.image(virtuePNG, this.x + this.w / 2, this.y + this.h/2);
                    }
                }

                if(this.mark == 1){
                    CombatCanvas.imageMode(CENTER);
                    CombatCanvas.image(mark, this.x - 20, this.y + this.h + 10 + 25/2);
                }
                
                this.hpw = (this.hp / this.maxHP) * this.w;


                CombatCanvas.fill("black");
                CombatCanvas.rect(this.x, this.y + this.h + 10, this.w, 25);
                if(action[0] && action[0].target.team == "Enemy" && (action[0].target.instance == this.instance || combatanimation.target.amount == "All")){
                    CombatCanvas.fill("red");
                } else {
                    CombatCanvas.fill("green");
                }
                CombatCanvas.rect(this.x, this.y + this.h + 10, this.hpw, 25);
                CombatCanvas.textAlign(CENTER);
                CombatCanvas.fill("white");
                CombatCanvas.text(this.hp, this.x + this.w / 2, this.y + this.h + 25/2+15);

                this.atbGuageSize = (this.w + this.extraw) * (this.atbGuageTimer / this.atbGuageMax);

                //death
                if(this.hp <= 0){
                    this.alive = false;
                    enemyDeath.push(true);
                }
            
        }
    }

    isclicked(){
        if(this.alive == true){
            if(heroaction.source.instance != null && heroaction.source.type != null && heroaction.source.action != null){
                if(mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h){
                    if(heroaction.source.name == "Bash" || heroaction.source.name == "Execute" || heroaction.source.name == "Slash" || heroaction.source.name == "Sword Art" || heroaction.source.name == "Arcane Shot" || heroaction.source.name == "Deadly Shot" || heroaction.source.name == "Hunter's Mark"){
                        heroaction.target.instance = this.instance;
                        heroaction.target.team = "Enemy";
                    } else if(heroaction.source.name == "Cleave" || heroaction.source.name == "Dark Flare" || heroaction.source.name == "Barrage"){
                        heroaction.target.instance = this.instance;
                        heroaction.target.team = "Enemy";
                    }
                }
            }
        }
    }

    drawcursor(){
        if(this.alive == true){
            CombatCanvas.imageMode(CENTER);
            CombatCanvas.image(handCursorUp, this.x + this.w/2, this.y + this.h + 60);
        }
    }

    reset(){
        if(this.alive == true){
            this.update = false;
        }
    }
    ATBreset(){
        if(this.alive == true){
            this.atbTimer = 0;
        }
    }





}