
let iV;
let invButtons = [];


function createInv(){
invSrc = new inventoryScreen(canvasWidth,canvasHeight*0.76)
invSrc.create();
};

function drawInv(){
invSrc.draw();
for (let i = 0; i < numberButtons; i++) {
  Buttons[i].drawButton();
  Buttons[i].shine();
};
};

class inventoryScreen{
constructor(w,h){
  this.w = w;
  this.h = h;
 
}

create(){
  iV = createGraphics(this.w, this.h);
  
  if (inventory.length > 0){ 
    for(let i = 0; i < inventory.length; i++) {
    invButtons[i] = new invButton(this.w/24, (this.h *0.09 * i) + this.h *0.18  ,  this.w*0.2917,  this.h/12, inventory[i].item_name,"orange",inventory[i].quantity,inventory[i].item_description);
    
  }}

}

draw(){
  iV.background(BackgroundImages[1]);
  iV.strokeWeight(3); 
  if(inventory.length > 0){  
    for(let i = 0; i < inventory.length; i++) {
    invButtons[i].draw();
    invButtons[i].work();
  };
  push()
  iV.fill('yellow');
  iV.stroke(255, 204, 0);
  iV.strokeWeight(3);
  iV.fill('rgb(73, 161, 28)')
  iV.image(ButtonImages[0],this.w/24, this.h *0.09  ,  this.w*0.2917,  this.h/12);
  iV.image(ButtonImages[0],this.w/24 + this.w*0.2917, this.h *0.09  ,  (this.w*0.2917)/4,  this.h/12)
  iV.textSize(24);
  iV.fill("black");
  iV.noStroke();
  iV.textAlign(CENTER);
  iV.text("Item Name",this.w/24 + this.w*0.1463,this.h *0.16 );
  iV.text("Qt.",(this.w/24)*(8.75),this.h *0.16);
  pop()
} else{
    iV.strokeWeight(3)
    iV.fill('rgb(161,19,38)')
    iV.image(ButtonImages[6],canvasWidth*0.32,canvasHeight * 0.28);
    iV.fill("black")
    iV.noStroke()
    iV.textAlign(CENTER);
    iV.textSize(24);
    iV.text("No items in inventory",(this.w/2 ),(this.h/2));   
  }
  image(iV,0,0)
}

}


class invButton{
constructor(x,y,w,h,name,clr,qt,ds){
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.name = name;
  this.clr = clr;
  this.qt = qt;
  this.ds = ds;

}
draw(){
  push()
    iV.fill('yellow');
    iV.stroke(255, 204, 0);
    iV.strokeWeight(3);
    iV.fill(this.clr);
    iV.image(ButtonImages[0],this.x, this.y, this.w, this.h);
    iV.image(ButtonImages[0],this.x + this.w,this.y,this.w/4,this.h)
    iV.textSize(24);
    iV.fill("black");
    iV.noStroke();
    iV.textAlign(CENTER);
    iV.text(this.name, this.x + this.w / 2, this.y + this.h / 2);
    iV.text(this.qt,((this.x + this.w)+ this.w + this.w/3)/2,this.y +this.h/2);
    pop()
}


work(){
  if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
    push()
      iV.fill('yellow');
      iV.stroke(255, 204, 0);
      iV.strokeWeight(3);
      iV.fill('rgb(91, 203, 35)')
      iV.image(ButtonImages[0],this.x + this.w + (this.w*0.3),this.y,this.w*1.15,this.h)
      iV.fill("black");
      iV.noStroke();
      iV.text(this.ds, (this.x + this.w + (this.w*0.3))*1.4,this.y + this.h - 10);
    pop()

  } else {

  }
}


}


