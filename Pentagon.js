import { GameObject } from "./GameObject.js";
import { Rectangle } from "./Rectangle.js";
import { Ball } from "./Ball.js";

export class Pentagon extends GameObject {
    constructor(x, y, fillcolor, strokecolor, id, rectangle, width, length) {
        const l = y + length;
        const w = x + width;

        super(x, y, fillcolor, strokecolor, id, new Rectangle(x, y, w, l));
        this.width = width;
        this.length = length;

        this.ballList = [];     // A list of new balls
        this.listBall = [];     // A list of the first ball + new ball
        this.gotHit = false;    // Flag to mark if the pentagon got hit
    }

    // If the pentagon is hit by a ball
    ballHits(ball) {
        if (this.gotHit == false) {
            // Check for collision
            // Calculate distance between 2 coordinates: https://javascript.plainenglish.io/javascript-algorithm-distance-between-points-7fe0026857e3
            const distance = Math.sqrt(Math.pow(this.x - ball.x, 2) + Math.pow(this.y - ball.y, 2));
            if (ball.radius + this.width/2 >= distance) {
                // Create a new ball with the same attributes as the original ball
                const newBall = new Ball(this.x + 10, this.y + 10, ball.fillcolor, ball.strokecolor, this.id, null, 20);
                this.ballList.push(newBall);
                this.listBall.push(newBall);

                // Increase the original ball's velocity by 25%
                ball.dx *= 1.25;
                ball.dy *= 1.25;

                // Mark the pentagon as got hit
                this.gotHit = true;

                // After 2 seconds, reset the gotHit flag to detect other hits
                // https://developer.mozilla.org/en-US/docs/Web/API/setTimeout
                setTimeout(() => {
                    this.gotHit = false;
                }, "2000");
            }
        }
    }

    draw() {
        const canvas = document.getElementById(this.id);
        const ctx = canvas.getContext("2d");
        ctx.beginPath();
        // Draw a pentagon: https://www.scienceprimer.com/drawing-regular-polygons-javascript-canvas
        const size = this.width;
        ctx.moveTo(this.x + size * Math.cos(0), this.y +  size *  Math.sin(0));
        for (var i = 1; i <= 5;i += 1) {
            ctx.lineTo(this.x + size * Math.cos(i * 2 * Math.PI / 5), this.y + size * Math.sin(i * 2 * Math.PI / 5));
        }
        ctx.strokeStyle = this.strokecolor;
        ctx.fillStyle = this.fillcolor;
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }

    update(ball) {
        // Check if the pentagon is hit by a ball
        this.ballHits(ball);
    }

}
