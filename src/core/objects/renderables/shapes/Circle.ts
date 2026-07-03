import Renderer from "../../../graphics/Renderer";
import Shape from "./Shape";

export default class Circle extends Shape {
    public radius: number;

    constructor(name: string, radius: number) {
        super(name);
        this.radius = radius;
    }

    public render(renderer: Renderer): void {
        renderer.circle(this.transform.position.x, this.transform.position.y, this.radius, this.color);
    }
}