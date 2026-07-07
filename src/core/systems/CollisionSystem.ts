import Time from "../engine/Time";
import PhysicsRenderable from "../objects/renderables/PhysicsRenderable";
import Circle from "../objects/renderables/shapes/Circle";
import World from "../world/World";
import System from "./System";

export default class CollisionSystem extends System {
    private readonly width: number;
    private readonly height: number;

    constructor(width: number, height: number) {
        super();
        this.width = width;
        this.height = height;
    }

    public update(world: World, _time: Time): void {
        const objects = world.getObjects();
        const dynamicObjects = objects.filter(
            (object): object is PhysicsRenderable => object.active && object instanceof PhysicsRenderable
        );

        for (const object of dynamicObjects) {
            this.resolveWorldBounds(object);
        }

        for (let index = 0; index < dynamicObjects.length; index += 1) {
            for (let otherIndex = index + 1; otherIndex < dynamicObjects.length; otherIndex += 1) {
                const first = dynamicObjects[index];
                const second = dynamicObjects[otherIndex];

                if (!(first instanceof Circle) || !(second instanceof Circle)) {
                    continue;
                }

                this.resolveCircleCollision(first, second);
            }
        }
    }

    private resolveWorldBounds(object: PhysicsRenderable): void {
        const radius = object instanceof Circle ? object.radius : 0;
        const minX = radius;
        const maxX = this.width - radius;
        const minY = radius;
        const maxY = this.height - radius;

        if (object.transform.position.x < minX) {
            object.transform.position.x = minX;
            if (object.velocity.x < 0) {
                object.velocity.x *= -0.9;
            }
        } else if (object.transform.position.x > maxX) {
            object.transform.position.x = maxX;
            if (object.velocity.x > 0) {
                object.velocity.x *= -0.9;
            }
        }

        if (object.transform.position.y < minY) {
            object.transform.position.y = minY;
            if (object.velocity.y < 0) {
                object.velocity.y *= -0.9;
            }
        } else if (object.transform.position.y > maxY) {
            object.transform.position.y = maxY;
            if (object.velocity.y > 0) {
                object.velocity.y *= -0.9;
            }
        }
    }

    private resolveCircleCollision(first: Circle, second: Circle): void {
        const deltaX = second.transform.position.x - first.transform.position.x;
        const deltaY = second.transform.position.y - first.transform.position.y;
        const distance = Math.hypot(deltaX, deltaY);
        const minDistance = first.radius + second.radius;

        if (distance === 0 || distance >= minDistance) {
            return;
        }

        const normalX = deltaX / distance;
        const normalY = deltaY / distance;
        const overlap = minDistance - distance;
        const correction = overlap / 2;

        first.transform.position.x -= normalX * correction;
        first.transform.position.y -= normalY * correction;
        second.transform.position.x += normalX * correction;
        second.transform.position.y += normalY * correction;

        const relativeVelocityX = second.velocity.x - first.velocity.x;
        const relativeVelocityY = second.velocity.y - first.velocity.y;
        const velocityAlongNormal = relativeVelocityX * normalX + relativeVelocityY * normalY;

        if (velocityAlongNormal >= 0) {
            return;
        }

        const restitution = 0.95;
        const inverseMassFirst = 1 / first.mass;
        const inverseMassSecond = 1 / second.mass;
        const impulse = -(1 + restitution) * velocityAlongNormal / (inverseMassFirst + inverseMassSecond);

        const impulseX = impulse * normalX;
        const impulseY = impulse * normalY;

        first.velocity.x -= impulseX * inverseMassFirst;
        first.velocity.y -= impulseY * inverseMassFirst;
        second.velocity.x += impulseX * inverseMassSecond;
        second.velocity.y += impulseY * inverseMassSecond;
    }
}
