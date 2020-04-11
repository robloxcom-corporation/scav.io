function Equipment(component) {
    this.src = component.src;
    this.flags = component.flags;
    this.img;
    this.width = component.width;
    this.height = component.height;
    this.offsetY = component.offsetY;
    this.offsetX = component.offsetX;


    this.draw = function() {
        if (this.flags.includes('doesRotate')) {
            context.save();
            context.translate(width/2, height/2);
            context.rotate(-player.angle * Math.PI/180);
            context.drawImage(this.img, 0 - this.width/2 + this.offsetY, 0 - this.height/2 + this.offsetX, this.width, this.height);
            context.restore();
        } else {
            context.save();
            context.drawImage(this.img, 0 - this.width/2 + this.offsetY, 0 - this.height/2 + this.offsetX, this.width, this.height);
            context.restore();
        };
    };

    this.init = function() {
        var img = new Image();
        img.onload = function() {
            context.save();
            context.translate(width/2, height/2);
            context.rotate(-player.angle * Math.PI/180);
            context.drawImage(img, 0 - this.width/2 + this.offsetY, 0 - this.height/2 + this.offsetX, this.width, this.height);
            context.restore();
        };
        img.src = this.src;
        this.img = img;
    };
};