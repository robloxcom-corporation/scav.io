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
var globalFlags = ['drawCrosshair'];
var cameraScaleX = 1;
var cameraScaleY = 1;


var pressedKeys;
var player;
var block;
var block2;
var equip = [];
var objects = [];

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


    crosshair.init();


    var comp = {
        posX: 0,
        posY: 0,
        width: 70,
        height: 70,
        offsetX: 0,
        offsetY: 0,
        src: 'static\\assets\\art\\PlayerTest2.svg',
        flags: []
    };
    player = new Player(comp);
    player.init();

    var equipComp = {
        'width': 100,
        'height': 60,
        'offsetX': defaultOffsetX,
        'offsetY': defaultOffsetY,
        src: 'static\\assets\\art\\Scav_Gun1.png',
        flags: ['doesRotate'],
        player: player
    };
    equip.push(new Equipment(equipComp));
    player.equip = equip;
    for (var i in equip) {
        equip[i].init();
    };


    var comp = {
        posX: 200,
        posY: 100,
        'width': 15,
        'height': 15,
        offsetX: 0,
        offsetY: 0,
        color: 'blue',
        camera_reference: player,
        flags: ['doesCollide']
    };
    block = new Object(comp);
    objects.push(block);

    var comp = {
        posX: 200,
        posY: 115,
        'width': 15,
        'height': 15,
        offsetX: 0,
        offsetY: 0,
        color: 'red',
        camera_reference: player,
        flags: ['doesCollide']
    };
    block2 = new Object(comp);
    objects.push(block2);


    window.addEventListener('keydown', keydown, false);
    window.addEventListener('keyup', keyup, false);
    document.captureEvents(Event.MOUSEMOVE);
    document.onmousemove = updateMousePos;
};


function gameloop(timestamp) {
        context.clearRect(0 ,0 , width, height);

        player.move();
        block.collision(player);
        block2.collision(player);

        player.draw();
        block.draw();
        block2.draw();

        if (globalFlags.includes('drawCrosshair')) { crosshair.draw(crosshair); };
        if (globalFlags.includes('drawScreenCenter')) { drawScreenCenter(); };


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

function getDrawPos(posX, posY, offsetX, offsetY, camera_reference) {
    var drawPosX = ((posX + offsetX - camera_reference.posX) * cameraScaleX) + camera_reference.drawPosX;
    var drawPosY = ((posY + offsetY - camera_reference.posY) * cameraScaleY) + camera_reference.drawPosY;
    return {drawPosX: drawPosX, drawPosY: drawPosY};
};

function getDrawDimentions(width, height) {
    return { drawWidth: width * cameraScaleX, drawHeight: height * cameraScaleY };
};

function drawScreenCenter() {
    context.save();
    context.strokeStyle = 'red';
    context.beginPath();
    context.moveTo(width/2, 0);
    context.lineTo(width/2, height);
    context.stroke();
    context.beginPath();
    context.moveTo(0, height/2);
    context.lineTo(width, height/2);
    context.stroke();
    context.restore();
};

addFlag = function(flag) {
    globalFlags.push(flag);
};
removeFlag = function(flag) {
    var arr = []
    for (var i in globalFlags) {
        if (globalFlags[i] != flag) {
            arr.push(globalFlags[i]);
        };
    };
    globalFlags = arr;
};

window.onload = function () { init(); gameloop() };