let dungM;
let dungScreen;
let dungeonCharacters = [];
let departButton;
let closeButton
let drawAlert = false;

function drawDungeonAlert(){
  AlertBoxDungeon(canvasWidth*0.2,canvasHeight*0.15,canvasWidth*0.5,canvasHeight*0.45);
  TextDungeon("Your Dungeon Attack is in coldown",canvasWidth*0.45,canvasHeight*0.35,CENTER);
}

function departing(){
let departing = 0;

let player = {
  "playerId":playerId
}

httpPost('/getDungeonTime','json',player,(dataReceived)=>{

departing = dataReceived[0].dungeonTime;

if(departing == 0){
GoToScreen(COMBAT_SCREEN);
}else{
  drawAlert = true;
  
}
});
}


function createDungeonScreen() {
  dungScreen = new DungeonScreen(canvasWidth,canvasHeight*0.76);
  departButton = new ButtonsInDungeon(canvasWidth*0.85,canvasHeight * 0.35,canvasWidth*0.1,canvasHeight*0.08,"red","Depart");
  closeButton = new ButtonsInDungeon(canvasWidth*0.26,canvasHeight * 0.23,canvasWidth*0.1/3,canvasHeight*0.08/3,"red","Close");
  dungScreen.createMenu();
  for (let i = 0; i < 4; i++) {
    dungeonCharacters[i] = new characterD(i);
  }
}

function drawDungeonScreen() {
  dungScreen.drawScreen();
  for (let i = 0; i < numberButtons; i++) {
    Buttons[i].drawButton();
    Buttons[i].shine();
  }
}

class DungeonScreen{
  constructor(w,h){
    this.w = w;
    this.h = h;

  }
  createMenu(){
    dungM = createGraphics(this.w,this.h);
    
}

drawScreen(){
  dungM.background(BackgroundImages[2]);
  for (let i = 0; i < 4; i++) {
    dungeonCharacters[i].draw();
  }
  departButton.drawButton();
  departButton.shine();

  if(drawAlert == true){
    drawDungeonAlert();
    closeButton.drawButton2();
    closeButton.shine();
    closeButton.close();
  }
  image(dungM,0,0);
}



}





class ButtonsInDungeon {
  constructor(px, py, w, h, clr, name ) {

    this.px = px;
    this.py = py;
    this.w = w;
    this.h = h;
    this.clr = clr; 
    this.name = name;
    this.indexImage = 8;
  };
  drawButton() {
    dungM.fill('yellow');
    dungM.stroke(255, 204, 0);
    dungM.strokeWeight(3);
    dungM.fill(this.clr);
    dungM.image(ButtonImages[this.indexImage],this.px, this.py, this.w, this.h);
    dungM.fill('black');
    dungM.textSize(24);
    dungM.noStroke()
    dungM.textAlign(CENTER);
    dungM.text(this.name, this.px + this.w / 2, this.py + this.h / 2);


  };

  drawButton2() {
    dungM.fill('yellow');
    dungM.stroke(255, 204, 0);
    dungM.strokeWeight(3);
    dungM.fill(this.clr);
    dungM.image(ButtonImages[7],this.px, this.py, this.w, this.h);
  };

  shine() {
    if (mouseX > this.px && mouseX < this.px + this.w && mouseY > this.py && mouseY < this.py + this.h) {
      this.clr = 'rgb(194, 39, 39)'
      this.indexImage = 9;
    } else {
      this.clr = 'rgb(110, 24, 24)'
      this.indexImage = 8;
    }


  };
  work(){
    if(mouseX > this.px && mouseX < this.px + this.w && mouseY > this.py && mouseY < this.py + this.h ){
      departing();
    }
  }
  close(){
    if(mouseX > this.px && mouseX < this.px + this.w && mouseY > this.py && mouseY < this.py + this.h && mouseIsPressed){
      drawAlert = false;
    }
  }
}

class characterD{
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
              this.x = 100;
              this.y = 120;
          } else if(this.instance == 1){
              this.x = 500;
              this.y = 120;
          } else if(this.instance == 2){
              this.x = 100;
              this.y = 360;
          } else if(this.instance == 3){
              this.x = 500;
              this.y = 360;
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
      CharBoxDungeon(this.x - 2, this.y - 2, this.w + this.w * 0.8 + 4, this.h * 4 + 4);
      
      //name
      if(this.empty == false){
          CharBoxDungeon(this.x, this.y, this.w, this.h);
          CharTextDungeon(this.name, this.x + this.w/2, this.y + this.h/2+6, CENTER)
          //Level and Role
          CharBoxDungeon(this.x + this.w, this.y, this.w * 0.8, this.h);
          CharTextDungeon("Level "+this.level+" "+this.role, this.x + this.w + (this.w * 0.8)/2, this.y + this.h/2 + 6, CENTER);

          //Weapon
          CharBoxDungeon(this.x, this.y + this.h, this.w, this.h);
          CharTextDungeon(this.weapon, this.x + this.w/2, this.y + this.h + this.h/2 + 6, CENTER);

          //Armor
          CharBoxDungeon(this.x, this.y + this.h * 2, this.w, this.h);
          CharTextDungeon(this.armor, this.x + this.w/2, this.y + this.h * 2 + this.h/2 + 6, CENTER);

          //Acessory
          CharBoxDungeon(this.x, this.y + this.h * 3, this.w, this.h);
          CharTextDungeon(this.acessory, this.x + this.w/2, this.y + this.h * 3 + this.h/2 + 6, CENTER);

          //Attack
          CharBoxDungeon(this.x + this.w, this.y + this.h, this.w * 0.5, this.h);
          CharTextDungeon("Attack", this.x + this.w + 25, this.y + this.h + this.h/2 + 6, LEFT);

          //Attack value
          CharBoxDungeon(this.x + this.w + this.w * 0.5, this.y + this.h, this.w * 0.3, this.h);
          CharTextDungeon(this.attack, this.x + this.w + this.w * 0.5 + (this.w * 0.3/2), this.y + this.h + this.h/2 + 6, CENTER);

          //Health
          CharBoxDungeon(this.x + this.w, this.y + this.h * 2, this.w * 0.5, this.h);
          CharTextDungeon("Health", this.x + this.w + 25, this.y + this.h * 2 + this.h/2 + 6, LEFT);

          //Health Value
          CharBoxDungeon(this.x + this.w + this.w * 0.5, this.y + this.h * 2, this.w * 0.3, this.h);
          CharTextDungeon(this.health, this.x + this.w + this.w * 0.5 + (this.w * 0.3/2), this.y + this.h * 2 + this.h/2 + 6, CENTER);

          //Remove gear
          CharBoxDungeon(this.x + this.w, this.y + this.h * 3, this.w * 0.8, this.h);
         
      } else {
          CharTextDungeon("Empty Slot", this.x + (this.w + this.w * 0.8)/2, this.y + this.h*2 + 6, CENTER);
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


function CharBoxDungeon(x, y, w, h){
  dungM.image(ButtonImages[8],x, y, w, h);
  
}

function AlertBoxDungeon(x, y, w, h){
  dungM.image(ButtonImages[6],x, y, w, h);
  
}

function CharTextDungeon(content, x, y, align){
  dungM.fill("black");
  dungM.noStroke();
  dungM.textAlign(align);
  dungM.textSize(20);
  dungM.text(content, x, y);
}


function TextDungeon(content, x, y, align){
  dungM.fill("black");
  dungM.noStroke();
  dungM.textAlign(align);
  dungM.textSize(26);
  dungM.text(content, x, y);
}


