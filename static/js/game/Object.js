function Object(component) {
    this.component = component;
    this.posX = component.posX;
    this.posY = component.posY;
    this.ref = component.camera_reference;
    this.draw = function() {
        context.fillRect(this.posX - this.ref.posX + width/2, this.posY - this.ref.posY + height/2, 20, 20);
    };
};