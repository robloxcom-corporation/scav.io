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
    src: 'static\\assets\\art\\Scav_Crosshair1.png',
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
        context.drawImage(crosshair.img, crosshair.posX - 15, crosshair.posY - 15, 30, 30);
    },
    init: function(self) {
        var img = new Image();
        img.onload = function() {
            context.drawImage(img, crosshair.posX, crosshair.posY, 50, 50);
        };
        img.src = crosshair.src;
        crosshair.img = img;
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
        'width': 50,
        'height': 30,
        'offsetY': 20,
        'offsetX': 6,
        src: 'static\\assets\\art\\Scav_Gun1.png',
        flags: ['doesRotate']
    };
    equip.push(new Equipment(equipComp));
    for (var i in equip) {
        equip[i].init();
    };

    var comp = {
        posX: 0,
        posY: 0,
        equip: [],
        src: 'static\\assets\\art\\Scav_Player1.png'
    };
    comp.equip = equip;
    player = new Player(comp);
    player.init();

    crosshair.init();

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

        crosshair.draw(crosshair);

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