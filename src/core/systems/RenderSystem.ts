import Renderer from "../graphics/Renderer";
import Time from "../engine/Time";
import Renderable from "../objects/renderables/Renderable";
import System from "./System";
import World from "../world/World";

export default class RenderSystem extends System {

    private readonly renderer: Renderer;

    constructor(renderer: Renderer) {
        super();
        this.renderer = renderer;
    }

    public update(world: World, time: Time): void {
        const objects = world.getObjects();

        for (const object of objects) {
            if (!(object instanceof Renderable)) {
                continue;
            }

            if (!object.visible) {
                continue;
            }

            object.render(this.renderer);
        }
    }
}