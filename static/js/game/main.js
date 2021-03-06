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
var globalFlags = ['drawCrosshair', 'drawHotbar'];
var cameraScaleX = 1;
var cameraScaleY = 1;


var pressedKeys;
var player;
var objects = [];
var invPos = 0;
var maxInvPos = 5;

var crosshair = {
    posX: 0,
    posY: 0,
    src: 'static\\assets\\art\\Scav_Crosshair1.svg',
    height: 30,
    width: 30,
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
        context.drawImage(crosshair.img, crosshair.posX - 15, crosshair.posY - 15, crosshair.width, crosshair.height);
    },
    init: function(self) {
        var img = new Image();
        img.onload = function() {
            context.drawImage(img, crosshair.posX - 15, crosshair.posY - 15, crosshair.width, crosshair.height);
        };
        img.src = crosshair.src;
        crosshair.img = img;
    }
};


var visualHotbar = {
    width: 512,
    height: 64,
    modelWidth: 50,
    modelHeight: 50,
    src: 'static\\assets\\art\\Scav_Hotbar1.svg',
    draw: function(self) {
        context.drawImage(self.img, self.posX, self.posY, self.width, self.height);
        for (var i = 0; i < player.hotbar.component.contents.length; i ++) {
            var modelDrawX = self.posX;
            var modelDrawY = self.posY;
            if (i < 2) {
                modelDrawX += i * self.modelWidth * 2;
            } else {
                modelDrawX += (self.modelWidth * 4) + self.modelWidth * i;
            };
            context.drawImage(player.hotbar.component.contents[i].hotbarImage, modelDrawX, modelDrawY, self.modelWidth, self.modelHeight);
        };
    },
    init: function(self) {
        self.posX = window.width/2 - self.width/2
        self.posY = 10;

        var img = new Image();
        visualHotbar.img = img;
        img.src = self.src;

        for (var i = 0; i < player.hotbar.component.contents.length; i ++) { 
            var img = new Image();
            img.src = player.hotbar.component.contents[i].src;
            player.hotbar.component.contents[i].hotbarImage = img;
        };
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


    crosshair.init(crosshair);


    var comp = {
        posX: 0,
        posY: 0,
        width: 70,
        height: 70,
        offsetX: 0,
        offsetY: 0,
        src: 'static\\assets\\art\\PlayerTest2.svg',
        flags: [],
    };
    player = new Player(comp);
    player.init();



    var hotbarComponent = {
        dimentions: {x: 6, y:1},
        contents: []
    };
    player.hotbar = new Container(hotbarComponent);
    var equipComp = {
        width: 43,
        height: 11,
        offsetX: defaultOffsetX,
        offsetY: defaultOffsetY,
        src: 'static\\assets\\art\\Scav_Gun1.svg',
        flags: ['doesRotate', 'drawModel'],
        player: player,
        container: player.hotbar
    };
    player.hotbar.contents.push(new Equipment(equipComp));
    var equipComp = {
        width: 43,
        height: 11,
        offsetX: defaultOffsetX,
        offsetY: defaultOffsetY,
        src: 'static\\assets\\art\\Scav_Gun2.png',
        flags: ['doesRotate'],
        player: player,
        container: player.hotbar
    };
    player.hotbar.contents.push(new Equipment(equipComp));
    var equipComp = {
        width: 43,
        height: 11,
        offsetX: 0,
        offsetY: 0,
        src: 'static\\assets\\art\\Scav_Gun1.svg',
        flags: ['doesRotate'],
        player: player,
        container: player.hotbar
    };
    player.hotbar.contents.push(new Equipment(equipComp));
    for (var i in hotbarComponent.contents) {
        hotbarComponent.contents[i].init();
    };


    var comp = {
        posX: 200,
        posY: 100,
        width: 15,
        height: 15,
        offsetX: 0,
        offsetY: 0,
        color: 'blue',
        camera_reference: player,
        flags: ['doesCollide'],
        zIndex: 1
    };
    objects.push(new Object(comp));

    var comp = {
        posX: 200,
        posY: 115,
        width: 15,
        height: 15,
        offsetX: 0,
        offsetY: 0,
        color: 'red',
        camera_reference: player,
        flags: ['doesCollide'],
        zIndex: 2
    };
    objects.push(new Object(comp));


    visualHotbar.init(visualHotbar);


    var comp = { // WIP (test pickup system --> inventory sorting, etc)
        posX: -300,
        posY: 200,
        width: 43,
        height: 11,
        color: 'green',
        camera_reference: player,
        flags: [],
        zIndex: 1
    };


    window.addEventListener('wheel', function(e) {
        var lastInvPos = invPos;
        if (e.deltaY > 0) {
            invPos++;
        } else {
            invPos--;
        };
        if (invPos > maxInvPos) {
            invPos = 0;
        } else if (invPos < 0) {
            invPos = maxInvPos;
        };
        console.log(invPos)

        if (player.hotbar.contents[lastInvPos] != undefined) {
            player.hotbar.contents[lastInvPos].removeFlag('drawModel');
        };
        if (player.hotbar.contents[invPos] != undefined) {
            player.hotbar.contents[invPos].addFlag('drawModel');
        };
    });


    window.addEventListener('keydown', keydown, false);
    window.addEventListener('keyup', keyup, false);
    document.captureEvents(Event.MOUSEMOVE);
    document.onmousemove = updateMousePos;
};


function gameloop(timestamp) {
        context.clearRect(0 ,0 , width, height);

        player.move();
        for (var i in objects) {
            objects[i].collision(player);
        };

        var drawnObjects = []
        drawnObjects = drawnObjects.concat(objects);
        drawnObjects.push(player);
        drawnObjects.sort(function(a, b) {
            if (a.zIndex > b.zIndex) {
                return 1;
            } else if (a.zIndex < b.zIndex) {
                return -1;
            } else { return 0 };
        });
        for (var i in drawnObjects) {
            drawnObjects[i].draw(drawnObjects[i]);
        };

        if (globalFlags.includes('drawCrosshair')) { crosshair.draw(crosshair); };
        if (globalFlags.includes('drawHotbar')) { visualHotbar.draw(visualHotbar); };
        // for (var i = 0; i < maxInvPos; i++) {
        //     context.drawImage(self.img, self.posX + ((i * self.cellWidth * 2) + 1), self.posY, self.cellWidth, self.cellHeight);
        // };
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