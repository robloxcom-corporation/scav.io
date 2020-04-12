function Object(component) {
    var parent = this;
    this.component = component;
    this.posX = component.posX;
    this.posY = component.posY;
    this.lastPosX = component.posX;
    this.lastPosY = component.posY;
    this.width = component.width;
    this.height = component.height;
    this.offsetX = component.offsetX;
    this.offsetY = component.offsetY;
    this.ref = component.camera_reference;
    if (component.flags) { this.flags = component.flags; } else { this.flags = [] };

    this.draw = function() {
        var x = this.posX - this.width/2 - this.ref.posX + this.ref.drawPosX;
        if (this.offsetX) {x += this.offsetX};
        var y = this.posY - this.height/2 - this.ref.posY + this.ref.drawPosY;
        if (this.offsetY) {y += this.offsetY};
        
        context.save();
        context.fillRect(x, y, this.width, this.height);
        context.restore();
    };

    this.getAngleToReference = function() {
        var numer = this.posY - this.ref.posY;
        var denom = this.posX - this.ref.posX;
        return Math.atan(numer/denom) * 180 / Math.PI;
    };

    this.collision = function(player) { // function technically works with any object, but initially built for player
        if (!this.flags.includes('doesCollide')) { return; };
        var playerTop = player.posY - player.height/2;
        var lastPlayerTop = player.lastPosY - player.height/2;
        var playerBottom = player.posY + player.height/2;
        var lastPlayerBottom = player.lastPosY + player.height/2;
        var playerLeft = player.posX - player.width/2;
        var lastPlayerLeft = player.lastPosX - player.width/2;
        var playerRight = player.posX + player.width/2;
        var lastPlayerRight = player.lastPosX + player.width/2;
        var objectTop = this.posY - this.height/2;
        var lastObjectTop = this.lastPosY - this.height/2;
        var objectBottom = this.posY + this.height/2;
        var lastObjectBottom = this.lastPosY + this.height/2
        var objectLeft = this.posX - this.width/2;
        var lastObjectLeft = this.lastPosX - this.width/2;
        var objectRight = this.posX + this.width/2;
        var lastObjectRight = this.lastPosX + this.width/2;

        if (playerBottom < objectTop || playerTop > objectBottom || playerLeft > objectRight || playerRight < objectLeft) {
            return;
        };
        if (playerBottom >= objectTop && lastPlayerBottom < lastObjectTop) {
            player.posY = objectTop - player.width/2 - 0.1;
        } else if (playerTop <= objectBottom && lastPlayerTop > lastObjectBottom) {
            player.posY = objectBottom + player.width/2 + 0.1;
        } else if (playerRight >= objectLeft && lastPlayerRight < lastObjectLeft) {
            player.posX = objectLeft - player.width/2 - 0.1;
        } else if (playerLeft <= objectRight && lastPlayerLeft > lastObjectRight) {
            player.posX = objectRight + player.width/2 + 0.1;
        };

    };

};