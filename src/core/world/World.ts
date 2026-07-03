import GameObject from "../objects/GameObject";

export default class World {
    private readonly objects: GameObject[] = [];

    public add(object: GameObject): void {
        this.objects.push(object);
    }

    public remove(object: GameObject): void {
        const index = this.objects.indexOf(object);
        if (index >= 0) {
            this.objects.splice(index, 1);
        }
    }

    public clear(): void {
        this.objects.length = 0;
    }

    public count(): number {
        return this.objects.length;
    }

    public getObjects(): readonly GameObject[] {
        return this.objects;
    }
}