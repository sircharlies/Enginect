export default class Color {

    static rgb(r: number, g: number, b: number): string {
        return `rgb(${r}, ${g}, ${b})`;
    }

    static rgba(r: number, g: number, b: number, a: number): string {
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

}