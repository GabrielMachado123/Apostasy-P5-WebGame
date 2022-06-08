let buyButtons = [];
let sellButtons = [];
let mM;
let itemSquares = [];
let postScreenButtons = [];
let pM;
let pmButtons = [];
let itemSelection = 0;
let itemSelectionS = 0;
let press = false;
let quantityBuy = 0;
let quantitySold = 0;
let quantityTrade = 0;
let pItemSelectionS = 0;
let pItemSelection = 0;
let pQuantitySold = 0;
let pQuantityWanting = 0;
let pQuantityTrade = 0;
let SellButtonClickedId;
let sellScrolling = 0;
let buyScrolling = 0;
let PostTradeAlert = false;
let PostTradeAlert2 = false;





function createPostScreen(){
 post_screen = new postScreen(canvasWidth,canvasHeight * 0.76);
 post_screen.create();

};

function drawPostScreen(){
post_screen.drawBase();
for (let i = 0; i < numberButtons; i++) {
  Buttons[i].drawButton();
  Buttons[i].shine();
};
};




function createMarketScreen(){
    markMenu = new basicMarketUi(canvasWidth,canvasHeight*0.76);
    markMenu.createMenu();

};


function drawMarket(){
    markMenu.draw();
    postTrade.drawButton();
    postTrade.shine();
    
    for (let i = 0; i < items.length; i++){
    buyButtons[i].drawButton();
    buyButtons[i].shine();
    };
    
    for (let i = 0; i < items.length; i++){
      sellButtons[i].drawButton();
      sellButtons[i].shine();
      };
  
    for (let i = 0; i < numberButtons; i++) {
      Buttons[i].drawButton();
      Buttons[i].shine();
    };
  };

  

function marketScreenSetup(){
    postTrade = new ButtonGreen(canvasWidth*0.542, canvasHeight*0.6, canvasWidth*0.2, canvasHeight*0.075, 'anything','Post trade');
  
}

function createBuyButtons(){
  for(let i = 0; i < items.length; i++) {
  buyButtons[i] = new BuyButtom((canvasWidth/24)*6.5, canvasHeight*0.0684 * (i+2), canvasWidth*0.0717, canvasHeight/16, i + 1 );
  sellButtons[i] = new SellButtom((canvasWidth/24)*8.3, canvasHeight*0.0684 * (i+2), canvasWidth*0.0717, canvasHeight/16, i + 1 );
};
    
}

class basicMarketUi {
  constructor(w,h){
    this.w = w; 
    this.h = h;
  };
  createMenu(){
    mM = createGraphics(this.w, this.h);
    marketScreenSetup();
    createBuyButtons();
    
      for(let i = 0; i < items.length; i++) {
      itemSquares[i] = new squareForItems(this.w/24, (this.h *0.09 * i) + this.h *0.18  ,  this.w*0.225,  this.h/12, items[i].item_name,"green");
      };
    
    mM.background(BackgroundImages[0]);

  }

  draw() {
  push();
  mM.strokeWeight(3);
    for(let i = 0; i < items.length; i++) {
   itemSquares[i].draw();
   
    };
  mM.fill('yellow');
  mM.stroke(255, 204, 0);
  mM.strokeWeight(1);
  mM.fill('rgb(73, 161, 28)');    
  mM.image(ButtonImages[2],this.w/24,this.h *0.09,this.w*0.225,this.h/12);
  mM.image(ButtonImages[2],this.w/24+this.w*0.225+(this.w*0.0045),this.h *0.09,this.w*0.148,this.h/12);
  mM.fill(0);
  mM.noStroke();
  mM.textSize(24);
  mM.text("Item Name",(this.w/24)+this.w *0.1,this.h *0.15);
  pop();
  image(mM,0,0);

};
};


class ButtonGreen {
  constructor(px, py, w, h, clr, name) {

    this.px = px;
    this.py = py;
    this.w = w;
    this.h = h;
    this.clr = clr;
    this.name = name;
    this.ButtonImageIndex = 2;

  }
  drawButton() {
    fill('yellow');
    stroke(255, 204, 0);
    strokeWeight(3);
    fill(this.clr);
    image(ButtonImages[this.ButtonImageIndex],this.px, this.py, this.w, this.h);
    fill('black');
    textSize(24);
    noStroke()
    textAlign(CENTER);
    text(this.name, this.px + this.w / 2, this.py + this.h / 2 + this.ButtonImageIndex * 5);
  }


  drawButton2(){
    pM.fill('yellow');
    pM.stroke(255, 204, 0);
    pM.strokeWeight(3);
    pM.fill(this.clr);
    pM.image(ButtonImages[this.ButtonImageIndex],this.px, this.py, this.w, this.h);
    pM.fill('black');
    pM.textSize(24);
    pM.noStroke()
    pM.textAlign(CENTER);
    pM.text(this.name, this.px + this.w / 2, this.py + this.h / 2 + this.ButtonImageIndex * 5);

  }
  drawButton3(){
    buyM.fill('yellow');
    buyM.stroke(255, 204, 0);
    buyM.strokeWeight(3);
    buyM.fill(this.clr);
    buyM.image(ButtonImages[this.ButtonImageIndex],this.px, this.py, this.w, this.h);
    buyM.fill('black');
    buyM.textSize(24);
    buyM.noStroke()
    buyM.textAlign(CENTER);
    buyM.text(this.name, this.px + this.w / 2, this.py + this.h / 2 + this.ButtonImageIndex * 5);

  }

  drawButton6(){
    buyM.fill('yellow');
    buyM.stroke(255, 204, 0);
    buyM.strokeWeight(3);
    buyM.fill(this.clr);
    buyM.image(ButtonImages[7],this.px, this.py, this.w, this.h);

  }
  
  drawButton10(){
    pM.fill('yellow');
    pM.stroke(255, 204, 0);
    pM.strokeWeight(3);
    pM.fill(this.clr);
    pM.image(ButtonImages[7],this.px, this.py, this.w, this.h);

  }

  drawButton7(){
    sellM.fill('yellow');
    sellM.stroke(255, 204, 0);
    sellM.strokeWeight(3);
    sellM.fill(this.clr);
    sellM.image(ButtonImages[7],this.px, this.py, this.w, this.h);

  }


  drawButton4(){
    sellM.fill('yellow');
    sellM.stroke(255, 204, 0);
    sellM.strokeWeight(3);
    sellM.fill(this.clr);
    sellM.image(ButtonImages[this.ButtonImageIndex+2],this.px, this.py, this.w, this.h);
    sellM.fill('black');
    sellM.textSize(24);
    sellM.noStroke()
    sellM.textAlign(CENTER);
    sellM.text(this.name, this.px + this.w / 2, this.py + this.h / 2 + this.ButtonImageIndex * 5);

  }
  drawButton5(){
    sellM.fill('yellow');
    sellM.stroke(255, 204, 0);
    sellM.strokeWeight(3);
    sellM.fill(this.clr);
    sellM.image(ButtonImages[this.ButtonImageIndex],this.px, this.py, this.w, this.h);
    sellM.fill('black');
    sellM.textSize(24);
    sellM.noStroke()
    sellM.textAlign(CENTER);
    sellM.text(this.name, this.px + this.w / 2, this.py + this.h / 2 + this.ButtonImageIndex * 5);

  }
  CloseAlerts(){
    if(mouseX > this.px && mouseX < this.px + this.w && mouseY > this.py && mouseY < this.py + this.h){
      buyConfirmationAlert = false;
      notEnoughtItemsBuyAlert = false;
      sellConfirmationAlert = false;
      notEnoughtItemsSellAlert = false;
      PostTradeAlert = false;
      PostTradeAlert2 = false;

    }
  }

  UpSell(){
    if(mouseX > this.px && mouseX < this.px + this.w && mouseY > this.py && mouseY < this.py + this.h){
     if(sQuantityPostedTrades > 7 && indexScroll != 0 ){
      indexScroll --;
      console.log(indexScroll);
      sell_screen.RecriateMenu();
     }  
    }
  }

  DownSell(){
    if(mouseX > this.px && mouseX < this.px + this.w && mouseY > this.py && mouseY < this.py + this.h ){
      if(sQuantityPostedTrades > 7 && indexScroll < sQuantityPostedTrades - 8){
        
        indexScroll ++;
        console.log(indexScroll);
        sell_screen.RecriateMenu();
       }    
    }
  }

  UpBuy(){
    if(mouseX > this.px && mouseX < this.px + this.w && mouseY > this.py && mouseY < this.py + this.h){
     if(bQuantityPostedTrades > 7 && indexScrollB != 0 ){
      indexScrollB --;
      buy_screen.RecriateMenu();
     }  
    }
  }

  DownBuy(){
    if(mouseX > this.px && mouseX < this.px + this.w && mouseY > this.py && mouseY < this.py + this.h ){
      if(bQuantityPostedTrades > 7 && indexScrollB < bQuantityPostedTrades - 8){
        
        indexScrollB ++;
        buy_screen.RecriateMenu();
       }    
    }
  }

  shine() {
    if (mouseX > this.px && mouseX < this.px + this.w && mouseY > this.py && mouseY < this.py + this.h) {
      this.clr = 'rgb(91, 203, 35)'
      this.ButtonImageIndex = 3;
    } else {
      this.clr = 'rgb(73, 161, 28)'
      this.ButtonImageIndex = 2;
    }


  }


  confirmS(){if(mouseX > this.px && mouseX < this.px + this.w && mouseY > this.py && mouseY < this.py + this.h ){
    confirmSell();
  }

  }

  work(){
    if(mouseX > this.px && mouseX < this.px + this.w && mouseY > this.py && mouseY < this.py + this.h){
      GoToScreen(MARKET_SCREEN);
      indexScroll = 0;
      arrayAuxS = [];
      indexScrollB = 0;
      arrayAuxB = [];
      if(characterswapObj){
        characterswapObj.killtextboxfunc();
      }
    }
  }


postTrade(){
  if(mouseX > this.px && mouseX < this.px + this.w && mouseY > this.py && mouseY < this.py + this.h ){
    GoToScreen(POST_SCREEN);
    
  }
}
 
fowardArrow(){
  if(mouseX > this.px && mouseX < this.px + this.w && mouseY > this.py && mouseY < this.py + this.h  && itemSelection < items.length -1){
  
  itemSelection ++;
  console.log(itemSelection)
  }
}

fowardArrowS(){
  if(mouseX > this.px && mouseX < this.px + this.w && mouseY > this.py && mouseY < this.py + this.h  && itemSelectionS < items.length -1){
  itemSelectionS ++;
  console.log(itemSelectionS)
  }
}

backArrowS(){
  if(mouseX > this.px && mouseX < this.px + this.w && mouseY > this.py && mouseY < this.py + this.h  && itemSelectionS > 0 ){
  
  itemSelectionS --;
  console.log(itemSelectionS)

  }
}


backArrow(){
  if(mouseX > this.px && mouseX < this.px + this.w && mouseY > this.py && mouseY < this.py + this.h  && itemSelection > 0 ){
  
  itemSelection --;
  console.log(itemSelection)
  }
}

increaseQt(){
  if(mouseX > this.px && mouseX < this.px + this.w && mouseY > this.py && mouseY < this.py + this.h ){ 
    quantityBuy ++;
    console.log(quantityBuy);
    
  }
}

decreaseQt(){
  if(mouseX > this.px && mouseX < this.px + this.w && mouseY > this.py && mouseY < this.py + this.h  && quantityBuy > 0){ 
    quantityBuy ++;
    console.log(quantityBuy);
    
  }
}

increaseQtS(){
  if(mouseX > this.px && mouseX < this.px + this.w && mouseY > this.py && mouseY < this.py + this.h ){ 
    quantitySold ++;
    console.log(quantitySold);
    
  }
}

decreaseQtS(){
  if(mouseX > this.px && mouseX < this.px + this.w && mouseY > this.py && mouseY < this.py + this.h && quantitySold > 0){ 
    quantitySold --;
    console.log(quantitySold);
    
  }
}

increaseQtT(){
  if(mouseX > this.px && mouseX < this.px + this.w && mouseY > this.py && mouseY < this.py + this.h ){ 
    quantityTrade ++;
    
  }
}

decreaseQtT(){
  if(mouseX > this.px && mouseX < this.px + this.w && mouseY > this.py && mouseY < this.py + this.h && quantityTrade > 0){ 
    quantityTrade --;
  }
}

addTrade(){
  if(mouseX > this.px && mouseX < this.px + this.w && mouseY > this.py && mouseY < this.py + this.h ){
    let player_sellingId_fk = playerId;
     let item_sellingId_fk = itemSelectionS + 1;
     let item_buyingId_fk = itemSelection + 1;
     let quantity_Selling = quantitySold;
     let quantity_Buying = quantityBuy;
     let quantity_Trade = quantityTrade;
     
     let playerTrade = {
      "player_sellingId_fk":player_sellingId_fk,  
      "item_sellingId_fk":item_sellingId_fk,
      "item_buyingId_fk":item_buyingId_fk,
      "quantity_Selling":quantity_Selling,
      "quantity_Buying":quantity_Buying,
      "quantity_Trade":quantity_Trade
     }
 
  httpPost('/trade','json',playerTrade,(dataReceived)=>{
    console.log(dataReceived);
    if(dataReceived.length < 1){
      PostTradeAlert = true;
      PostTradeAlert2 = false;
    }else if(dataReceived.length == 4) {
      PostTradeAlert = false;
      PostTradeAlert2 = true;
    }
      else{
      PostTradeAlert = false;
      PostTradeAlert2 = false;
      pItemSelectionS = dataReceived[0].item_sellingId_fk;
      pItemSelection = dataReceived[0].item_buyingId_fk;
      pQuantitySold = dataReceived[0].quantity_Selling;
      pQuantityWanting = dataReceived[0].quantity_Buying;
      pQuantityTrade = dataReceived[0].quantity_Trade;
      }
    console.log(PostTradeAlert);
    console.log(dataReceived);

  });

  itemSelection = 0;
  itemSelectionS = 0;
  quantityTrade = 0;
  quantityBuy = 0;
  quantitySold = 0;

  }
}

removeTrade(){
  if(mouseX > this.px && mouseX < this.px + this.w && mouseY > this.py && mouseY < this.py + this.h  && pQuantityTrade > 0 ){
    let player_sellingId_fk = playerId;

    let playerTrade = {
      "player_sellingId_fk":player_sellingId_fk,  
     }

     httpPost('/Rtrade','json',playerTrade,(dataReceived)=>{
     console.log(dataReceived)
    });
    pQuantityTrade = 0
  }
}

}



function DrawConfirmPostAlert(){
  if(PostTradeAlert == true){
    PostAlertBox(canvasWidth*0.2,canvasHeight*0.15,canvasWidth*0.5,canvasHeight*0.4);
    PostTextAlert("You dont have enought items for that trade",canvasWidth*0.45,canvasHeight*0.35,CENTER);
    pCloseButton1.drawButton10();
    pCloseButton1.shine();
  }
}

function DrawConfirmPostAlert2(){
  if(PostTradeAlert2 == true){
    PostAlertBox(canvasWidth*0.2,canvasHeight*0.15,canvasWidth*0.5,canvasHeight*0.4);
    PostTextAlert("You already have a posted trade",canvasWidth*0.45,canvasHeight*0.35,CENTER);
    pCloseButton2.drawButton10();
    pCloseButton2.shine();
  }
}


function PostAlertBox(x, y, w, h){
  pM.image(ButtonImages[6],x+2, y+2, w-4, h-4);
}


function PostTextAlert(content, x, y, align){
  pM.fill("black");
  pM.noStroke();
  pM.textAlign(align);
  pM.textSize(26);
  pM.text(content, x, y);
}


class squareForItems{
  constructor(x,y,w,h,name,clr){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.name = name;
    this.clr = clr;
    this.ButtonImageIndex = 2;
  
  }
  draw(){
    push()
      mM.image(ButtonImages[this.ButtonImageIndex],this.x, this.y, this.w, this.h);
      mM.textSize(24);
      mM.fill("black");
      mM.noStroke();
      mM.textAlign(CENTER);
      mM.text(this.name, this.x + this.w / 2, this.y + this.h / 2);
      pop()
  }
  
}

let pCloseButton1;
let pCloseButton2;


class postScreen{
  constructor(w,h){
    this.w = w;
    this.h = h;

  }

  create(){
    loadJSON('/getTrades/'+playerId,(dataReceived)=>{
      if(dataReceived.length > 0 ){
        console.log(dataReceived);
        pItemSelectionS = dataReceived[0].item_sellingId_fk;
        pItemSelection = dataReceived[0].item_buyingId_fk;
        pQuantitySold = dataReceived[0].quantity_Selling;
        pQuantityWanting = dataReceived[0].quantity_Buying;
        pQuantityTrade = dataReceived[0].quantity_Trade;
      }
    });
    pM = createGraphics(this.w, this.h);
    pmButtons[0] = new ButtonGreen(this.w/12 + (2*(this.w*0.225)) + ((this.w*0.2917)/4)*2 + this.w*0.005 + (this.w*0.2917)/2, this.h*0.27, (this.w*0.2917)/3, this.h/12, "green", "add");
    pmButtons[1] = new ButtonGreen(this.w/12 + (2*(this.w*0.225)) + ((this.w*0.2917)/4)*2 + this.w*0.005 + (this.w*0.2917)/2, this.h*0.18 * 3.5, (this.w*0.2917)/3, this.h/12, "green", "remove");
    pmButtons[2] = new ButtonGreen(this.w/12 + ((this.w*0.225)) , this.h*0.18 * 3.5 + this.h * 0.22, (this.w*0.2917)/3, this.h/12, "green","return");
    pmButtons[3] = new ButtonGreen(this.w/12 + (this.w*0.125) - (this.w*0.2917)/2.75 ,this.h * 0.36, (this.w*0.2917)/4, this.h/18, "green","<-");
    pmButtons[4] = new ButtonGreen(this.w/12 + (this.w*0.125) ,this.h * 0.36, (this.w*0.2917)/4, this.h/18, "green","->");
    pmButtons[5] = new ButtonGreen(this.w/12 + (this.w*0.125) +(this.w*0.2917)/3 ,this.h * 0.36, (this.w*0.2917)/4, this.h/18, "green","+");
    pmButtons[6] = new ButtonGreen(this.w/12 + (this.w*0.125) +(this.w*0.2917)/3 ,this.h * 0.38 + this.h/18, (this.w*0.2917)/4, this.h/18, "green","-");
    pmButtons[7] = new ButtonGreen(this.w/12 + (2*(this.w*0.225)) - (this.w*0.2917)/2.25 ,this.h * 0.36, (this.w*0.2917)/4, this.h/18, "green","<-");
    pmButtons[8] = new ButtonGreen(this.w/12 + (2*(this.w*0.215)) ,this.h * 0.36, (this.w*0.2917)/4, this.h/18, "green","->");
    pmButtons[9] = new ButtonGreen(this.w/12 + (this.w*0.125) +(this.w*0.2917)/3 + this.w*0.225 + this.w*0.225/3,this.h * 0.36, (this.w*0.2917)/4, this.h/18, "green","+");
    pmButtons[10] = new ButtonGreen(this.w/12 + (this.w*0.125) +(this.w*0.2917)/3 + this.w*0.225 + this.w*0.225/3,this.h * 0.38 + this.h/18, (this.w*0.2917)/4, this.h/18, "green","-");
    pmButtons[11] = new ButtonGreen(this.w/12 + (this.w*0.125) +(this.w*0.2917)/3 + this.w*0.225 + 2.5*(this.w*0.225/3),this.h * 0.36, (this.w*0.2917)/4, this.h/18, "green","+");
    pmButtons[12] = new ButtonGreen(this.w/12 + (this.w*0.125) +(this.w*0.2917)/3 + this.w*0.225 + 2.5*(this.w*0.225/3),this.h * 0.38 + this.h/18, (this.w*0.2917)/4, this.h/18, "green","-");
    pCloseButton1 = new ButtonGreen(canvasWidth*0.26,canvasHeight * 0.23,canvasWidth*0.1/3,canvasHeight*0.08/3, "green","Close");
    pCloseButton2 = new ButtonGreen(canvasWidth*0.26,canvasHeight * 0.23,canvasWidth*0.1/3,canvasHeight*0.08/3, "green","Close");
  }
  drawBase(){
    push()
    pM.background(BackgroundImages[0]);
    for(let i = 0; i < 13; i++) {
    pmButtons[i].drawButton2();
    pmButtons[i].shine();
  };
  
    pM.fill('yellow');
    pM.stroke(255, 204, 0);
    pM.strokeWeight(3);
    pM.fill("green");
    // new trades rect
    pM.image(ButtonImages[2],(this.w/12) * 3, this.h*0.09, this.w*0.225, this.h/12);
    pM.image(ButtonImages[2],this.w/12, this.h*0.27, this.w*0.225, this.h/12);
    pM.image(ButtonImages[2],this.w/12 + (this.w*0.225),this.h*0.27,(this.w*0.2917)/4,this.h/12);
    pM.image(ButtonImages[2],this.w/12 + (this.w*0.225) + ((this.w*0.2917)/4),this.h*0.27, this.w*0.225,this.h/12 );
    pM.image(ButtonImages[2],this.w/12 + (2*(this.w*0.225)) + ((this.w*0.2917)/4),this.h*0.27, (this.w*0.2917)/4,this.h/12);
    pM.image(ButtonImages[2],this.w/12, this.h*0.18, this.w*0.225, this.h/12);
    pM.image(ButtonImages[2],this.w/12 + (this.w*0.225),this.h*0.18,(this.w*0.2917)/4,this.h/12);
    pM.image(ButtonImages[2],this.w/12 + (this.w*0.225) + ((this.w*0.2917)/4),this.h*0.18, this.w*0.225,this.h/12 );
    pM.image(ButtonImages[2],this.w/12 + (2*(this.w*0.225)) + ((this.w*0.2917)/4),this.h*0.18, (this.w*0.2917)/4,this.h/12);
    pM.image(ButtonImages[2],this.w/12 + (2*(this.w*0.225)) + (2*(this.w*0.2917)/4),this.h*0.18, (this.w*0.2917)/2,this.h/12);
    pM.image(ButtonImages[2],this.w/12 + (2*(this.w*0.225)) + (2*(this.w*0.2917)/4),this.h*0.27, (this.w*0.2917)/2,this.h/12);
    
   //your trades rect
    pM.image(ButtonImages[2],(this.w/12) * 3, this.h*0.09 * 6, this.w*0.225, this.h/12);
    pM.image(ButtonImages[2],this.w/12, this.h*0.18 * 3.5, this.w*0.225, this.h/12);
    pM.image(ButtonImages[2],this.w/12 + (this.w*0.225),this.h*0.18 * 3.5,(this.w*0.2917)/4,this.h/12);
    pM.image(ButtonImages[2],this.w/12 + (this.w*0.225) + ((this.w*0.2917)/4),this.h*0.18 * 3.5, this.w*0.225,this.h/12 );
    pM.image(ButtonImages[2],this.w/12 + (2*(this.w*0.225)) + ((this.w*0.2917)/4),this.h*0.18 * 3.5, (this.w*0.2917)/4,this.h/12);
    pM.image(ButtonImages[2],(this.w/12) * 3, this.h*0.09 * 6, this.w*0.225, this.h/12);
    pM.image(ButtonImages[2],this.w/12, this.h*0.18 * 3.5 + this.h * 0.09, this.w*0.225, this.h/12);
    pM.image(ButtonImages[2],this.w/12 + (this.w*0.225),this.h*0.18 * 3.5 + this.h * 0.09,(this.w*0.2917)/4,this.h/12);
    pM.image(ButtonImages[2],this.w/12 + (this.w*0.225) + ((this.w*0.2917)/4),this.h*0.18 * 3.5 + this.h * 0.09, this.w*0.225,this.h/12 );
    pM.image(ButtonImages[2],this.w/12 + (2*(this.w*0.225)) + ((this.w*0.2917)/4),this.h*0.18 * 3.5 + this.h * 0.09, (this.w*0.2917)/4,this.h/12);
    pM.image(ButtonImages[2],this.w/12 + (2*(this.w*0.225)) + (2*(this.w*0.2917)/4),this.h*0.18 * 3.5, (this.w*0.2917)/2,this.h/12);
    pM.image(ButtonImages[2],this.w/12 + (2*(this.w*0.225)) + (2*(this.w*0.2917)/4),this.h*0.18 * 3.5 + this.h * 0.09, (this.w*0.2917)/2,this.h/12);
    pM.textSize(24);
    pM.fill("black");
    pM.noStroke();
    pM.textAlign(CENTER);
    //item selected
    pM.text(items[itemSelection].item_name,this.w/12 + this.w*0.1125,this.h *0.33 );
    pM.text(quantityBuy,(this.w/12)+(this.w*0.245),this.h *0.33);
    // item sold
    pM.text(items[itemSelectionS].item_name,this.w/12 + this.w*0.1125 + 4*((this.w*0.2917)/4),this.h *0.33 );
    pM.text(quantitySold,(this.w/12)+(this.w*0.55),this.h *0.33);
    // trade qt.
    pM.text(quantityTrade,(this.w/12)+(this.w*0.67),this.h *0.33);
    // new trades text
    pM.text("New Trade",(this.w/12) * 3 + this.w*0.1125,this.h *0.15 );
    pM.text("Item Wanted",this.w/12 + this.w*0.1125,this.h *0.24 );
    pM.text("Qt.",(this.w/12)+(this.w*0.245),this.h *0.24);
    pM.text("Item Sold",this.w/12 + this.w*0.1125 + 4*((this.w*0.2917)/4),this.h *0.24 );
    pM.text("Qt.",(this.w/12)+(2*(this.w*0.245))+(this.w*0.2917)/4,this.h *0.24);
    pM.text("Trade Qt.",(this.w/12)+(2*(this.w*0.245))+(2.5*(this.w*0.2917)/4),this.h *0.24);
    
    // your trades text
    pM.text("Your Trade Offers",(this.w/12) * 3 + this.w*0.1125,this.h *0.155 *3.75 );
    pM.text("Item Wanted",this.w/12 + this.w*0.1125,this.h *0.155 *4.35 );
    pM.text("Qt.",(this.w/12)+(this.w*0.245),this.h *0.155 *4.35);
    pM.text("Item Sold",this.w/12 + this.w*0.1125 + 4*((this.w*0.2917)/4),this.h *0.155 *4.35);
    pM.text("Qt.",(this.w/12)+(2*(this.w*0.245))+(this.w*0.2917)/4,this.h *0.155 *4.35);
    pM.text("Trade Qt.",(this.w/12)+(2*(this.w*0.245))+(2.5*(this.w*0.2917)/4),this.h *0.155 *4.35);

    // your trade offers item wanted
    
    if(pQuantityTrade > 0){
      pM.text(items[pItemSelection - 1].item_name,this.w/12 + this.w*0.1125,this.h *0.155 *4.9 );
      pM.text(pQuantityWanting,(this.w/12)+(this.w*0.245),this.h *0.155 *4.9);
      pM.text(items[pItemSelectionS - 1].item_name,this.w/12 + this.w*0.1125 + 4*((this.w*0.2917)/4),this.h *0.155 *4.9);
      pM.text(pQuantitySold,(this.w/12)+(2*(this.w*0.245))+(this.w*0.2917)/4,this.h *0.155 *4.9);
      pM.text(pQuantityTrade,(this.w/12)+(2*(this.w*0.245))+(2.5*(this.w*0.2917)/4),this.h *0.155 *4.9);
    }

    DrawConfirmPostAlert();
    DrawConfirmPostAlert2();

    image(pM,0,0);
    pop()
  }
  
}


class BuyButtom{
  constructor(x,y,w,h,bI){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.bI = bI;
    this.clr = "green";
    this.ButtonImageIndex = 2;

  }
  drawButton(){
    mM.fill('yellow');
    mM.stroke(255, 204, 0);
    mM.strokeWeight(1);
    mM.fill(this.clr);
    mM.image(ButtonImages[this.ButtonImageIndex],this.x, this.y, this.w, this.h);
    mM.fill('black');
    mM.textSize(24);
    mM.noStroke()
    mM.textAlign(CENTER);
    mM.text("Buy", this.x + this.w / 2, this.y + this.h / 2 + this.ButtonImageIndex * 4);

  }

  shine() {
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.clr = 'rgb(91, 203, 35)'
      this.ButtonImageIndex = 3;
    } else {
      this.clr = 'rgb(73, 161, 28)'
      this.ButtonImageIndex = 2;
    }
  }

  buy(){
    if(mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h ){
      buyButtonClickedId = this.bI;
      GoToScreen(BUY_SCREEN);    
      console.log(buyButtonClickedId);
    };
  }


}


class SellButtom{
  constructor(x,y,w,h,bI){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.bI = bI;
    this.clr = "green";
    this.ButtonImageIndex = 2;
  }
  drawButton(){
    mM.fill('yellow');
    mM.stroke(255, 204, 0);
    mM.strokeWeight(1);
    mM.fill(this.clr);
    mM.image(ButtonImages[this.ButtonImageIndex],this.x, this.y, this.w, this.h);
    mM.fill('black');
    mM.textSize(24);
    mM.noStroke()
    mM.textAlign(CENTER);
    mM.text("Sell", this.x + this.w / 2, this.y + this.h / 2 + this.ButtonImageIndex * 5);

  }

  shine() {
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.clr = 'rgb(91, 203, 35)'
      this.ButtonImageIndex = 3;
    } else {
      this.clr = 'rgb(73, 161, 28)'
      this.ButtonImageIndex = 2;
    }
  }

  sell(){
    if(mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h){
      SellButtonClickedId = this.bI;
      GoToScreen(SELL_SCREEN);
      console.log("yes");
  
    }
  }

}






class ButtonConfirmB{
  constructor(x,y,w,h,clr,name,bI){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.bI = bI;
    this.clr = clr;
    this.name = name;
    this.indexImage = 2;
  }
  drawButton(){
    buyM.fill('yellow');
    buyM.stroke(255, 204, 0);
    buyM.strokeWeight(1);
    buyM.fill(this.clr);
    buyM.image(ButtonImages[this.indexImage],this.x, this.y, this.w, this.h);
    buyM.fill('black');
    buyM.textSize(24);
    buyM.noStroke()
    buyM.textAlign(CENTER);
    buyM.text(this.name, this.x + this.w / 2, this.y + this.h / 2 + this.indexImage * 5);

  }

  shine() {
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.clr = 'rgb(91, 203, 35)'
      this.indexImage = 3;
    } else {
      this.clr = 'rgb(73, 161, 28)'
      this.indexImage = 2;
    }
  }

  confirm(){if(mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h ){
    confirmBuy(this.bI);
    console.log("confirmed");
  }

  }
 
}



function createBuyScreen(){
  buy_screen = new buyMenu(canvasWidth,canvasHeight * 0.76,buyButtonClickedId);
  buy_screen.createMenu();


}

function drawBuyScreen(){
  buy_screen.drawMenu();
  for (let i = 0; i < numberButtons; i++) {
    Buttons[i].drawButton();
    Buttons[i].shine();
  };
   
 

}

let buyM;
let bPostedTrades = [];
let bPlayer_sellingId_fk = [];
let bItemWanted = [];
let bQuantitySelling = [];
let bQuantityWanted = [];
let bQuantityTrade = [];
let bQuantityPostedTrades;
let bReturn;
let confirmBuyButtoms = [];
let arrayAuxB = [];
let indexScrollB = 0;
let bUpButton;
let bDownButton;
let bCloseButton1;
let bCloseButton2;

class buyMenu{
  constructor(w,h,bI){
    this.w = w;
    this.h = h;
    this.bI = bI;

  }
  RecriateMenu(){
    arrayAuxB = [];
    let j = indexScrollB;
    for(let i = 0; i < 8; i++) {
      arrayAuxB[i] = new bPostedTrade(this.w*0.125, (this.h *0.09 * (i +2)),  this.w*0.2,  this.h*0.09,bPostedTrades[j].itemS,bPostedTrades[j].itemSQ,bPostedTrades[j].itemW,bPostedTrades[j].itemWQ,bPostedTrades[j].tradeQ);
      confirmBuyButtoms[i] = new ButtonConfirmB((this.w*0.8), this.h*0.09 * (i+2), this.w*0.075, this.h*0.09, "green", "confirm",i); 
      if(j < bPostedTrades.length - 1){
        j++;
      }
    }  
  }
createMenu(){
  buyM = createGraphics(this.w,this.h);
  bReturn = new ButtonGreen(this.w/12 + (1.5*(this.w*0.225)) , this.h*0.18 * 3.5 + this.h * 0.28, (this.w*0.2917)/3, this.h/12, "green","return");
  bUpButton = new ButtonGreen((this.w*0.9), this.h*0.09 * 2, this.w*0.075, this.h*0.18, "green","Up");
  bDownButton = new ButtonGreen((this.w*0.9), this.h*0.09 * 2 +(this.h*0.18), this.w*0.075, this.h*0.18, "green","Down");
  bCloseButton1 = new ButtonGreen(canvasWidth*0.26,canvasHeight * 0.23,canvasWidth*0.1/3,canvasHeight*0.08/3, "green","Close");
  bCloseButton2 = new ButtonGreen(canvasWidth*0.26,canvasHeight * 0.23,canvasWidth*0.1/3,canvasHeight*0.08/3, "green","Close");

  loadJSON('/getbPostedTrades/'+this.bI+'/'+playerId,(dataReceived)=>{
    if(dataReceived.length <1 ){
      console.log("no trades")
      bPlayer_sellingId_fk = [];
      bItemWanted = [];
      bQuantitySelling = [];
      bQuantityWanted = [];
      bQuantityTrade = [];
      bQuantityPostedTrades = 0;
     }
     else{
      console.log(dataReceived)
      bQuantityPostedTrades = dataReceived.length;
      for(let i = 0; i < bQuantityPostedTrades; i++) {
      bPlayer_sellingId_fk[i] = dataReceived[i].player_sellingId_fk;
      bItemWanted[i] = dataReceived[i].item_buyingId_fk;
      bQuantitySelling[i] = dataReceived[i].quantity_Selling;
      bQuantityWanted[i] = dataReceived[i].quantity_Buying;
      bQuantityTrade[i] = dataReceived[i].quantity_Trade;
    }
      console.log(bItemWanted);
      console.log(bQuantityPostedTrades);

      for(let i = 0; i < bQuantityPostedTrades; i++) {
        bPostedTrades[i] = new bPostedTrade(this.w*0.125, (this.h *0.09 * (i +2)),  this.w*0.2,  this.h*0.09,items[this.bI - 1].item_name,bQuantitySelling[i],items[bItemWanted[i] - 1].item_name,bQuantityWanted[i],bQuantityTrade[i]);
        confirmBuyButtoms[i] = new ButtonConfirmB((this.w*0.8), this.h*0.09 * (i+2), this.w*0.075, this.h*0.09, "green", "confirm",i);
      }   
      console.log(confirmBuyButtoms);
          
      this.RecriateMenu();

     };
  });
 
  
}

drawMenu(){
  push()
  buyM.background(BackgroundImages[0]);
  buyM.fill('yellow');
  buyM.stroke(255, 204, 0);
  buyM.strokeWeight(3);
  buyM.fill("green");
  //item sold rect
  buyM.image(ButtonImages[2],(this.w*0.125), this.h*0.09, this.w*0.2, this.h*0.09);
  //item sold qt rect 
  buyM.image(ButtonImages[2],(this.w*0.3250), this.h*0.09, this.w*0.075, this.h*0.09);
  //item wanted rect
  buyM.image(ButtonImages[2],(this.w*0.4), this.h*0.09, this.w*0.2, this.h*0.09);
  //item wanted qt rect
  buyM.image(ButtonImages[2],(this.w*0.575), this.h*0.09, this.w*0.075, this.h*0.09);
  //trade quantity rect
  buyM.image(ButtonImages[2],(this.w*0.65), this.h*0.09, this.w*0.15, this.h*0.09);
  buyM.image(ButtonImages[2],(this.w*0.8), this.h*0.09, this.w*0.075, this.h*0.09)


  buyM.textSize(24);
  buyM.fill("black");
  buyM.noStroke();
  buyM.textAlign(CENTER);
  //base menu text
  buyM.text("You Get", this.w*0.22,  this.h *0.13);
  buyM.text("Qt.", this.w*0.365, this.h *0.13);
  buyM.text("They Get",this.w*0.49, this.h *0.13);
  buyM.text("Qt.",this.w*0.61, this.h *0.13);
  buyM.text("trade Qt.",this.w*0.72, this.h *0.13);
  //posted trades
  if(bQuantityPostedTrades > 8){
    for(let i = 0; i < 8; i++) {
      arrayAuxB[i].draw();
      confirmBuyButtoms[i].drawButton();
      confirmBuyButtoms[i].shine();
      };
  }else{
    for(let i = 0; i < bQuantityPostedTrades; i++) {
      arrayAuxB[i].draw();
      confirmBuyButtoms[i].drawButton();
      confirmBuyButtoms[i].shine();
      };
  }
   
   
   bReturn.drawButton3();
   bReturn.shine(); 

   bUpButton.drawButton3();
   bUpButton.shine();

   bDownButton.drawButton3();
   bDownButton.shine();

   DrawNotEnoughtItemsAlert();
   DrawConfirmBuyAlert();

  image(buyM,0,0);
  pop()

}

}

class bPostedTrade{
  constructor(x,y,w,h,itemS,itemSQ,itemW,itemWQ,tradeQ,id){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.itemS = itemS;
    this.itemSQ = itemSQ;
    this.itemW = itemW;
    this.itemWQ = itemWQ;
    this.tradeQ = tradeQ;
    this.id = id;
  
  }
  
  draw(){
    push()
      buyM.fill('yellow');
      buyM.stroke(255, 204, 0);
      buyM.strokeWeight(3);
      buyM.fill("green");
      //item selling
      buyM.image(ButtonImages[2],this.x, this.y, this.w, this.h);
      //item selling qt
      buyM.image(ButtonImages[2],this.x + this.w , this.y, this.w*0.375, this.h);
      //item wanted
      buyM.image(ButtonImages[2],this.x + this.w + this.w*0.375,this.y,this.w*0.875,this.h);
      //item wanted qt
      buyM.image(ButtonImages[2],this.x + ( this.w)+(this.w*0.875) + (this.w*0.375),this.y,this.w*0.375,this.h);
      //trade qt
      buyM.image(ButtonImages[2],this.x + (this.w)+(this.w*0.875) + (2 * this.w*0.375),this.y,this.w*0.75,this.h);
      //empty rec
      buyM.image(ButtonImages[2],this.x + (this.w)+(this.w*0.875)+ this.w*0.75  + (2 * this.w*0.375),this.y,this.w*0.37,this.h);

      buyM.textSize(24);
      buyM.fill("black");
      buyM.noStroke();
      buyM.textAlign(CENTER);
      //item selling
      buyM.text(this.itemS, this.x + this.w / 2, this.y + this.h / 2);
      //item selling qt
      buyM.text(this.itemSQ, this.x + this.w / 2 + this.w*0.7, this.y + this.h / 2);
      //item wanted  
      buyM.text(this.itemW, this.x + this.w / 2 + this.w +this.w*0.375, this.y + this.h / 2);
      //item wanted qt
      buyM.text(this.itemWQ, this.x + this.w / 2 + this.w +this.w*0.375+this.w*0.55, this.y + this.h / 2);
      //trade qt
      buyM.text(this.tradeQ, this.x + this.w / 2 + this.w +(1.35*this.w*0.375)+this.w, this.y + this.h / 2);
      pop()
  }
  
}
let buyConfirmationAlert = false;
let notEnoughtItemsBuyAlert = false;

function DrawConfirmBuyAlert(){
  if(buyConfirmationAlert == true){
    BuyAlertBox(canvasWidth*0.2,canvasHeight*0.15,canvasWidth*0.5,canvasHeight*0.4);
    BuyTextAlert("Your Trade has been complete",canvasWidth*0.45,canvasHeight*0.35,CENTER);
    bCloseButton1.drawButton6();
    bCloseButton1.shine();
  }
}

function DrawNotEnoughtItemsAlert(){
  if(notEnoughtItemsBuyAlert == true){
    BuyAlertBox(canvasWidth*0.2,canvasHeight*0.15,canvasWidth*0.5,canvasHeight*0.4);
    BuyTextAlert("You dont have enought items to sell",canvasWidth*0.45,canvasHeight*0.35,CENTER);
    bCloseButton2.drawButton6();
    bCloseButton2.shine();
  }
}


function BuyAlertBox(x, y, w, h){
  buyM.image(ButtonImages[6],x+2, y+2, w-4, h-4);
}


function BuyTextAlert(content, x, y, align){
  buyM.fill("black");
  buyM.noStroke();
  buyM.textAlign(align);
  buyM.textSize(26);
  buyM.text(content, x, y);
}

function confirmBuy(i){
     let player_sellingId_fk = bPlayer_sellingId_fk[i];
     let item_sellingId_fk = bItemWanted[i];
     let item_buyingId_fk = items[buyButtonClickedId-1].itemId;
     let quantity_Selling = bQuantityWanted[i];
     let quantity_Buying = bQuantitySelling[i];
     let quantity_Trade = bQuantityTrade[i];
     let playerBuying = playerId;
     
     let playerTrade = {
      "player_sellingId_fk":player_sellingId_fk,  
      "item_sellingId_fk":item_sellingId_fk,
      "item_buyingId_fk":item_buyingId_fk,
      "quantity_Selling":quantity_Selling,
      "quantity_Buying":quantity_Buying,
      "quantity_Trade":quantity_Trade,
      "playerBuying":playerBuying
     }
     
  httpPost('/buy','json',playerTrade,(dataReceived)=>{
    
if(dataReceived.length > 0){
  buyConfirmationAlert = true;
  notEnoughtItemsBuyAlert = false;
}else{
  buyConfirmationAlert = false;
  notEnoughtItemsBuyAlert = true;
}
inventory = [];
console.log(inventory);
loadJSON('/getInventory/'+playerId,(dataReceived)=>{
  console.log(dataReceived);
  if(dataReceived.length <1 ){
    console.log("no items in inventory")
   }
   else{
     
   for (let i = 0; i < dataReceived.length; i++){
     inventory[i] = dataReceived[i]
     console.log(inventory);
       };
   };
});
console.log(inventory);
});
}

let sellM;
let sPostedTrades = [];
let sPlayer_sellingId_fk = [];
let sItemWanted = [];
let sQuantitySelling = [];
let sQuantityWanted = [];
let sQuantityTrade = [];
let sQuantityPostedTrades;
let sReturn;
let confirmSellButtoms = [];
let sUpButton;
let sDownButton;
let indexScroll = 0;
let arrayAuxS = [];
let sCloseButton1;
let sCloseButton2;


function createSellScreen(){
  sell_screen = new sellMenu(canvasWidth,canvasHeight * 0.76,SellButtonClickedId);
  sell_screen.createMenu();
}

function drawSellScreen(){
  sell_screen.drawMenu();
  for (let i = 0; i < numberButtons; i++) {
    Buttons[i].drawButton();
    Buttons[i].shine();
  };
}


class ButtonConfirmS{
  constructor(x,y,w,h,clr,name,bI){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.bI = bI;
    this.clr = clr;
    this.name = name;
    this.indexImage = 2;
  }
  drawButton(){
    sellM.fill('yellow');
    sellM.stroke(255, 204, 0);
    sellM.strokeWeight(1);
    sellM.fill(this.clr);
    sellM.image(ButtonImages[this.indexImage],this.x, this.y, this.w, this.h);
    sellM.fill('black');
    sellM.textSize(24);
    sellM.noStroke()
    sellM.textAlign(CENTER);
    sellM.text(this.name, this.x + this.w / 2, this.y + this.h / 2);

  }

  shine() {
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.clr = 'rgb(91, 203, 35)'
      this.indexImage = 3;
    } else {
      this.clr = 'rgb(73, 161, 28)'
      this.indexImage = 2;
    }
  }

  confirm(){if(mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h ){
    confirmSell(this.bI);
    console.log("confirmed");
  }

  }
 
}

let sellConfirmationAlert = false;
let notEnoughtItemsSellAlert = false;

function DrawConfirmSellAlert(){
  if(sellConfirmationAlert == true){
    SellAlertBox(canvasWidth*0.2,canvasHeight*0.15,canvasWidth*0.5,canvasHeight*0.4);
    SellTextAlert("Your Trade has been complete",canvasWidth*0.45,canvasHeight*0.35,CENTER);
    sCloseButton1.drawButton7();
    sCloseButton1.shine();
  }
}

function DrawNotEnoughtItemsAlertS(){
  if(notEnoughtItemsSellAlert == true){
    SellAlertBox(canvasWidth*0.2,canvasHeight*0.15,canvasWidth*0.5,canvasHeight*0.4);
    SellTextAlert("You dont have enought items to sell",canvasWidth*0.45,canvasHeight*0.35,CENTER);
    sCloseButton2.drawButton7();
    sCloseButton2.shine();
  }
}


function SellAlertBox(x, y, w, h){
  sellM.image(ButtonImages[6],x+2, y+2, w-4, h-4);
}


function SellTextAlert(content, x, y, align){
  sellM.fill("black");
  sellM.noStroke();
  sellM.textAlign(align);
  sellM.textSize(26);
  sellM.text(content, x, y);
}




function confirmSell(i){
  console.log("its trying to sell");
  let player_sellingId_fk = sPlayer_sellingId_fk[i];
  let item_sellingId_fk = sItemWanted[i];
  let item_buyingId_fk = items[SellButtonClickedId-1].itemId;
  let quantity_Selling = sQuantityWanted[i];
  let quantity_Buying = sQuantitySelling[i];
  let quantity_Trade = sQuantityTrade[i];
  let playerBuying = playerId;
  
  let playerTrade = {
   "player_sellingId_fk":playerBuying,  
   "item_sellingId_fk":item_sellingId_fk,
   "item_buyingId_fk":item_buyingId_fk,
   "quantity_Selling":quantity_Selling,
   "quantity_Buying":quantity_Buying,
   "quantity_Trade":quantity_Trade,
   "playerBuying":player_sellingId_fk
  }
  
httpPost('/sell','json',playerTrade,(dataReceived)=>{
  console.log(dataReceived);
  if(dataReceived.length > 0){
    sellConfirmationAlert = true;
    notEnoughtItemsSellAlert = false;
  }else{
    sellConfirmationAlert = false;
    notEnoughtItemsSellAlert = true;
  }

inventory = [];
console.log(inventory);
loadJSON('/getInventory/'+playerId,(dataReceived)=>{
console.log(dataReceived);
if(dataReceived.length <1 ){
 console.log("no items in inventory")
}
else{
  
for (let i = 0; i < dataReceived.length; i++){
  inventory[i] = dataReceived[i]
  console.log(inventory);
    };
};
});
console.log(inventory);
});

}







class sellMenu{
  constructor(w,h,bI){
    this.w = w;
    this.h = h;
    this.bI = bI;

  }
  RecriateMenu(){
    arrayAuxS = [];
    let j = indexScroll;
    for(let i = 0; i < 8; i++) {
      arrayAuxS[i] = new sPostedTrade(this.w*0.125, (this.h *0.09 * (i +2)),  this.w*0.2,  this.h*0.09,sPostedTrades[j].itemS,sPostedTrades[j].itemSQ,sPostedTrades[j].itemW,sPostedTrades[j].itemWQ,sPostedTrades[j].tradeQ);
      confirmSellButtoms[i] = new ButtonConfirmS((this.w*0.8), this.h*0.09 * (i+2), this.w*0.075, this.h*0.09, "green", "confirm",i); 
      if(j < sPostedTrades.length - 1){
        j++;
      }
    }  
  }
createMenu(){
  sellM = createGraphics(this.w,this.h);
  sReturn = new ButtonGreen(this.w/12 + (1.5*(this.w*0.225)) , this.h*0.18 * 3.5 + this.h * 0.28, (this.w*0.2917)/3, this.h/12, "green","return");
  sUpButton = new ButtonGreen((this.w*0.9), this.h*0.09 * 2, this.w*0.075, this.h*0.18, "green","Up");
  sDownButton = new ButtonGreen((this.w*0.9), this.h*0.09 * 2 +(this.h*0.18), this.w*0.075, this.h*0.18, "green","Down");
  sCloseButton1 = new ButtonGreen(canvasWidth*0.26,canvasHeight * 0.23,canvasWidth*0.1/3,canvasHeight*0.08/3,"green","Close");
  sCloseButton2 = new ButtonGreen(canvasWidth*0.26,canvasHeight * 0.23,canvasWidth*0.1/3,canvasHeight*0.08/3,"green","Close");
  loadJSON('/getsPostedTrades/'+this.bI+'/'+playerId,(dataReceived)=>{
    if(dataReceived.length <1 ){
      console.log("no trades")
      sPlayer_sellingId_fk = [];
      sItemWanted = [];
      sQuantitySelling = [];
      sQuantityWanted = [];
      sQuantityTrade = [];
      sQuantityPostedTrades = 0;
     }
     else{
      console.log(dataReceived)
      sQuantityPostedTrades = dataReceived.length;
      for(let i = 0; i < sQuantityPostedTrades; i++) {
        sPlayer_sellingId_fk[i] = dataReceived[i].player_sellingId_fk;
        sItemWanted[i] = dataReceived[i].item_sellingId_fk;
        sQuantitySelling[i] = dataReceived[i].quantity_Selling;
        sQuantityWanted[i] = dataReceived[i].quantity_Buying;
       sQuantityTrade[i] = dataReceived[i].quantity_Trade;
      }
      console.log(sItemWanted); 
      for(let i = 0; i < sQuantityPostedTrades; i++) {
        sPostedTrades[i] = new sPostedTrade(this.w*0.125, (this.h *0.09 * (i +2)),  this.w*0.2,  this.h*0.09,items[this.bI - 1].item_name,sQuantitySelling[i],items[sItemWanted[i] - 1].item_name,sQuantityWanted[i],sQuantityTrade[i]);
        confirmSellButtoms[i] = new ButtonConfirmS((this.w*0.8), this.h*0.09 * (i+2), this.w*0.075, this.h*0.09, "green", "confirm",i);
      }       
      this.RecriateMenu();
    }
  });
 
  
}

drawMenu(){
  push()
  sellM.background(BackgroundImages[0]);
  sellM.fill('yellow');
  sellM.stroke(255, 204, 0);
  sellM.strokeWeight(3);
  sellM.fill("green");  
  //item sold rect
  sellM.image(ButtonImages[2],(this.w*0.125), this.h*0.09, this.w*0.2, this.h*0.09);
  //item sold qt rect 
  sellM.image(ButtonImages[2],(this.w*0.3250), this.h*0.09, this.w*0.075, this.h*0.09);
  //item wanted rect
  sellM.image(ButtonImages[2],(this.w*0.4), this.h*0.09, this.w*0.2, this.h*0.09);
  //item wanted qt rect
  sellM.image(ButtonImages[2],(this.w*0.575), this.h*0.09, this.w*0.075, this.h*0.09);
  //trade quantity rect
  sellM.image(ButtonImages[2],(this.w*0.65), this.h*0.09, this.w*0.15, this.h*0.09);
  sellM.image(ButtonImages[2],(this.w*0.8), this.h*0.09, this.w*0.075, this.h*0.09)


  sellM.textSize(24);
  sellM.fill("black");
  sellM.noStroke();
  sellM.textAlign(CENTER);
  //base menu text
  sellM.text("You Get", this.w*0.22,  this.h *0.13);
  sellM.text("Qt.", this.w*0.365, this.h *0.13);
  sellM.text("They Get",this.w*0.49, this.h *0.13);
  sellM.text("Qt.",this.w*0.61, this.h *0.13);
  sellM.text("trade Qt.",this.w*0.72, this.h *0.13);
  //posted trades
 
  //arrayAuxS = sPostedTrades;

  if(sQuantityPostedTrades > 8){
    for(let i = 0; i < 8; i++) {      
      arrayAuxS[i].draw();
      confirmSellButtoms[i].drawButton();
      confirmSellButtoms[i].shine();
    };
  }else{
    for(let i = 0; i < sQuantityPostedTrades; i++) {      
      arrayAuxS[i].draw();
      confirmSellButtoms[i].drawButton();
      confirmSellButtoms[i].shine();
    };
  }
   
   sReturn.drawButton5();
   sReturn.shine();

   sUpButton.drawButton4();
   sUpButton.shine();

   sDownButton.drawButton4();
   sDownButton.shine();

   DrawConfirmSellAlert();
   DrawNotEnoughtItemsAlertS();

  image(sellM,0,0);
  pop()

}


}




class sPostedTrade{
  constructor(x,y,w,h,itemS,itemSQ,itemW,itemWQ,tradeQ){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.itemS = itemS;
    this.itemSQ = itemSQ;
    this.itemW = itemW;
    this.itemWQ = itemWQ;
    this.tradeQ = tradeQ;
  
  }
  draw(){
    push()
      sellM.fill('yellow');
      sellM.stroke(255, 204, 0);
      sellM.strokeWeight(3);
      sellM.fill("green");
        //item selling
        sellM.image(ButtonImages[2],this.x, this.y , this.w, this.h);
        //item selling qt
        sellM.image(ButtonImages[2],this.x + this.w , this.y , this.w*0.375, this.h);
        //item wanted
        sellM.image(ButtonImages[2],this.x + this.w + this.w*0.375,this.y ,this.w*0.875,this.h);
        //item wanted qt
        sellM.image(ButtonImages[2],this.x + ( this.w)+(this.w*0.875) + (this.w*0.375),this.y ,this.w*0.375,this.h);
        //trade qt
        sellM.image(ButtonImages[2],this.x + (this.w)+(this.w*0.875) + (2 * this.w*0.375),this.y,this.w*0.75,this.h);
        //empty rec
        sellM.image(ButtonImages[2],this.x + (this.w)+(this.w*0.875)+ this.w*0.75  + (2 * this.w*0.375),this.y ,this.w*0.37,this.h);
  
        sellM.textSize(24);
        sellM.fill("black");
        sellM.noStroke();
        sellM.textAlign(CENTER);
        //item selling
        sellM.text(this.itemW, this.x + this.w / 2, this.y + this.h / 2);
        //item selling qt
        sellM.text(this.itemWQ, this.x + this.w / 2 + this.w*0.7, this.y + this.h / 2 );
        //item wanted  
        sellM.text(this.itemS, this.x + this.w / 2 + this.w +this.w*0.375, this.y + this.h / 2 );
        //item wanted qt
        sellM.text(this.itemSQ, this.x + this.w / 2 + this.w +this.w*0.375+this.w*0.55, this.y + this.h / 2 );
        //trade qt
        sellM.text(this.tradeQ, this.x + this.w / 2 + this.w +(1.35*this.w*0.375)+this.w, this.y + this.h / 2 );
      pop()
  }
  
}