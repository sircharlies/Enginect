export default class Random {

    static range(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    static int(min: number, max: number): number {
        return Math.floor(this.range(min, max + 1));
    }

    static boolean(): boolean {
        return Math.random() >= 0.5;
    }

}