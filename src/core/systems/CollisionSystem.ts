import Time from "../engine/Time";
import PhysicsRenderable from "../objects/renderables/PhysicsRenderable";
import Circle from "../objects/renderables/shapes/Circle";
import Rectangle from "../objects/renderables/shapes/Rectangle";
import World from "../world/World";
import System from "./System";

export default class CollisionSystem extends System {
    private readonly width: number;
    private readonly height: number;
    private restitution = 0.95;

    constructor(width: number, height: number) {
        super();
        this.width = width;
        this.height = height;
    }

    public update(world: World, _time: Time): void {
        const objects = world.getObjects();
        const dynamicObjects = objects.filter(
            (object): object is PhysicsRenderable => object.active && object instanceof PhysicsRenderable && object.collisionEnabled
        );

        for (const object of dynamicObjects) {
            this.resolveWorldBounds(object);
        }

        for (let index = 0; index < dynamicObjects.length; index += 1) {
            for (let otherIndex = index + 1; otherIndex < dynamicObjects.length; otherIndex += 1) {
                const first = dynamicObjects[index];
                const second = dynamicObjects[otherIndex];
                this.resolveCollision(first, second);
            }
        }
    }

    public setRestitution(value: number): void {
        this.restitution = Math.max(0, Math.min(1, value));
    }

    private resolveWorldBounds(object: PhysicsRenderable): void {
        if (object.isStatic) {
            return;
        }

        if (object instanceof Circle) {
            const radius = object.radius;
            const minX = radius;
            const maxX = this.width - radius;
            const minY = radius;
            const maxY = this.height - radius;

            if (object.transform.position.x < minX) {
                object.transform.position.x = minX;
                if (object.velocity.x < 0) {
                    object.velocity.x *= -this.restitution;
                }
            } else if (object.transform.position.x > maxX) {
                object.transform.position.x = maxX;
                if (object.velocity.x > 0) {
                    object.velocity.x *= -this.restitution;
                }
            }

            if (object.transform.position.y < minY) {
                object.transform.position.y = minY;
                if (object.velocity.y < 0) {
                    object.velocity.y *= -this.restitution;
                }
            } else if (object.transform.position.y > maxY) {
                object.transform.position.y = maxY;
                if (object.velocity.y > 0) {
                    object.velocity.y *= -this.restitution;
                }
            }
            return;
        }

        if (object instanceof Rectangle) {
            const halfWidth = object.width / 2;
            const halfHeight = object.height / 2;
            const minX = halfWidth;
            const maxX = this.width - halfWidth;
            const minY = halfHeight;
            const maxY = this.height - halfHeight;

            if (object.transform.position.x < minX) {
                object.transform.position.x = minX;
                if (object.velocity.x < 0) {
                    object.velocity.x *= -this.restitution;
                }
            } else if (object.transform.position.x > maxX) {
                object.transform.position.x = maxX;
                if (object.velocity.x > 0) {
                    object.velocity.x *= -this.restitution;
                }
            }

            if (object.transform.position.y < minY) {
                object.transform.position.y = minY;
                if (object.velocity.y < 0) {
                    object.velocity.y *= -this.restitution;
                }
            } else if (object.transform.position.y > maxY) {
                object.transform.position.y = maxY;
                if (object.velocity.y > 0) {
                    object.velocity.y *= -this.restitution;
                }
            }
        }
    }

    private resolveCollision(first: PhysicsRenderable, second: PhysicsRenderable): void {
        if (first instanceof Circle && second instanceof Circle) {
            this.resolveCircleCollision(first, second);
            return;
        }

        if (first instanceof Circle && second instanceof Rectangle) {
            this.resolveCircleRectangleCollision(first, second);
            return;
        }

        if (first instanceof Rectangle && second instanceof Circle) {
            this.resolveCircleRectangleCollision(second, first);
            return;
        }

        if (first instanceof Rectangle && second instanceof Rectangle) {
            this.resolveRectangleCollision(first, second);
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

        if (!first.isStatic && !second.isStatic) {
            first.transform.position.x -= normalX * correction;
            first.transform.position.y -= normalY * correction;
            second.transform.position.x += normalX * correction;
            second.transform.position.y += normalY * correction;
        } else if (!first.isStatic) {
            first.transform.position.x -= normalX * overlap;
            first.transform.position.y -= normalY * overlap;
        } else if (!second.isStatic) {
            second.transform.position.x += normalX * overlap;
            second.transform.position.y += normalY * overlap;
        }

        const relativeVelocityX = second.velocity.x - first.velocity.x;
        const relativeVelocityY = second.velocity.y - first.velocity.y;
        const velocityAlongNormal = relativeVelocityX * normalX + relativeVelocityY * normalY;

        if (velocityAlongNormal >= 0) {
            return;
        }

        const inverseMassFirst = first.mass > 0 ? 1 / first.mass : 0;
        const inverseMassSecond = second.mass > 0 ? 1 / second.mass : 0;
        const restitution = Math.min(first.restitution, second.restitution, this.restitution);
        const impulse = -(1 + restitution) * velocityAlongNormal / (inverseMassFirst + inverseMassSecond || 1);

        const impulseX = impulse * normalX;
        const impulseY = impulse * normalY;

        if (!first.isStatic) {
            first.velocity.x -= impulseX * inverseMassFirst;
            first.velocity.y -= impulseY * inverseMassFirst;
        }

        if (!second.isStatic) {
            second.velocity.x += impulseX * inverseMassSecond;
            second.velocity.y += impulseY * inverseMassSecond;
        }
    }

    private resolveCircleRectangleCollision(circle: Circle, rectangle: Rectangle): void {
        if (circle.isStatic) {
            return;
        }

        const centerX = circle.transform.position.x - rectangle.transform.position.x;
        const centerY = circle.transform.position.y - rectangle.transform.position.y;
        const halfWidth = rectangle.width / 2;
        const halfHeight = rectangle.height / 2;

        const closestX = Math.max(-halfWidth, Math.min(halfWidth, centerX));
        const closestY = Math.max(-halfHeight, Math.min(halfHeight, centerY));
        const deltaX = centerX - closestX;
        const deltaY = centerY - closestY;
        const distanceSquared = deltaX * deltaX + deltaY * deltaY;

        if (distanceSquared > circle.radius * circle.radius) {
            return;
        }

        const distance = Math.sqrt(distanceSquared) || 0.0001;
        const normalX = deltaX / distance;
        const normalY = deltaY / distance;
        const overlap = circle.radius - distance;

        circle.transform.position.x += normalX * overlap;
        circle.transform.position.y += normalY * overlap;

        const relativeVelocityX = circle.velocity.x - rectangle.velocity.x;
        const relativeVelocityY = circle.velocity.y - rectangle.velocity.y;
        const velocityAlongNormal = relativeVelocityX * normalX + relativeVelocityY * normalY;

        if (velocityAlongNormal >= 0) {
            return;
        }

        const restitution = Math.min(circle.restitution, rectangle.restitution, this.restitution);
        const impulse = -(1 + restitution) * velocityAlongNormal;

        circle.velocity.x -= impulse * normalX;
        circle.velocity.y -= impulse * normalY;
    }

    private resolveRectangleCollision(first: Rectangle, second: Rectangle): void {
        if (first.isStatic && second.isStatic) {
            return;
        }

        const deltaX = second.transform.position.x - first.transform.position.x;
        const deltaY = second.transform.position.y - first.transform.position.y;
        const combinedHalfWidth = first.width / 2 + second.width / 2;
        const combinedHalfHeight = first.height / 2 + second.height / 2;

        if (Math.abs(deltaX) >= combinedHalfWidth || Math.abs(deltaY) >= combinedHalfHeight) {
            return;
        }

        const overlapX = combinedHalfWidth - Math.abs(deltaX);
        const overlapY = combinedHalfHeight - Math.abs(deltaY);

        if (overlapX < overlapY) {
            const normalX = deltaX > 0 ? 1 : -1;
            const correction = overlapX;
            if (!first.isStatic) {
                first.transform.position.x -= normalX * correction;
            }
            if (!second.isStatic) {
                second.transform.position.x += normalX * correction;
            }
            const relativeVelocityX = second.velocity.x - first.velocity.x;
            if (relativeVelocityX * normalX < 0) {
                if (!first.isStatic) {
                    first.velocity.x *= -this.restitution;
                }
                if (!second.isStatic) {
                    second.velocity.x *= -this.restitution;
                }
            }
        } else {
            const normalY = deltaY > 0 ? 1 : -1;
            const correction = overlapY;
            if (!first.isStatic) {
                first.transform.position.y -= normalY * correction;
            }
            if (!second.isStatic) {
                second.transform.position.y += normalY * correction;
            }
            const relativeVelocityY = second.velocity.y - first.velocity.y;
            if (relativeVelocityY * normalY < 0) {
                if (!first.isStatic) {
                    first.velocity.y *= -this.restitution;
                }
                if (!second.isStatic) {
                    second.velocity.y *= -this.restitution;
                }
            }
        }
    }
}
