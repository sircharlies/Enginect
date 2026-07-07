import Time from "../engine/Time";
import Transform from "../math/Transform";

export default abstract class GameObject {

    public name: string;
    public active = true;
    public readonly transform: Transform;

    constructor(name: string) {
        this.name = name;
        this.transform = new Transform();
    }

    public abstract update(time: Time): void;
}