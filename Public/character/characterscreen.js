let CharCV;
let equipmentObj;
let swapbuttonObj;
let characterObj = [];
let characterswapObj;

let CharacterScreenInfo = {
    "CharSlot": null,
    "CharEquip": null,
    "InvEquip": null,
    "PlayerId": null,
    "ResetType": null,
    "SwapCharacter": null,
    "Insert": {
        "name": null,
        "role": null,
        "playerId": null
    },
    "Delete": {
        "name": null,
        "row": null,
        "playerId": null
    }
}
let itemSwapAttempt = false;
let charScreen;


function CharacterScreenSetup(){
    CharCV = createGraphics(canvasWidth, canvasHeight * 0.76);
    charScreen = 1;
    equipmentObj = new equipment();
    swapbuttonObj = new swapbutton();
    characterswapObj = new characterswap();

    for(let i=0; i < 4; i++){
        characterObj[i]= new character(i);
    }
}

function CharacterScreenDraw(){
    CharCV.imageMode(CORNER);
    CharCV.background(characterBackground);
    for (let i = 0; i < numberButtons; i++) {
        Buttons[i].drawButton();
        Buttons[i].shine();
    }
    for(let i=0; i<4; i++){
        characterObj[i].draw();
    }

    swapbuttonObj.draw();
    if(charScreen == 1){
        equipmentObj.draw();

        if(itemSwapAttempt == false && CharacterScreenInfo.InvEquip != null && CharacterScreenInfo.CharSlot != null && CharacterScreenInfo.CharEquip != null){
            itemSwapAttempt = true;
            CharacterScreenInfo.PlayerId = playerId;
            httpPost('/CharInvSwap', 'json',CharacterScreenInfo,(dataReceived)=>{
                if(dataReceived == true){
                    CharacterScreenInfo.InvEquip = null;
                    characterObj[CharacterScreenInfo.CharSlot - 1].reset();
                    CharacterScreenInfo.CharSlot = null,
                    equipmentObj.reset();

                }
            });
        }
    } else if (charScreen == 2){
        characterswapObj.draw();

        if(itemSwapAttempt == false && CharacterScreenInfo.CharSlot != null && CharacterScreenInfo.SwapCharacter != null){
            itemSwapAttempt = true;
            CharacterScreenInfo.PlayerId = playerId;
            httpPost('/SwapCharacters', 'json',CharacterScreenInfo,(dataReceived)=>{
                CharacterScreenInfo.CharEquip = "All";
                characterObj[CharacterScreenInfo.CharSlot - 1].reset();
                equipmentObj.reset();
                characterswapObj.reset();
                CharacterScreenInfo.CharSlot = null;
                CharacterScreenInfo.SwapCharacter = null;
            });
        }
    }
    CharCV.imageMode(CORNER);
    image(CharCV,0,0)
}