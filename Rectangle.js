export class Rectangle {
    // FIELDS
    /**
    Create a bounding rectangle for each game object
    * @param {number} x: The X-coordinate of the top-left corner
    * @param {number} y: The Y-coordinate of the top-left corner
    * @param {number} width: The width of the bounding rectangle
    * @param {number} length: The length of the bounding rectangle
    */
    constructor(x, y, width, length) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.length = length;
    }
}