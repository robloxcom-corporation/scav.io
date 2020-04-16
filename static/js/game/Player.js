const max_vel = 1;

function Player(component) {
    this.component = component;
    this.posX = component.posX;
    this.posY = component.posY;
    this.lastPosX = component.posX;
    this.lastPosY = component.posY;
    this.width = component.width;
    this.height = component.height;
    var drawDims = getDrawDimentions(this.width, this.height);
    this.drawWidth = drawDims.drawWidth;
    this.drawHeight = drawDims.drawHeight;
    if (component.offsetX) { this.offsetX = component.offsetX; } else { this.offsetX = 0; };
    if (component.offsetY) { this.offsetY = component.offsetY; } else { this.offsetY = 0; };
    this.drawPosX = width/2;
    this.drawPosY = height/2;
    this.velX = 0;
    this.velY = 0;
    this.angle = 0;
    this.src = component.src;
    this.img;
    if (component.hotbar) { this.hotbar = component.hotbar; } else { this.hotbar; };
    if (component.rig) { this.rig = component.rig; } else { this.rig; };
    if (component.backpack) { this.backpack = componet.backpack; } else { this.backpack; };
    if (component.armor) { this.armor = component.armor; } else { this.armor; };
    if (component.helmet) { this.helmet = component.helmet; } else { this.helet; };
    if (component.flags) { this.flags = component.flags; } else { this.flags = [] };


    
    this.move = function() {
        this.lastPosX = this.posX;
        this.lastPosY = this.posY;

        if (pressedKeys['left'] && pressedKeys['up']) {
            this.velX = -max_vel * Math.sqrt(2)/2;
            this.velY = max_vel * Math.sqrt(2)/2;
        } else if (pressedKeys['left'] && pressedKeys['down']) {
            this.velX = -max_vel * Math.sqrt(2)/2;
            this.velY = -max_vel * Math.sqrt(2)/2;
        } else if (pressedKeys['right'] && pressedKeys['up']) {
            this.velX = max_vel * Math.sqrt(2)/2;
            this.velY = max_vel * Math.sqrt(2)/2;
        } else if (pressedKeys['right'] && pressedKeys['down']) {
            this.velX = max_vel * Math.sqrt(2)/2;
            this.velY = -max_vel * Math.sqrt(2)/2;
        } else if (pressedKeys['left']) {
            this.velX = -max_vel;
            this.velY = 0;
        } else if (pressedKeys['right']) {
            this.velX = max_vel;
            this.velY = 0;
        } else if (pressedKeys['up']) {
            this.velX = 0;
            this.velY = max_vel;
        } else if (pressedKeys['down']) {
            this.velX = 0;
            this.velY = -max_vel;
        } else {
            if (!(pressedKeys['left'] || pressedKeys['right'])) {
                this.velX = 0;
            };
            if (!(pressedKeys['up'] || pressedKeys['down'])) {
                this.velY = 0;
            };
        };

        this.posX += this.velX;
        this.posY += -this.velY;
    };


    this.draw = function() {
        var drawDims = getDrawDimentions(this.width, this.height);
        this.drawWidth = drawDims.drawWidth;
        this.drawHeight = drawDims.drawHeight;
        var x = this.drawPosX - this.drawWidth/2;
        var y = this.drawPosY - this.drawHeight/2;
    
        context.save()
        context.translate(this.drawPosX, this.drawPosY);
        context.rotate(-player.angle * Math.PI / 180);
        context.drawImage(this.img, -this.drawWidth/2, -this.drawHeight/2, this.drawWidth, this.drawHeight);
        context.restore()
        
        for (var i in this.hotbar.contents) {
            this.hotbar.contents[i].draw();
        };

        if (this.flags.includes('drawHitbox')) {
            context.save();
            context.strokeStyle = 'red';
            context.strokeRect(x, y, this.drawWidth, this.drawHeight);
            context.restore();    
        };
    };


    this.init = function() {
        var img = new Image();
        img.onload = function() {

        };
        img.src = this.src;
        this.img = img;
    };


    this.addFlag = function(flag) {
        this.flags.push(flag);
    };
    this.removeFlag = function(flag) {
        var arr = []
        for (var i in this.flags) {
            if (this.flags[i] != flag) {
                arr.push(this.flags[i]);
            };
        };
    this.flags = arr;
    };

};