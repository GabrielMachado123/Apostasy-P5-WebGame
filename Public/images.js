let leftarrow;
let rightarrow;
let dungeon;
let combatUI;
let combatArrowUp;
let combatArrowDown;
let handCursorDown;
let jealosyPNG;
let virtuePNG;
let mark;
let cover1;
let cover2;
let cover3;
let thornmail;
let victory;
let ButtonImages = [];
let BackgroundImages = [];
let characterBackground;
let characterMenu;


function getImages(){
    leftarrow = loadImage('art/LeftArrow.png');
    rightarrow = loadImage('art/RightArrow.png');
    dungeon = loadImage('art/BG/battleback8.png');
    combatUI = loadImage('art/UIpack/PNG/panel_blue.png');
    combatArrowUp = loadImage('art/UIpack/PNG/arrowBlue_up.png');
    combatArrowDown = loadImage('art/UIpack/PNG/arrowBlue_down.png');
    handCursorDown = loadImage('art/handCursorDown.png');
    handCursorUp = loadImage('art/handCursorUp.png');
    jealosyPNG = loadImage('art/DarkKnight.png');
    virtuePNG = loadImage('art/LadyNightingale.png');
    mark = loadImage('art/Mark.png');
    cover1 = loadImage('art/Cover.png');
    cover2 = loadImage('art/CoverKnight.png');
    cover3 = loadImage('art/ShieldMagic.png');
    thornmail = loadImage('art/Thornmail.png');
    victory = loadImage('art/UIpack/PNG/victory.png');
    characterBackground = loadImage('art/BG/battleback2.png');
    characterMenu = loadImage('art/UIpack/PNG/characterScreenMenu.png');
    for(let i = 0; i < 10; i++){
        ButtonImages[i] = loadImage('art/image_'+i+'.png');
    }
    
    for(let i = 0; i < 4; i++){
        BackgroundImages[i] = loadImage('art/Background_'+i+'.png');
    }
}