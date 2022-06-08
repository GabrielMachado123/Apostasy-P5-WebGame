let VictoryCanvas;
let loot = [];
let lootscroll = 0;

function VictoryScreenSetup(){
    loot = [];
    httpPost('/Victory', 'json',combatsetup,(dataReceived)=>{
        for(let i = 0; i<dataReceived.length; i++){
            loot[i] = {
                "name": dataReceived[i].item_name,
                "quantity": dataReceived[i].quantity
            }
        }
    });

    VictoryCanvas = createGraphics(canvasWidth, canvasHeight);
}


function VictoryScreenDraw(){
    VictoryCanvas.imageMode(CORNER);
    VictoryCanvas.background(dungeon);
    VictoryCanvas.imageMode(CENTER);
    VictoryCanvas.image(victory, width/2, height/2, 500, 600);

    for(let i = 0; i < 5; i++){
        VictoryCreateBox(450, 200 + 50 * i, 200, 50);
        VictoryCreateBox(450+200, 200 + 50 * i, 50, 50);
        if(loot[i+lootscroll]){
            VictoryCreateText(loot[i+lootscroll].name, 450 + 10, 200 + 50 / 2 + 50 * i + 6, LEFT);
            VictoryCreateText(loot[i+lootscroll].quantity, 450 + 200 + 25, 200 + 50 / 2 + 50 * i+ 6, CENTER);
        }
        
    }
    VictoryCreateText("You Won the fight!", width/2, height/2 - 250, CENTER);
    VictoryScrolling(700, 200, 50, 125);
    VictoryScrolling(700, 325, 50, 125);

    VictoryScrolling(450, 500, 100, 50);
    VictoryCreateText("Fight on!", 450+50, 500+25, CENTER);

    VictoryScrolling(650, 500, 100, 50);
    VictoryCreateText("Leave", 700, 500+25, CENTER);



    
    image(VictoryCanvas, 0, 0);

}

function VictoryCreateBox(x, y, w, h){
    VictoryCanvas.imageMode(CORNER);
    VictoryCanvas.rectMode(CORNER);
    VictoryCanvas.fill("black");
    VictoryCanvas.rect(x, y, w, h);
    VictoryCanvas.image(combatUI, x+2, y+2, w-4, h-4);
}

function VictoryCreateText(text, x, y, mode){
    VictoryCanvas.textAlign(mode);
    VictoryCanvas.textSize(20);
    VictoryCanvas.fill("black");
    VictoryCanvas.text(text, x, y);
}

function VictoryScrolling(x, y, w, h){
    VictoryCanvas.imageMode(CORNER);
    VictoryCanvas.rectMode(CORNER);
    if(mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h){
        VictoryCanvas.fill("white");
    }else{
        VictoryCanvas.fill("black");
    }
    VictoryCanvas.rect(x, y, w, h);
    VictoryCanvas.image(combatUI, x+2, y+2, w-4, h-4);
}