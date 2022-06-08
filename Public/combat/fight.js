let CombatCanvas;
let Heroes = [];
let action = [];
let enemyDeath = [];
let heroDeath = [];
let Enemies = [];
let stopcombat = false;
let updateInventory = false;
let pausetimer = 0;
let winsetup = false;
let failstate = false;
let combatanimation = {
  "source": {
    "heal": null,
    "healthcost": null,
    "manacost": null
  },
  "target": {
    "damage": null,
    "heal": null,
    "manaheal": null,
    "amount": null
  }
}

let combatsetup = {
  "playerId": null,
  "instance": null,
  "fightId": null
}

function createCombatScreen(){
  CombatCanvas = createGraphics(canvasWidth, canvasHeight);
  combatsetup.playerId = playerId;
  enemyDeath = [];
  Heroes = [];
  heroDeath = [];
  Enemies = [];
  httpPost('/createFight', 'json', combatsetup,(dataReceived)=>{
    if(dataReceived.length>0){
      combatsetup.fightId = dataReceived[0].fightId;
      httpPost('/createFightHero', 'json',combatsetup,(dataReceived)=>{
        if(dataReceived.length > 0){
          for(let i = 0; i < dataReceived.length; i++){
            Heroes[dataReceived[i].slot-1] = new Hero(dataReceived[i].slot-1, dataReceived[i].heroId);
          }
          httpPost('/createFightEnemy', 'json',combatsetup,(dataReceived)=>{
            for(let i = 0; i < dataReceived.length; i++){
              if(dataReceived[i]){
                Enemies[i] = new Enemy(dataReceived[i].slot-1, dataReceived[i].enemyInFightId);
              }
            }
          });
        }
      });
    }
  });
}


function drawCombatScreen(){
  let playerIdJSON = {"playerid": playerId};
  CombatCanvas.imageMode(CORNER)
  CombatCanvas.background(dungeon);
  let herodeathcounter = 0;

  for(let i = 0; i < Heroes.length; i++){
    if(Heroes[i]){
      herodeathcounter = herodeathcounter + heroDeath[i]
    }
  }

  if(Heroes.length == herodeathcounter && herodeathcounter != 0){
    httpPost('/Defeat', 'json',combatsetup,(dataReceived)=>{});
    GoToScreen(GAME_SCREEN);
  

  }else if(enemyDeath.length == Enemies.length && enemyDeath.length != 0){
    GoToScreen(VICTORY_SCREEN);
  
  }else {
    for(let i=0; i<4; i++){
      if(Heroes[i]){
        Heroes[i].draw();
      }
    }
    for(let i=0; i<Enemies.length; i++){
      Enemies[i].draw();
    }
    if(updateInventory == false){
      updateInventory = true;
      loadJSON('/getConsumables/'+playerId,(dataReceived)=>{
        combatInventory = [];
        if(dataReceived.length > 0){
            for(let i = 0; i < dataReceived.length; i++){
                combatInventory[i] = {
                    "name": dataReceived[i].item_name,
                    "quantity": dataReceived[i].quantity
                }
            }
        }
      });
    }

    if(heroaction.source.instance != null && heroaction.source.type != null && heroaction.source.action != null && heroaction.target.instance != null && heroaction.target.team != null){
      action.push({
        "source": {
          "instance": heroaction.source.instance,
          "team": heroaction.source.team,
          "type": heroaction.source.type,
          "action": heroaction.source.action
        },
        "target": {
          "instance": heroaction.target.instance,
          "team": heroaction.target.team
        },
        "fightId": combatsetup.fightId,
        "playerId": combatsetup.playerId
      });
      heroaction.source.instance = null;
      heroaction.source.type = null;
      heroaction.source.action = null;
      heroaction.target.instance = null;
      heroaction.source.name = null;
    }
    if(action[0]){
      if(stopcombat == false){
        httpPost('/PerformAction', 'json',action[0],(dataReceived)=>{
          if(dataReceived.length == 0){
            console.log("It didnt work");
            failstate = true;
          }else{
            combatanimation.source.heal = dataReceived.source.heal;
            combatanimation.source.healthcost = dataReceived.source.healthcost;
            combatanimation.source.manacost = dataReceived.source.manacost;
            combatanimation.target.damage = dataReceived.target.damage;
            combatanimation.target.heal = dataReceived.target.heal;
            combatanimation.target.manaheal = dataReceived.target.manaheal;
            combatanimation.target.amount = dataReceived.target.amount;
            combatanimation.target.id = dataReceived.target.id;
          }
        });
        stopcombat = true;
      }
      //pause if
      if(pausetimer >= 1 || failstate == true){
        //source Ally
        if(action[0].source.team == "Ally"){
          if(failstate == false){
            Heroes[action[0].source.instance].reset();
            Heroes[action[0].source.instance].ATBreset();
            if(action[0].source.type == "Item"){
              updateInventory = false;
            }
          }
        }
        //target Ally
        if(action[0].target.team == "Ally"){
          for(let i = 0; i < 4; i++){
            if(Heroes[i]){
              Heroes[i].reset();
            }
          }
        }
        //Source Enemy
        if(action[0].source.team == "Enemy"){
          Enemies[action[0].source.instance].reset();
          Enemies[action[0].source.instance].ATBreset();
        }
        //Target Enemy
        if(action[0].target.team == "Enemy"){
          if(combatanimation.target.amount == "All"){
            for(let i = 0; i < 4; i++){
              if(Enemies[i]){
                Enemies[i].reset();
              }
            }
          }else if(combatanimation.target.amount == "Single"){
            Enemies[action[0].target.instance].reset();
          }
        }
        action.shift();
        stopcombat = false;
        failstate = false;
        pausetimer = 0;
        combatanimation = {
          "source": {
            "heal": null,
            "healthcost": null,
            "manacost": null
          },
          "target": {
            "damage": null,
            "heal": null,
            "manaheal": null,
            "amount": null,
            "id": null
          }
        }
        
      } else {
        pausetimer = pausetimer + + deltaTime / 1000;
      }

    }
  }
  imageMode(CORNER);
  image(CombatCanvas, 0, 0);
}