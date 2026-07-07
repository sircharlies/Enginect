import Time from "./Time";

export type LoopCallback = (time: Time) => void;

export default class Loop {
    private animationId = 0;
    private running = false;
    private paused = false;
    private readonly time = new Time();
    private readonly callback: LoopCallback;

    constructor(callback: LoopCallback) {
        this.callback = callback;
    }

    public start(): void {
        if (this.running) return;
        this.running = true;
        this.tick();
    }

    public stop(): void {
        this.running = false;
        this.paused = false;
        cancelAnimationFrame(this.animationId);
    }

    public setPaused(paused: boolean): void {
        this.paused = paused;
    }

    public isPaused(): boolean {
        return this.paused;
    }

    public getFps(): number {
        return this.time.fps;
    }

    private tick = (): void => {
        if (!this.running) return;
        if (this.paused) {
            this.animationId = requestAnimationFrame(this.tick);
            return;
        }

        this.time.update();
        this.callback(this.time);
        this.animationId = requestAnimationFrame(this.tick);
    };
}