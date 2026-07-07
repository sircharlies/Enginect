import Circle from "../../../core/objects/renderables/shapes/Circle";

export default class Ball extends Circle {
    constructor(x = 180, y = 100, velocityX = 260, velocityY = 90, radius = 24) {
        super("Ball", radius);
        this.transform.position.set(x, y);
        this.color = `hsl(${Math.floor(Math.random() * 360)} 80% 70%)`;
        this.velocity.set(velocityX, velocityY);
        this.useGravity = true;
        this.mass = 1;
        this.restitution = 0.85;
    }
}