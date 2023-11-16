import { RectObject } from "./RectObject.js";
import { Rectangle } from "./Rectangle.js";

export class Paddle extends RectObject {
    constructor(x, y, fillcolor, strokecolor, id, rectangle, width = 20, length = 100) {
        const l = y + length;
        const w = x + width;

        super(x, y, fillcolor, strokecolor, id, new Rectangle(x, y, w, l), width, length);

        const canvas = document.getElementById(this.id);
        const ctx = canvas.getContext("2d");

        canvas.setAttribute("tabindex", "0"); // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex

        // Using the arrow key to move
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event
        canvas.addEventListener("keydown", (event) => {
            if (event.key == "ArrowUp") {
                // Clear the region where the old paddle was located
                // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect
                // remind: (x,y) = top-left corner
              ctx.clearRect(this.x, this.y, this.width, this.length);
                // Paddle moves down
                this.y -= 5;

                // Update the bounding box
                this.rectangle.y -= 5;

            }
            else if (event.key == "ArrowDown") {
                // Clear the region where the old paddle was located
                // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect
                ctx.clearRect(this.x, this.y, this.width, this.length);
                // Paddle moves down
                this.y += 5;

                // Update the bounding box
                this.rectangle.y += 5;

            }

            // Make sure paddle doesn't pass the left edge
            if (this.x - ctx.lineWidth < 0) {
                this.x = ctx.lineWidth;
            }
            // Make sure the paddle doesn't pass the right edge
            else if (this.x + this.width + ctx.lineWidth > canvas.width) {
                this.x = canvas.width - this.width - ctx.lineWidth;
            }
            // Make sure the paddle doesn't pass the top edge
            else if (this.y < 0) {
                this.y = ctx.lineWidth;
            }
            // Make sure the paddle doesn't pass the bottom edge
            else if (this.y + this.length + ctx.lineWidth> canvas.height) {
                this.y = canvas.height - this.length - ctx.lineWidth;
            }

            this.rectangle.x = this.x;

            // Draw the new paddle
            this.draw();
        });

        // Using the mouse pointer to move
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event
        canvas.addEventListener("mousemove", (event) => {
            // Clear the region where the old paddle was located
            ctx.clearRect(this.x, this.y, this.width, this.length);

            // Update the paddle's position to track the mouse
            // The coordinates of the mouse pointer:
            // https://www.w3schools.com/jsref/event_clientx.asp
            // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
            let x = event.clientX;  // Horizontal
            let y = event.clientY;  // Vertical
            this.x = x - canvas.getBoundingClientRect().left;

            // Make sure paddle doesn't pass the left edge
            if (this.x - ctx.lineWidth < 0) {
                this.x = ctx.lineWidth;
            }
            // Make sure the paddle doesn't pass the right edge
            else if (this.x + this.width + ctx.lineWidth > canvas.width) {
                this.x = canvas.width - this.width - ctx.lineWidth;
            }
            // Make sure the paddle doesn't pass the top edge
            else if (this.y < 0) {
                this.y = ctx.lineWidth;
            }
            // Make sure the paddle doesn't pass the bottom edge
            else if (this.y + this.length + ctx.lineWidth> canvas.height) {
                this.y = canvas.height - this.length - ctx.lineWidth;
            }

            // Update the bounding box
            this.rectangle.x = this.x;

            // Draw the new paddle
            this.draw();
        });

        canvas.focus(); // https://www.w3schools.com/jsref/met_html_focus.asp

    }
}
