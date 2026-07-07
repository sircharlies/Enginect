import { Application, Container, Graphics, Color } from "pixi.js";

export default class Renderer {
    private readonly app: Application;
    private readonly stage: Container;

    constructor(app: Application) {
        this.app = app;
        this.stage = new Container();
        this.app.stage.addChild(this.stage);
    }

    clear(color = "#111"): void {
        this.stage.removeChildren();
        this.app.renderer.background.color = new Color(color).toNumber();
    }

    circle(x: number, y: number, radius: number, color = "white"): void {
        const graphics = new Graphics();
        graphics.beginFill(new Color(color).toNumber());
        graphics.drawCircle(0, 0, radius);
        graphics.endFill();
        graphics.position.set(x, y);
        this.stage.addChild(graphics);
    }

    rect(x: number, y: number, width: number, height: number, color = "white"): void {
        const graphics = new Graphics();
        graphics.beginFill(new Color(color).toNumber());
        graphics.drawRect(0, 0, width, height);
        graphics.endFill();
        graphics.position.set(x, y);
        this.stage.addChild(graphics);
    }

    destroy(): void {
        this.stage.removeChildren();
        this.app.destroy(true, { children: true });
    }
}