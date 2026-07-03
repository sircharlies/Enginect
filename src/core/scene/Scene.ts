import World from "../world/World";

export default abstract class Scene {
    protected world!: World;

    public initialize(world: World): void {
        this.world = world;
        this.start();
    }

    protected abstract start(): void;

    public destroy(): void {
    }
}