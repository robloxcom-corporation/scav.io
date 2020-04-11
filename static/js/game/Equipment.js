function Equipment(component) {
    this.flags = component.flags;

    this.draw = function() {
        if (this.flags.includes('doesRotate')) {
            context.save();
            context.translate(width/2, height/2);
            context.rotate(-player.angle * Math.PI/180);
            context.fillRect(0, 0, 40, 7);
            context.restore();
        } else {
            context.save();
            context.fillRect(width/2, height/2, 40, 7);
            context.restore();
        };
    };
};