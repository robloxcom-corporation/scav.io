function Equipment(component) {
    this.component = component;
    this.src = component.src;
    this.img;
    this.width = component.width;
    this.height = component.height;
    this.offsetY = component.offsetY;
    this.offsetX = component.offsetX;
    if (component.flags) { this.flags = component.flags; } else { this.flags = [] };
    if (component.player) { this.player = component.player } else { this.player = player };


    this.draw = function() {
        if (this.flags.includes('doesRotate')) {
            context.save();
            context.translate(this.player.drawPosX, this.player.drawPosY);
            context.rotate(-this.player.angle * Math.PI/180);
            context.drawImage(this.img, 0 - this.width/2 + this.offsetY, 0 - this.height/2 + this.offsetX, this.width, this.height);
            context.restore();
        } else {
            context.save();
            context.translate(width/2, height/2);
            context.drawImage(this.img, 0 - this.width/2 + this.offsetY, 0 - this.height/2 + this.offsetX, this.width, this.height);
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
};