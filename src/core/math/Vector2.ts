export default class Vector2 {
    public x: number;
    public y: number;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    set(x: number, y: number): Vector2 {
        this.x = x;
        this.y = y;

        return this;
    }

    add(vector: Vector2): Vector2 {
        this.x += vector.x;
        this.y += vector.y;

        return this;
    }

    subtract(vector: Vector2): Vector2 {
        this.x -= vector.x;
        this.y -= vector.y;

        return this;
    }

    multiply(value: number): Vector2 {
        this.x *= value;
        this.y *= value;

        return this;
    }

    divide(value: number): Vector2 {
        this.x /= value;
        this.y /= value;

        return this;
    }

    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize(): Vector2 {
        const len = this.length();

        if (len === 0) return this;

        this.x /= len;
        this.y /= len;

        return this;
    }

    distance(vector: Vector2): number {
        const dx = this.x - vector.x;
        const dy = this.y - vector.y;

        return Math.sqrt(dx * dx + dy * dy);
    }

    static zero(): Vector2 {
        return new Vector2(0, 0);
    }
}