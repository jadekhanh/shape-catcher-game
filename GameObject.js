export class GameObject {
    // FIELDS
    /**
    Create a game object
    * @param {number} x: The X-coordinate of the object on the Canvas
    * @param {number} y: The Y-coordinate of the object on the Canvas
    * @param {string} fillcolor: A string representing the "fill color" of the object
    * @param {string} strokecolor: A string representing the "stroke color" of the object
    * @param {string} id: A unique ID
    * @param {object} rectangle: A rectangle that bounds the object on the Canvas.
    */
    constructor(x, y, fillcolor, strokecolor, id, rectangle) {
        this.x = x;
        this.y = y;
        this.fillcolor = fillcolor;
        this.strokecolor = strokecolor;
        this.id = id;
        this.rectangle = rectangle;
    }

    // METHODS
    draw() {
        // Draw the current object on the canvas. Currently does nothing.
    }

    update() {
        // Updates the object fields for the next animation frame. Currently does nothing.
    }
}