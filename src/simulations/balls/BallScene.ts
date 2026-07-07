import Scene from "../../core/scene/Scene";
import Ball from "./objects/Ball";

export default class BallScene extends Scene {
    protected start(): void {
        this.world.add(new Ball(180, 90, 220, 40));
        this.world.add(new Ball(320, 120, -180, 70));
        this.world.add(new Ball(460, 80, 140, 20));
    }
}