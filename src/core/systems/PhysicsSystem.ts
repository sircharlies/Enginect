import PhysicsRenderable from "../objects/renderables/PhysicsRenderable";
import Time from "../engine/Time";
import Vector2 from "../math/Vector2";
import World from "../world/World";
import System from "./System";

export default class PhysicsSystem extends System {
    private readonly gravity = new Vector2(0, 220);
    private readonly fixedTimeStep = 1 / 120;
    private accumulator = 0;
    private damping = 0.999;

    public update(world: World, time: Time): void {
        this.accumulator += Math.min(time.deltaTime, 0.25);

        while (this.accumulator >= this.fixedTimeStep) {
            this.step(world, this.fixedTimeStep);
            this.accumulator -= this.fixedTimeStep;
        }
    }

    public setGravity(gravity: Vector2): void {
        this.gravity.set(gravity.x, gravity.y);
    }

    public getGravity(): Vector2 {
        return this.gravity;
    }

    public setDamping(value: number): void {
        this.damping = Math.max(0.85, Math.min(1, value));
    }

    private step(world: World, deltaTime: number): void {
        for (const object of world.getObjects()) {
            if (!(object instanceof PhysicsRenderable) || !object.active || object.isStatic) {
                continue;
            }

            if (object.useGravity) {
                object.addForce(this.gravity);
            }

            object.velocity.add(object.acceleration.clone().multiply(deltaTime));
            object.velocity.multiply(Math.pow(this.damping * object.damping, deltaTime * 60));
            object.velocity.multiply(1 - object.drag * deltaTime);
            object.transform.position.add(object.velocity.clone().multiply(deltaTime));
            object.acceleration.set(0, 0);
        }
    }
}