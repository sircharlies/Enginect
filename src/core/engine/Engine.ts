import EngineConfig from "../config/EngineConfig";
import Renderer from "../graphics/Renderer";
import Scene from "../scene/Scene";
import Time from "./Time";
import Loop from "./Loop";
import type System from "../systems/System";
import World from "../world/World";
import RenderSystem from "../systems/RenderSystem";
import PhysicsSystem from "../systems/PhysicsSystem";

export default class Engine {

    private readonly canvas: HTMLCanvasElement;
    private readonly renderer: Renderer;
    private readonly loop: Loop;
    private readonly config: EngineConfig;
    private scene?: Scene;
    private readonly world: World;
    private readonly systems: System[] = [];

    constructor(canvas: HTMLCanvasElement, config = new EngineConfig()) {
        this.canvas = canvas;
        this.config = config;
        canvas.width = config.width;
        canvas.height = config.height;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
            throw new Error("CanvasRenderingContext2D não encontrado.");
        }

        this.renderer = new Renderer(ctx);
        this.world = new World();
        this.systems.push(
            new PhysicsSystem(),
            new RenderSystem(this.renderer)
        );
        this.loop = new Loop(this.update);
    }

    public start(scene: Scene): void {
        this.scene = scene;
        this.scene.initialize(this.world);
        this.loop.start();
    }

    public stop(): void {
        this.loop.stop();
        this.scene?.destroy();
    }

    private update = (time: Time): void => {
        if (!this.scene) return;
        this.renderer.clear(this.config.background);
        for (const system of this.systems) {
            system.update(
                this.world,
                time
            );
        }
    };
}