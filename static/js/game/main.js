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
var equip = [];

var crosshair = {
    posX: 0,
    posY: 0,
    getAngleToPlayer: function(self) {
        var numer = self.posY - height/2;
        var denom = self.posX - width/2;
        var ref = Math.abs(Math.atan(numer/denom) * 180 / Math.PI);
        if (self.posX < width/2 && self.posY < height/2) {
            return 180 - ref;
        } else if (self.posX < width/2 && self.posY > height/2) {
            return 180 + ref;
        } else if (self.posX > width/2 && self.posY > height/2) {
            return 360 - ref;
        } else {
            return ref;
        };
    },
    draw: function(self) {
        context.save();
        context.fillRect(crosshair.posX, crosshair.posY, 10, 10);
        context.restore();
    }
};


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

    equipComp = {
        flags: ['doesRotate']
    };
    equip.push(new Equipment(equipComp));
    var comp = {
        posX: 500,
        posY: 500,
        equip: []
    };
    comp.equip = equip;
    player = new Player(comp);

    var comp = {
        posX: 200,
        posY: 100,
        camera_reference: player,
        flags: ['doesCollide']
    };
    block = new Object(comp);


    window.addEventListener('keydown', keydown, false);
    window.addEventListener('keyup', keyup, false);
    document.captureEvents(Event.MOUSEMOVE);
    document.onmousemove = updateMousePos;
};


function gameloop(timestamp) {

        context.clearRect(0 ,0 , width, height);
        
        player.move();
        player.draw();

        block.draw();

        crosshair.draw();

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

function updateMousePos(event) {
    crosshair.posX = event.clientX;
    crosshair.posY = event.clientY;
    player.angle = crosshair.getAngleToPlayer(crosshair);
};


window.onload = function () { init(); gameloop() };