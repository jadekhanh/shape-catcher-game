import { GameObject } from "./GameObject.js";
import { Rectangle } from "./Rectangle.js";

export class RectObject extends GameObject {
    constructor(x, y, fillcolor, strokecolor, id, rectangle, width, length) {
        // The geometry and initial location on the canvas are supplied with a constructor
        // (x,y) = coordinate of top-left corner
        super(x, y, fillcolor, strokecolor, id, null);

        this.width = width;
        this.length = length;
        this.rectangle = new Rectangle(x, y, width, length); // (x,y) = top-left corner

        this.dx = 5;
        this.dy = 5;
    }

    draw() {
        // When called, a corresponding rectangle is drawn on the screen
        // https://www.w3schools.com/jsref/canvas_fillrect.asp
        const canvas = document.getElementById(this.id);
        const ctx = canvas.getContext("2d");

        ctx.beginPath();
        ctx.fillStyle = this.fillcolor;
        ctx.strokeStyle = this.strokecolor;
        ctx.rect(this.x, this.y, this.width, this.length);
        ctx.fill();
        ctx.stroke();
    }

    isCollidingWithWalls() {
        // Bounce if ball hits top, left, and right walls
        const canvas = document.getElementById(this.id);
        const ctx = canvas.getContext("2d");

        // https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Bounce_off_the_walls
        // Check if the ball hits the right wall
        if (this.x + this.width + this.dx > canvas.width) {
            this.x = canvas.width - this.width; // Move the ball away from the wall
            this.dx = -this.dx; // Reverse the horizontal velocity
        }

        // Check if the ball hits the left wall
        else if (this.x + this.dx < 0) {
            this.x = this.dx; // Move the ball away from the wall
            this.dx = -this.dx;   // Reverse the horizontal velocity
        }

        // Check if the ball hits the top wall
        if (this.y + this.dy < 0) {
            this.y = this.dy; // Move the ball away from the wall
            this.dy = -this.dy;   // Reverse the vertical velocity
        }

        // Check if the ball hits the bottom wall
        else if (this.y + this.length + this.dy > canvas.height) {
            this.y = canvas.height - this.length; // Move the ball away from the wall
            this.dy = -this.dy;   // Reverse the vertical velocity
        }

    }

    update() {
        this.isCollidingWithWalls();

        // When called, its X and Y coordinates are each incremented
        this.x += this.dx;
        this.y += this.dy;
        // Update the bounding box
        this.rectangle.x += this.dx;
        this.rectangle.y += this.dy;
    }

}
