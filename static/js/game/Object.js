function Object(component) {
    var parent = this;
    this.component = component;
    this.posX = component.posX;
    this.posY = component.posY;
    this.ref = component.camera_reference;

    this.draw = function() {
        context.save();
        context.fillRect(this.posX - this.ref.posX + width/2, this.posY - this.ref.posY + height/2, 20, 20);
        context.restore();
    };

    this.getAngleToReference = function() {
        var numer = this.posY - this.ref.posY;
        var denom = this.posX - this.ref.posX;
        return Math.atan(numer/denom) * 180 / Math.PI;
    };

};