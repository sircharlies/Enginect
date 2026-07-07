import Scene from "../../core/scene/Scene";
import Rectangle from "../../core/objects/renderables/shapes/Rectangle";
import Ball from "./objects/Ball";

export default class BallScene extends Scene {
    protected start(): void {
        const ground = new Rectangle("Ground", 620, 28);
        ground.transform.position.set(320, 540);
        ground.color = "#4ade80";
        ground.isStatic = true;
        ground.restitution = 0.0;

        const platform = new Rectangle("Platform", 180, 20);
        platform.transform.position.set(360, 420);
        platform.color = "#f59e0b";
        platform.isStatic = true;
        platform.restitution = 0.0;

        this.world.add(ground);
        this.world.add(platform);

        this.world.add(new Ball(180, 90, 220, -40));
        this.world.add(new Ball(320, 120, -180, 70));
        this.world.add(new Ball(460, 80, 140, 20));
        this.world.add(new Ball(240, 40, 260, 120));
    }
}