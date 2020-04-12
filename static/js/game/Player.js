const max_vel = 1;

function Player(component) {
    this.component = component;
    this.posX = component.posX;
    this.posY = component.posY;
    this.lastPosX = component.posX;
    this.lastPosY = component.posY;
    this.width = component.width;
    this.height = component.height;
    this.offsetX = component.offsetX;
    this.offsetY = component.offsetY;
    this.drawPosX = width/2;
    this.drawPosY = height/2;
    this.velX = 0;
    this.velY = 0;
    this.angle = 0;
    this.equip = component.equip;
    this.src = component.src;
    this.img;
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
        var x = this.drawPosX - this.width/2  //width/2
        if (this.offsetX) { x += this.offsetX };
        var y = this.drawPosY - this.height/2;
        if (this.offsetY) ( y += this.offsetY );
        context.drawImage(this.img, x, y, this.width, this.height);

        for (var i in this.equip) {
            this.equip[i].draw();
        };

        if (this.flags.includes('drawHitbox')) {
            context.save();
            context.strokeStyle = 'red';
            context.strokeRect(width/2 - this.width/2, height/2 - this.height/2, this.width, this.height);
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