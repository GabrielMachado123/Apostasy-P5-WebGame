let currentScreen;

function GoToScreen(screenNumber){
    currentScreen = screenNumber;
    if(currentScreen == 1){
        createLoginScreen();
    }
    else if(currentScreen == 2){
        loginBtn.remove()
        createRegisterScreen();
    }
    else if(currentScreen == 3){
        createGameScreen();
  
    }
    else if(currentScreen == 4){
        createMarketScreen();
    }

    else if(currentScreen == 5){
        createCombatScreen();
      }

    else if(currentScreen == 6){
        createInv();
    }

    else if(currentScreen == 7){
        createPostScreen();
    }

    else if(currentScreen == 8){
        createBuyScreen();
    }
    else if (currentScreen == 9){
        createSellScreen();
    }
    else if (currentScreen == 10){
        CharacterScreenSetup();
    }
    else if (currentScreen == 11){
        createDungeonScreen();
    }
    else if(currentScreen == 12){
        VictoryScreenSetup();
    }
  };


  function DrawScreen(){
    if (currentScreen == GAME_SCREEN){
        drawGameScreen();
    }
    else if (currentScreen == MARKET_SCREEN){
        drawMarket();
    }
    else if (currentScreen == COMBAT_SCREEN){
        drawCombatScreen();
    }
    else if (currentScreen == INVENTORY_SCREEN){
        drawInv();
    }
    else if (currentScreen == POST_SCREEN){
        drawPostScreen();
    }
    else if (currentScreen == BUY_SCREEN){
        setTimeout(function(){   drawBuyScreen();}, 100);
    }
    else if (currentScreen == SELL_SCREEN){
        setTimeout(function(){  drawSellScreen();}, 100);
    }
    else if (currentScreen == CHARACTER_SCREEN){
        CharacterScreenDraw();
    }
    else if (currentScreen == DUNGEON_SCREEN){
        drawDungeonScreen();
    }
    else if (currentScreen == VICTORY_SCREEN){
        VictoryScreenDraw();
    }
}