let Buttons = [];
let numberButtons = 5;
let bM;

function createGameScreen()
{
  deleteinputs();
  mMenu = new bottomMenu(canvasWidth,canvasHeight*0.25,0,canvasHeight * 0.25,username);
  mMenu.createMenu();

};

function deleteinputs(){
    nameInput.remove();
    passInput.remove();
    loginBtn.remove();
    goRegisterBtn.remove();
};


function drawGameScreen()
{ 
  mMenu.drawUi();
  for (let i = 0; i < numberButtons; i++) {
    Buttons[i].drawButton();
    Buttons[i].shine();
  };

};

function bottomMenuSetup(){
    Buttons[0] = new ButtonGreen(canvasWidth*0.15, canvasHeight*0.9, canvasWidth*0.1, canvasHeight*0.075, 'anything', 'Market');
    Buttons[1] = new ButtonBlue(canvasWidth*0.02,canvasHeight*0.8, canvasWidth*0.1, canvasHeight*0.075, 'anything', 'Characters');
    Buttons[2] = new ButtonRed(canvasWidth*0.15,canvasHeight*0.8, canvasWidth*0.1, canvasHeight*0.075, 'anything', 'Dungeon');
    Buttons[3] = new ButtonOrange(canvasWidth*0.02, canvasHeight*0.9, canvasWidth*0.1, canvasHeight*0.075, 'anything', 'Inventory');
    Buttons[4] = new ButtonLogout(canvasWidth*0.8, canvasHeight*0.9,canvasWidth*0.1, canvasHeight*0.075, 'anything', 'Log-out');
}


class ButtonOrange {
  constructor(px, py, w, h, clr, name) {

    this.px = px;
    this.py = py;
    this.w = w;
    this.h = h;
    this.clr = clr;
    this.name = name;
    this.indexImageArray = 0;

  };
  drawButton() {
    fill('yellow');
    stroke(255, 204, 0);
    strokeWeight(3);
    fill(this.clr);
    image(ButtonImages[this.indexImageArray],this.px, this.py, this.w, this.h);
    fill('black');
    textSize(24);
    noStroke()
    textAlign(CENTER);
    text(this.name, this.px + this.w / 2, this.py + this.h / 2 + this.indexImageArray * 5);


  };
  shine() {
    if (mouseX > this.px && mouseX < this.px + this.w && mouseY > this.py && mouseY < this.py + this.h) {
      this.clr = 'rgb(230,143,29)'
      this.indexImageArray = 1;
    } else {
      this.clr = 'rgb(208,129,27)'
      this.indexImageArray = 0;
    }


  };
  work(){
    if(mouseX > this.px && mouseX < this.px + this.w && mouseY > this.py && mouseY < this.py + this.h ){
      if(characterswapObj){
        characterswapObj.killtextboxfunc();
      }
      GoToScreen(INVENTORY_SCREEN);
      
    }
  };
}



class bottomMenu {

  constructor(wd,hg,x,y,text) {

    this.wd = wd;
    this.hg = hg;
    this.x = x;
    this.y = y;
    this.text = text;
  }
createMenu(){
  bM=createGraphics(this.wd, this.hg);
}

 drawUi(){
  push();
  bM.background(mainMenu);
  bM.strokeWeight(10)
  bM.fill(0);
  bM.textAlign(CENTER, CENTER);
  bM.textSize(24);
  bM.text("Notifications",this.wd*0.525,this.hg*0.15);
  bM.text("welcome",this.wd*0.85,this.hg*0.3);
  bM.text(this.text, this.wd*0.85, this.hg*0.4);
  imageMode(CENTER)
  image(bM, width * 0.5, height*0.88);
  pop();
 }

}

