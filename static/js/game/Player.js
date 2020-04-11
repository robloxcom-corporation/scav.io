const max_vel = 1;

function Player(component) {
    this.posX = component.posX;
    this.posY = component.posY;
    this.width = component.width;
    this.height = component.height;
    this.offsetX = component.offsetX;
    this.offsetY = component.offsetY;
    this.velX = 0;
    this.velY = 0;
    this.angle = 0;
    this.equip = component.equip;
    this.src = component.src;
    this.img;

    
    this.move = function() {
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
        context.drawImage(this.img, width/2 - this.width/2 + this.offsetX, height/2 - this.height/2 + this.offsetY, this.width, this.height);

        for (var i in this.equip) {
            this.equip[i].draw();
        };
    };


    this.init = function() {
        var img = new Image();
        img.onloag = function() {
            context.drawImage(img, width/2 - this.width/2 + this.offsetX, height/2 - this.height/2 + this.offsetY, this.width, this.height);
        };
        img.src = this.src;
        this.img = img;
    };

};