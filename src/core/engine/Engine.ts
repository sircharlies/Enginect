import { Application } from "pixi.js";
import EngineConfig from "../config/EngineConfig";
import Renderer from "../graphics/Renderer";
import Scene from "../scene/Scene";
import Time from "./Time";
import Loop from "./Loop";
import type System from "../systems/System";
import World from "../world/World";
import RenderSystem from "../systems/RenderSystem";
import PhysicsSystem from "../systems/PhysicsSystem";
import CollisionSystem from "../systems/CollisionSystem";
import Vector2 from "../math/Vector2";

export interface EngineDebugInfo {
    fps: number;
    objectCount: number;
    paused: boolean;
    gravityX: number;
    gravityY: number;
}

export default class Engine {
    private renderer!: Renderer;
    private readonly loop: Loop;
    private readonly config: EngineConfig;
    private scene?: Scene;
    private readonly world: World;
    private readonly systems: System[] = [];
    private readonly physicsSystem: PhysicsSystem;
    private readonly collisionSystem: CollisionSystem;
    private readonly ready: Promise<void>;
    private debugListener?: (info: EngineDebugInfo) => void;

    constructor(canvas: HTMLCanvasElement, config = new EngineConfig()) {
        this.config = config;
        this.world = new World();
        this.physicsSystem = new PhysicsSystem();
        this.collisionSystem = new CollisionSystem(config.width, config.height);
        this.loop = new Loop(this.update);
        this.ready = this.initializePixi(canvas, config);
    }

    private async initializePixi(canvas: HTMLCanvasElement, config: EngineConfig): Promise<void> {
        const application = new Application();
        await application.init({
            view: canvas,
            width: config.width,
            height: config.height,
            backgroundAlpha: 0,
            antialias: true,
            resolution: window.devicePixelRatio ?? 1,
            autoDensity: true
        });

        this.renderer = new Renderer(application);
        this.systems.length = 0;
        this.systems.push(this.physicsSystem, this.collisionSystem, new RenderSystem(this.renderer));
    }

    public async start(scene: Scene): Promise<void> {
        await this.ready;
        this.scene = scene;
        this.scene.initialize(this.world);
        this.loop.start();
    }

    public stop(): void {
        this.loop.stop();
        this.scene?.destroy();
        this.renderer.destroy();
    }

    public pause(): void {
        this.loop.setPaused(true);
    }

    public resume(): void {
        this.loop.setPaused(false);
    }

    public setPaused(paused: boolean): void {
        this.loop.setPaused(paused);
    }

    public setGravity(gravity: Vector2): void {
        this.physicsSystem.setGravity(gravity);
    }

    public setDamping(value: number): void {
        this.physicsSystem.setDamping(value);
    }

    public setRestitution(value: number): void {
        this.collisionSystem.setRestitution(value);
    }

    public setDebugListener(listener?: (info: EngineDebugInfo) => void): void {
        this.debugListener = listener;
    }

    public reset(): void {
        this.world.clear();
        this.scene?.initialize(this.world);
    }

    public getDebugInfo(): EngineDebugInfo {
        return {
            fps: this.loop.getFps(),
            objectCount: this.world.count(),
            paused: this.loop.isPaused(),
            gravityX: this.physicsSystem.getGravity().x,
            gravityY: this.physicsSystem.getGravity().y
        };
    }

    private update = (time: Time): void => {
        if (!this.scene) return;

        for (const object of this.world.getObjects()) {
            if (object.active) {
                object.update(time);
            }
        }

        this.renderer.clear(this.config.background);
        for (const system of this.systems) {
            system.update(this.world, time);
        }

        this.debugListener?.({
            fps: time.fps,
            objectCount: this.world.count(),
            paused: this.loop.isPaused(),
            gravityX: this.physicsSystem.getGravity().x,
            gravityY: this.physicsSystem.getGravity().y
        });
    };
}