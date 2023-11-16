import { RectObject } from "./RectObject.js";
import { Rectangle } from "./Rectangle.js";
import { Ball } from "./Ball.js";

export class Brick extends RectObject {
    constructor(x, y, fillcolor, strokecolor, id, rectangle, width = 100, length = 100) {
        const l = y + length;
        const w = x + width;

        super(x, y, fillcolor, strokecolor, id, new Rectangle(x, y, w, l), width, length);

        // Make sure the brick is always filled
        if (this.strokecolor == null) {
            this.strokecolor = "brown";
        }

        // Flag to check if brick exists
        this.visible = true;
    }

    isCollidingWithBall(ball) {
        const canvas = document.getElementById(this.id);
        const ctx = canvas.getContext("2d");
        
        // Check if the ball's position intersects with the brick's position
        if ((ball.x + ball.radius > this.x) && (ball.x - ball.radius < this.x + this.width) && (ball.y + ball.radius > this.y) && (ball.y - ball.radius < this.y + this.length)) {
           // If there's a collision, erase the brick
           this.visible = false;
        }
    }

    remove() {
        // Remove the brick when it gets hit by a ball
        const canvas = document.getElementById(this.id);
        const ctx = canvas.getContext("2d");
        ctx.clearRect(this.x - ctx.lineWidth, this.y - ctx.lineWidth, this.width + 2*ctx.lineWidth, this.length + 2*ctx.lineWidth);
    }
}