import World from "../world/World";
import Time from "../engine/Time";

export default abstract class System {
    public abstract update(
        world: World,
        time: Time
    ): void;
}