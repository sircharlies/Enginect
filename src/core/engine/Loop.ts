import Time from "./Time";

export type LoopCallback = (time: Time) => void;

export default class Loop {

    private animationId = 0;
    private running = false;
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
        cancelAnimationFrame(this.animationId);
    }

    private tick = (): void => {
        if (!this.running) return;

        this.time.update();
        this.callback(this.time);
        this.animationId = requestAnimationFrame(this.tick);
    };
}