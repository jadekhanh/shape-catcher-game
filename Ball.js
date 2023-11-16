import { GameObject } from "./GameObject.js";
import { Rectangle } from "./Rectangle.js";

export class Ball extends GameObject {
    constructor(x, y, fillcolor, strokecolor, id, rectangle, radius) {
        // The radius and initial location on the canvas are supplied with a constructor
        super(x, y, fillcolor, strokecolor, id, null);
        this.radius = radius;

        // Bounding rectangle
        this.rectangle = new Rectangle(this.x - this.radius, this.y - this.radius, 2 * radius, 2 * radius);

        this.dx = 5;    // horizontal velocity
        this.dy = -5;   // vertical velocity

        this.visible = true;    // check if ball disappears
    }

    draw() {
        // When called, a corresponding circle is drawn on the screen
        const canvas = document.getElementById(this.id);
        const ctx = canvas.getContext("2d");

        // https://www.w3schools.com/jsref/canvas_arc.asp
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.fillcolor;
        ctx.fill();
        ctx.strokeStyle = this.strokecolor;
        ctx.stroke();
        ctx.closePath();
    }

    // When collide with walls
    isCollidingWithWalls() {
        // Bounce if ball hits top, left, and right walls
        const canvas = document.getElementById(this.id);
        const ctx = canvas.getContext("2d");

        // https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Bounce_off_the_walls
        // Check if the ball hits the right wall
        if (this.x + this.radius + this.dx > canvas.width) {
            this.x = canvas.width - this.radius; // Move the ball away from the wall
            this.dx = -this.dx; // Reverse the horizontal velocity
        }

        // Check if the ball hits the left wall
        else if (this.x - this.radius + this.dx < 0) {
            this.x = this.radius; // Move the ball away from the wall
            this.dx = -this.dx;   // Reverse the horizontal velocity
        }

        // Check if the ball hits the top wall
        if (this.y - this.radius + this.dy < 0) {
            this.y = this.radius; // Move the ball away from the wall
            this.dy = -this.dy;   // Reverse the vertical velocity
        }

//        // Check if the ball hits the bottom wall
//        else if (this.y + this.radius + this.dy > canvas.height) {
//            this.y = canvas.height - this.radius; // Move the ball away from the wall
//            this.dy = -this.dy;   // Reverse the vertical velocity
//        }

    }

    // When collide with paddle
    isCollidingWithHorizontalPaddle(paddle) {
        const canvas = document.getElementById(this.id);
        const ctx = canvas.getContext("2d");
        // Use same logic as bouncing walls: https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Bounce_off_the_walls
        // Check if the ball hits the bottom paddle
        if (this.y + this.radius + this.dy > paddle.y && this.y - this.radius < paddle.y + paddle.length && this.x > paddle.x && this.x < paddle.x + paddle.width) {
            this.y = paddle.y - this.radius; // Move the ball away from the wall
            this.dy = -this.dy; // Reverse the vertical velocity
        }

        this.dx *= 1.01;
        this.dy *= 1.01;
    }

    update(paddleObjects) {
        // Check if the ball hits game objects
        this.isCollidingWithWalls();
        for (const paddle of paddleObjects) {
            this.isCollidingWithHorizontalPaddle(paddle);
        }

        // Update the ball's and its rectangle's position
        this.x += this.dx;
        this.y += this.dy;
        this.rectangle.x += this.dx;
        this.rectangle.y += this.dy;

        // Check if the ball falls off screen, let it stays there to not reappear elsewhere
        const canvas = document.getElementById(this.id);
        const ctx = canvas.getContext("2d");
        if (this.y - this.radius > canvas.height) {
            this.dx = 0;
            this.dy = 0;
        }
    }
}
