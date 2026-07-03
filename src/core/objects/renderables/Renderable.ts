import Renderer from "../../graphics/Renderer";
import GameObject from "../GameObject";

export default abstract class Renderable extends GameObject {
    public visible = true;
    public color = "#FFFFFF";
    public opacity = 1;
    public layer = 0;

    public abstract render(renderer: Renderer): void;
}