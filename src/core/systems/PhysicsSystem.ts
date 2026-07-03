import PhysicsRenderable from "../objects/renderables/PhysicsRenderable";
import Time from "../engine/Time";
import World from "../world/World";
import System from "./System";

export default class PhysicsSystem extends System {

    public update(world: World, time: Time): void {

        for (const object of world.getObjects()) {

            if (!(object instanceof PhysicsRenderable)) {
                continue;
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