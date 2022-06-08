

function LoginScreenButtonSetup(){
  nameInput = createInput('');
  nameInput.position(canvasWidth*0.6,canvasHeight*0.35);
  passInput = createInput('');
  passInput.position(canvasWidth*0.6,canvasHeight*0.45);
}



function createLoginScreen(){
  background(BackgroundImages[3]);
  loginBtn = createButton('Login');
  loginBtn.position(canvasWidth*0.6,canvasHeight*0.5);
  loginBtn.mousePressed(do_Login);
  goRegisterBtn = createButton('new player');
  goRegisterBtn.position(canvasWidth*0.68,canvasHeight*0.5); 
  goRegisterBtn.mousePressed(()=>{GoToScreen(REGISTER_SCREEN)});
};



function do_Login(){
  let playerUsername=nameInput.value();
  let playerPassword=passInput.value();
  
  let player = {
    "playerUsername":playerUsername,
    "playerPassword":playerPassword
  }
  
httpPost('/login','json',player,(dataReceived)=>{

  if(dataReceived.length<1){
    console.log("player dont exist");
    }else{
      playerId=dataReceived[0].playerId;
      loadJSON('/getUsername/'+playerId,(dataReceived)=>{
      username = dataReceived[0].username
      
      GoToScreen(GAME_SCREEN);
      });
      loadJSON('/getItems',(dataReceived)=>{
        for (let i = 0; i < dataReceived.length; i++) {
          itemId = dataReceived[i].itemId
          item_name = dataReceived[i].item_name
          item_description = dataReceived[i].item_description
        
          items[i] = new item(itemId,item_description,item_name);
  
        };
      
      });
    
      loadJSON('/getInventory/'+playerId,(dataReceived)=>{
        if(dataReceived.length <1 ){
          console.log("no items in inventory")
         }
         else{
           
         for (let i = 0; i < dataReceived.length; i++){
           inventory[i] = dataReceived[i]
             };
         };
      });
      loadJSON('/getTrades/'+playerId,(dataReceived)=>{
        if(dataReceived.length <1 ){
          console.log("no trades")
         }
         else{  
          pItemSelectionS = dataReceived[0].item_sellingId_fk;
          pItemSelection = dataReceived[0].item_buyingId_fk;
          pQuantitySold = dataReceived[0].quantity_Selling;
          pQuantityBuy = dataReceived[0].quantity_Buying;
          pQuantityTrade = dataReceived[0].quantity_Trade;
         };
      });
      
    }
});

};

function doRegister(){
  let playerUsername=nameInput.value();
  let playerPassword=passInput.value();
  
  let player = {
    "playerUsername":playerUsername,  
    "playerPassword":playerPassword
  }
  
  httpPost('/register','json',player,(dataReceived)=>{
 
  if(dataReceived.length<1){
  console.log("player exist");
  }else{
  playerId = dataReceived[0].playerId;
  loadJSON('/getUsername/'+playerId,(dataReceived)=>{
  username = dataReceived[0].username;
  GoToScreen(GAME_SCREEN);
  });
  loadJSON('/getItems',(dataReceived)=>{
    for (let i = 0; i < dataReceived.length; i++) {
      itemId = dataReceived[i].itemId;
      item_name = dataReceived[i].item_name;
      item_description = dataReceived[i].item_description;
    
      items[i] = new item(itemId,item_description,item_name);
  
    };
  });
  loadJSON('/getInventory/'+playerId,(dataReceived)=>{
    if(dataReceived.length <1 ){ 
     console.log("no items in inventory")
    }
    else{    
    for (let i = 0; i < dataReceived.length; i++){
      inventory[i] = dataReceived[i];
      
        };
    };
  });
  
  };
  })};

  function createRegisterScreen(){
    goRegisterBtn.remove();
    loginBtn = createButton('register');
    loginBtn.position(canvasWidth*0.6,canvasHeight*0.5);
    loginBtn.mousePressed(doRegister);
  };