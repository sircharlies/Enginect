import Vector2 from "./Vector2";

export default class Transform {
    public position: Vector2;
    public scale: Vector2;
    public rotation = 0;

    constructor() {
        this.position = Vector2.zero();
        this.scale = new Vector2(1,1);
    }
}