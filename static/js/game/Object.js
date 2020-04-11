function Object(component) {
    var parent = this;
    this.component = component;
    this.posX = component.posX;
    this.posY = component.posY;
    this.width = component.width;
    this.height = component.height;
    this.offsetX = component.offsetX;
    this.offsetY = component.offsetY;
    this.ref = component.camera_reference;

    this.draw = function() {
        context.save();
        context.fillRect(this.posX - this.ref.posX + width/2 + this.offsetX, this.posY - this.ref.posY + height/2 + this.offsetY, this.width, this.height);
        context.restore();
    };

    this.getAngleToReference = function() {
        var numer = this.posY - this.ref.posY;
        var denom = this.posX - this.ref.posX;
        return Math.atan(numer/denom) * 180 / Math.PI;
    };

};