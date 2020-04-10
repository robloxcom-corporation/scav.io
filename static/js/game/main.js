const canvas = document.getElementById("gamecanvas");
const context = canvas.getContext("2d");
var width;
var height;
const keyMap = {
    39: 'right', // right arrow
    68: 'right', // d
    37: 'left', // left arrow
    65: 'left', // a
    38: 'up', // up arrow
    87: 'up', // w
    40: 'down', // down arrow
    83: 'down', // s
};

var pressedKeys;
var player;
var block;

function init() {
    canvas.width = window.innerWidth - 8;
    canvas.height = window.innerHeight - 20;
    width = canvas.width;
    height = canvas.height;
    pressedKeys = {
        left: false,
        right: false,
        up: false,
        down: false
    };


    player = new Player(500, 500);

    var comp = {
        'posX': 200,
        'posY': 100,
        camera_reference: player
    };
    block = new Object(comp);

    window.addEventListener('keydown', keydown, false);
    window.addEventListener('keyup', keyup, false);
};


function gameloop(timestamp) {

        context.clearRect(0 ,0 , width, height);
        player.move();
        player.draw();
        block.draw();

    window.requestAnimationFrame( gameloop );
};


function keydown(event) {
    var key = keyMap[event.keyCode];
    pressedKeys[key] = true;
    
    if (key == 'left' && pressedKeys['right']) {
        pressedKeys['right'] = false;
    } else if (key == 'right' && pressedKeys['left']) {
        pressedKeys['left'] = false;
    } else if (key == 'up' && pressedKeys['down']) {
        pressedKeys['down'] = false;
    } else if (key == 'down' && pressedKeys['up']) {
        pressedKeys['up'] = false;
    };
};
function keyup(event) {
    var key = keyMap[event.keyCode];
    pressedKeys[key] = false;
};

window.onload = function () { init(); gameloop() };