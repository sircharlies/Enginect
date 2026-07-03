import Scene from "../../core/scene/Scene";
import Ball from "./objects/Ball";

export default class BallScene extends Scene {
    protected start(): void {
        this.world.add(
            new Ball()
        );
    }
}