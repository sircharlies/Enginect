import Renderer from "../../../graphics/Renderer";
import Shape from "./Shape";

export default class Rectangle extends Shape {
    public width: number;
    public height: number;

    constructor(name: string, width: number, height: number) {
        super(name);
        this.width = width;
        this.height = height;
    }

    public render(renderer: Renderer): void {
        const x = this.transform.position.x - this.width / 2;
        const y = this.transform.position.y - this.height / 2;
        renderer.rect(x, y, this.width, this.height, this.color);
    }
}
