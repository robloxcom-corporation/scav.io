function Container(component) {
    this.component = component;
    this.dimentions = component.dimentions;
    this.capacity = this.dimentions.x * this.dimentions.y;
    if (component.contents) { this.contents = component.contents; } else { this.contents = []; };
    if (component.flags) { this.flags = component.flags; } else { this.flags = []; };






};