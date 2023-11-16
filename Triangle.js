import { GameObject } from "./GameObject.js";
import { Rectangle } from "./Rectangle.js";

export class Triangle extends GameObject {
    constructor(x1, y1, x2, y2, x3, y3, fillcolor, strokecolor, id, rectangle) {
        super(x1, y1, fillcolor, strokecolor, id, rectangle);
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.x3 = x3;
        this.y3 = y3;

        // https://medium.com/@vladbezden/how-to-get-min-or-max-of-an-array-in-javascript-1c264ec6e1aa
        const minX = Math.min(this.x1, this.x2, this.x3);
        const maxX = Math.max(this.x1, this.x2, this.x3);
        const minY = Math.min(this.y1, this.y2, this.y3);
        const maxY = Math.max(this.y1, this.y2, this.y3);
        const width = maxX - minX;
        const length = maxY - minY;
        this.rectangle = new Rectangle(minX, maxY, width, length);

        this.dx = 5;    // Horizontal velocity
        this.dy = 5;    // Vertical velocity

        this.angle = 0; // Initial rotation angle

    }

    draw() {
        const canvas = document.getElementById(this.id);
        const ctx = canvas.getContext("2d");

        // Save the current state of canvas
        // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations
        ctx.save();

        // Rotate the canvas around the centroid of the triangle
        // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations
        const xCenter = (this.x1 + this.x2 + this.x3) / 3;
        const yCenter = (this.y1 + this.y2 + this.y3) / 3;
        ctx.translate(xCenter, yCenter);
        ctx.rotate(this.angle);

        // Draw the triangle
        // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes
        ctx.beginPath();
        // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations
        // https://stackoverflow.com/questions/58213344/rotate-a-triangle-in-the-cente-of-itself
        ctx.moveTo(this.x1 - xCenter, this.y1 - yCenter); // move the pen to 1st point
        ctx.lineTo(this.x2 - xCenter, this.y2 - yCenter); // draw a line to 2nd point
        ctx.lineTo(this.x3 - xCenter, this.y3 - yCenter); // draw a line to 3rd point
        ctx.lineTo(this.x1 - xCenter, this.y1 - yCenter); // draw a line back to 1st point
        ctx.strokeStyle = this.strokecolor;
        ctx.fillStyle = this.fillcolor;
        ctx.fill();
        ctx.closePath();
        ctx.stroke();

        // Restore the previous state of canvas
        // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations
        ctx.restore();
    }

    // Check if the triangle hits the walls, then bounce
    isCollidingWithWalls() {
        const canvas = document.getElementById(this.id);
        const ctx = canvas.getContext("2d");
        // Check if hits the left wall
        if (this.x1 + this.dx < 0 || this.x2 + this.dx < 0 || this.x3 + this.dx < 0) {
            this.dx = -this.dx;
        }
        // Check if hits the right wall
        else if (this.x1 + this.dx > canvas.width || this.x2 + this.dx > canvas.width || this.x3 + this.dx > canvas.width) {
            this.dx = -this.dx;
        }
        // Check if hits the top wall
        if (this.y1 + this.dy < 0 || this.y2 + this.dy < 0 || this.y3 + this.dy < 0) {
            this.dy = -this.dy;
        }
        // Check if hits the bottom wall
        else if (this.y1 + this.dy > canvas.height || this.y2 + this.dy > canvas.height || this.y3 + this.dy > canvas.height) {
            this.dy = -this.dy;
        }
    }

    update(gameObjects) {
        // Check if the triangle hits game objects
        this.isCollidingWithWalls();

        // When called, its x and y coordinates are each incremented
        this.x1 += this.dx;
        this.y1 += this.dy;
        this.x2 += this.dx;
        this.y2 += this.dy;
        this.x3 += this.dx;
        this.y3 += this.dy;

        // Update the rotation angle
        this.angle += 0.2;

        // Update the bounding box
        this.rectangle.x += this.dx;
        this.rectangle.y += this.dy;
    }
}
