let iM;

class item{
  constructor(itemId,item_description,item_name){
    this.itemId = itemId;
    this.item_description = item_description;
    this.item_name = item_name;
  };

};



class ButtonRed {
  constructor(px, py, w, h, clr, name) {

    this.px = px;
    this.py = py;
    this.w = w;
    this.h = h;
    this.clr = clr; 
    this.name = name;
    this.indexImage = 8;

  };
  drawButton() {
    fill('yellow');
    stroke(255, 204, 0);
    strokeWeight(3);
    fill(this.clr);
    image(ButtonImages[this.indexImage],this.px, this.py, this.w, this.h);
    fill('black');
    textSize(24);
    noStroke()
    textAlign(CENTER);
    text(this.name, this.px + this.w / 2, this.py + this.h / 2 + this.indexImage * 2);


  };
  shine() {
    if (mouseX > this.px && mouseX < this.px + this.w && mouseY > this.py && mouseY < this.py + this.h) {
      this.clr = 'rgb(212,27,52)'
      this.indexImage = 9;
    } else {
      this.clr = 'rgb(161,19,38)'
      this.indexImage = 8;
    }


  };
  work(){
    if(mouseX > this.px && mouseX < this.px + this.w && mouseY > this.py && mouseY < this.py + this.h && mouseIsPressed){
      GoToScreen(DUNGEON_SCREEN);
      if(characterswapObj){
        characterswapObj.killtextboxfunc();
      }
      
      
    }
  };
};

class ButtonLogout {
  constructor(px, py, w, h, clr, name) {

    this.px = px;
    this.py = py;
    this.w = w;
    this.h = h;
    this.clr = clr;
    this.name = name;
    this.indexImage = 2;

  };
  drawButton() {
    fill('yellow');
    stroke(255, 204, 0);
    strokeWeight(3);
    fill(this.clr);
    image(ButtonImages[this.indexImage],this.px, this.py, this.w, this.h);
    fill('black');
    textSize(24);
    noStroke()
    textAlign(CENTER);
    text(this.name, this.px + this.w / 2, this.py + this.h / 2 +  this.indexImage * 5);


  };
  shine() {
    if (mouseX > this.px && mouseX < this.px + this.w && mouseY > this.py && mouseY < this.py + this.h) {
      this.clr = 'rgb(148,23,162)'
      this.indexImage = 3;
    } else {
      this.clr = 'rgb(100,15,110)'
      this.indexImage = 2;
    }


  };
  work(){
    if(mouseX > this.px && mouseX < this.px + this.w && mouseY > this.py && mouseY < this.py + this.h && mouseIsPressed){
      remove();
      if(characterswapObj){
        characterswapObj.killtextboxfunc();
      }
      
      
    }
  
  };

}



class ButtonBlue {
  constructor(px, py, w, h, clr, name) {

    this.px = px;
    this.py = py;
    this.w = w;
    this.h = h;
    this.clr = clr;
    this.name = name;
    this.indexImage = 8;

  };
  drawButton() {
    fill('yellow');
    stroke(255, 204, 0);
    strokeWeight(3);
    fill(this.clr)
    image(ButtonImages[this.indexImage],this.px, this.py, this.w, this.h);
    fill('black')
    textSize(24);
    noStroke();
    textAlign(CENTER);
    text(this.name, this.px + this.w / 2, this.py + this.h / 2 + this.indexImage * 2);


  };
  shine() {
    if (mouseX > this.px && mouseX < this.px + this.w && mouseY > this.py && mouseY < this.py + this.h) {
      this.clr = 'rgb(23, 129, 210)'
      this.indexImage = 9;
    } else {
      this.clr = 'rgb(16, 87, 241)'
      this.indexImage = 8;
    }


  };
  work(){
    if(mouseX > this.px && mouseX < this.px + this.w && mouseY > this.py && mouseY < this.py + this.h && mouseIsPressed){
      GoToScreen(CHARACTER_SCREEN);
      if(characterswapObj){
        characterswapObj.killtextboxfunc();
      }
      
    }
  };

};





