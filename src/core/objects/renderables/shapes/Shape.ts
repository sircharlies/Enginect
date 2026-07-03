import PhysicsRenderable from "../PhysicsRenderable";

export default abstract class Shape extends PhysicsRenderable {
    public fill = true;
    public stroke = false;
    public strokeColor = "#000";
    public strokeWidth = 1;

    constructor(name: string) {
        super(name);
    }
}