import PhysicsRenderable from "../objects/renderables/PhysicsRenderable";
import Time from "../engine/Time";
import Vector2 from "../math/Vector2";
import World from "../world/World";
import System from "./System";

export default class PhysicsSystem extends System {
    private readonly gravity = new Vector2(0, 220);

    public update(world: World, time: Time): void {
        for (const object of world.getObjects()) {
            if (!(object instanceof PhysicsRenderable) || !object.active) {
                continue;
            }

            if (object.useGravity) {
                object.addForce(this.gravity);
            }

            object.velocity.add(
                object.acceleration.clone().multiply(time.deltaTime)
            );

            object.transform.position.add(
                object.velocity.clone().multiply(time.deltaTime)
            );

            object.acceleration.set(0, 0);
        }
    }
}