//Global Variables.
let bWorking = false;
let playerId;
let cv;
let canvasWidth;
let canvasHeight;
let cvX;
let cvY;
let inventory = [];
let items = [];

let LOGIN_SCREEN = 1;
let REGISTER_SCREEN = 2;
let GAME_SCREEN = 3;
let MARKET_SCREEN = 4;
let COMBAT_SCREEN = 5;
let INVENTORY_SCREEN = 6;
let POST_SCREEN = 7;
let BUY_SCREEN = 8;
let SELL_SCREEN = 9;
let CHARACTER_SCREEN = 10;
let DUNGEON_SCREEN = 11;
let VICTORY_SCREEN = 12;
let buyButtonClickedId = 0;

function preload() {
  mainMenu = loadImage('StaticMenu.png');
  getImages();

};


function setup() {
  canvasWidth = 1200;
  canvasHeight = 800; 
  cv=createCanvas(canvasWidth, canvasHeight);
  cv.position((windowWidth*0.5)-canvasWidth/2,(windowHeight*0.5)-canvasHeight/2);
  LoginScreenButtonSetup();
  GoToScreen(LOGIN_SCREEN);
  bottomMenuSetup();
};

function draw() {
  DrawScreen();
  loop();
}

function mousePressed(){
  if (currentScreen == GAME_SCREEN){
    for (let i = 0; i < numberButtons; i++) {
      Buttons[i].work();
    } 
}
else if (currentScreen == MARKET_SCREEN){
  drawMarket();
  for (let i = 0; i < numberButtons; i++) {
    Buttons[i].work();
  };

  for (let i = 0; i < items.length; i++){
    buyButtons[i].buy()
    sellButtons[i].sell()
    };
    
  for (let i = 0; i < items.length; i++){
    sellButtons[i].sell()
    };
    
      postTrade.postTrade();

}
else if (currentScreen == COMBAT_SCREEN){
    drawCombatScreen();

    for(let i = 0; i < 4; i++){
      if(Heroes[i]){
        Heroes[i].isclicked();
      }
      if(Enemies[i]){
        Enemies[i].isclicked();
      }
    }
    
}
else if (currentScreen == VICTORY_SCREEN){
  if(mouseX > 700 && mouseX < 700 + 50 && mouseY > 200 && mouseY < 325){
    if(lootscroll - 1 >= 0){
      lootscroll--;
    }
  } else if(mouseX > 700 && mouseX < 700 + 50 && mouseY > 325 && mouseY < 450){
    if(lootscroll + 1 <= 12){
      lootscroll++;
    }
  } else if(mouseX > 450 && mouseX < 450 + 100 && mouseY > 500 && mouseY < 500 + 50){
    GoToScreen(COMBAT_SCREEN);
  } else if(mouseX > 650 && mouseX < 650 + 100 && mouseY > 500 && mouseY < 500 + 50){
    httpPost('/LeaveDungeon', 'json',combatsetup,(dataReceived)=>{
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
    });
    GoToScreen(DUNGEON_SCREEN);
  }
}
else if (currentScreen == INVENTORY_SCREEN){
    drawInv();
    for (let i = 0; i < numberButtons; i++) {
      Buttons[i].work();
    }
}
else if (currentScreen == POST_SCREEN){
    drawPostScreen();
  pmButtons[0].addTrade();
  pmButtons[1].removeTrade();
  pmButtons[2].work();
  pmButtons[4].fowardArrow();
  pmButtons[3].backArrow();
  pmButtons[5].increaseQt();
  pmButtons[6].decreaseQt();
  pmButtons[7].backArrowS();
  pmButtons[8].fowardArrowS();
  pmButtons[9].increaseQtS();
  pmButtons[10].decreaseQtS();
  pmButtons[11].increaseQtT();
  pmButtons[12].decreaseQtT();
  for (let i = 0; i < numberButtons; i++) {
    Buttons[i].work();
  
  }
  if(PostTradeAlert == true){
    pCloseButton1.CloseAlerts();
  }
  if(PostTradeAlert2 == true){
  pCloseButton2.CloseAlerts();
  }
}
else if (currentScreen == BUY_SCREEN){
  bReturn.work();
  bUpButton.UpBuy();
  bDownButton.DownBuy();
  if(buyConfirmationAlert == true){
    bCloseButton1.CloseAlerts();
  }
 if(notEnoughtItemsBuyAlert == true){
  bCloseButton2.CloseAlerts();
 }
  for(let i = 0; i < bQuantityPostedTrades; i++) {
    confirmBuyButtoms[i].confirm();
    };
    for (let i = 0; i < numberButtons; i++) {
      Buttons[i].work();
    }
  }
  else if(currentScreen == SELL_SCREEN){
    if(sellConfirmationAlert == true){
      sCloseButton1.CloseAlerts();
    }
   if(notEnoughtItemsSellAlert == true){
    sCloseButton2.CloseAlerts();
   }
    sReturn.work();
    sUpButton.UpSell();
    sDownButton.DownSell();
    for (let i = 0; i < numberButtons; i++) {
      Buttons[i].work();
    }
    for(let i = 0; i < sQuantityPostedTrades; i++) {
      console.log("hyeyy");
      confirmSellButtoms[i].confirm();
    };
}else if (currentScreen == CHARACTER_SCREEN){
  CharacterScreenDraw();
  for (let i = 0; i < numberButtons; i++) {
    Buttons[i].work();
  }
  for(let i=0; i<4; i++){
    characterObj[i].isclicked();
  }
  if(charScreen == 1){
    equipmentObj.isclicked();
  } else if(charScreen == 2){
    characterswapObj.isclicked();
  }
  swapbuttonObj.isclicked();
}else if(currentScreen == DUNGEON_SCREEN){
  departButton.work();
  for (let i = 0; i < numberButtons; i++) {
    Buttons[i].work();
  }
}

noLoop();
}