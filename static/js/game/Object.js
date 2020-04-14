function Object(component) {
    var parent = this;
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
    this.ref = component.camera_reference;
    var pos = getDrawPos(this.posX, this.posY, this.offsetX, this.offsetY, this.ref);
    this.drawPosX = pos.drawPosX;
    this.drawPosY = pos.drawPosY;
    if (component.flags) { this.flags = component.flags; } else { this.flags = [] };
    if (component.xIndex) { this.zIndex = component.zIndex; } else { this.zIndex = 1; };

    this.draw = function() {
        var drawDims = getDrawDimentions(this.width, this.height);
        this.drawWidth = drawDims.drawWidth;
        this.drawHeight = drawDims.drawHeight;
        var pos = getDrawPos(this.posX, this.posY, this.offsetX, this.offsetY, this.ref)
        this.drawPosX = pos.drawPosX;
        this.drawPosY = pos.drawPosY;    
        var x = this.drawPosX - this.drawWidth/2;
        var y = this.drawPosY - this.drawHeight/2;
    

        context.save();
        context.fillStyle = component.color;
        context.fillRect(x, y, this.drawWidth, this.drawHeight);
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
        if ( ((playerBottom >= objectTop && lastPlayerBottom < lastObjectTop) && (playerLeft <= objectRight && lastPlayerLeft > lastObjectRight)) 
        || ((playerBottom >= objectTop && lastPlayerBottom < lastObjectTop) && (playerRight >= objectLeft && lastPlayerRight < lastObjectLeft)) 
        || ((playerTop <= objectBottom && lastPlayerTop > lastObjectBottom) && (playerLeft <= objectRight && lastPlayerLeft > lastObjectRight)) 
        || ((playerTop <= objectBottom && lastPlayerTop > lastObjectBottom) && (playerRight >= objectLeft && lastPlayerRight < lastObjectLeft)) ) {
            if (player.lastPosX == player.posX) {
                colY();
                return;
            }; 
            if (player.lastPosY = player.posY) {
                colX();
                return;
            };

        };

        colX();
        colY();
        
        function colX() {
            if (playerRight >= objectLeft && lastPlayerRight < lastObjectLeft) {
                player.posX = objectLeft - player.width/2 - 0.1;
            } else if (playerLeft <= objectRight && lastPlayerLeft > lastObjectRight) {
                player.posX = objectRight + player.width/2 + 0.1;
            };
        };
        function colY() {
            if (playerBottom >= objectTop && lastPlayerBottom < lastObjectTop) {
                player.posY = objectTop - player.width/2 - 0.1;
            } else if (playerTop <= objectBottom && lastPlayerTop > lastObjectBottom) {
                player.posY = objectBottom + player.width/2 + 0.1;
            };
        };


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