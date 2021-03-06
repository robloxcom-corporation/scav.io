const defaultOffsetX = 45;
const defaultOffsetY = 17;

function Equipment(component) {
    this.component = component;
    this.src = component.src;
    this.img;
    this.width = component.width;
    this.height = component.height;
    var drawDims = getDrawDimentions(this.width, this.height);
    this.drawWidth = drawDims.drawWidth;
    this.drawHeight = drawDims.drawHeight;
    if (component.offsetX) { this.offsetX = component.offsetX; } else { this.offsetX = defaultOffsetX; };
    if (component.offsetY) { this.offsetY = component.offsetY; } else { this.offsetY = defaultOffsetY; };
    if (component.player) { this.player = component.player; } else { this.player = player; };
    var pos = getDrawPos(this.player.posX, this.player.posY, this.offsetX, this.offsetY, this.player);
    this.drawPosX = pos.drawPosX;
    this.drawPosY = pos.drawPosY;
    if (component.flags) { this.flags = component.flags; } else { this.flags = []; };
    if (component.invPos) { this.invPos = component.invPos; } else { this.invPos = player.hotbar.contents.length + 1; };


    this.draw = function() {
        var drawDims = getDrawDimentions(this.width, this.height);
        this.drawWidth = drawDims.drawWidth;
        this.drawHeight = drawDims.drawHeight;
        var pos = getDrawPos(this.player.posX, this.player.posY, this.offsetX, this.offsetY, this.player);
        this.drawPosX = pos.drawPosX;
        this.drawPosY = pos.drawPosY;    
        var x = this.drawPosX - this.drawWidth/2;
        var y = this.drawPosY - this.drawHeight/2;

        if (this.flags.includes('drawModel')) {
            context.save();
            if (this.flags.includes('doesRotate')) {
                context.translate(this.player.drawPosX, this.player.drawPosY);
                context.rotate(-this.player.angle * Math.PI/180);
                context.drawImage(this.img, x - this.player.drawPosX, y - this.player.drawPosY, this.drawWidth, this.drawHeight);
            } else {
                context.translate(this.player.drawPosX, this.player.drawPosY);
                context.drawImage(this.img, this.player.drawPosX - x, this.player.drawPosY - y, this.drawWidth, this.drawHeight);
            };
            if (this.flags.includes('drawHitbox')) {
                context.strokeStyle = 'red';
                context.strokeRect(this.player.drawPosX - x, this.player.drawPosY - y, this.drawWidth, this.drawHeight);
            };
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