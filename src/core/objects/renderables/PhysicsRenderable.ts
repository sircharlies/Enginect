import Time from "../../engine/Time";
import Vector2 from "../../math/Vector2";
import Renderable from "./Renderable";

export default abstract class PhysicsRenderable extends Renderable {
    public velocity: Vector2;
    public acceleration: Vector2;
    public mass = 1;
    public useGravity = false;
    public isStatic = false;
    public collisionEnabled = true;
    public restitution = 0.95;
    public damping = 0.999;
    public drag = 0;

    constructor(name: string) {
        super(name);
        this.velocity = Vector2.zero();
        this.acceleration = Vector2.zero();
    }

    public update(_time: Time): void {
    }

    public addForce(force: Vector2): void {
        const inverseMass = this.mass > 0 ? 1 / this.mass : 0;
        this.acceleration.add(force.clone().multiply(inverseMass));
    }
}