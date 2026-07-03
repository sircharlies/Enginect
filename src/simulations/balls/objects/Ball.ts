import Circle from "../../../core/objects/renderables/shapes/Circle";

export default class Ball extends Circle {
    constructor() {
        super("Ball", 50);
        this.transform.position.set(400, 300);
        this.color = "#FFFFFF";
        this.velocity.set(15, 0);
    }
}