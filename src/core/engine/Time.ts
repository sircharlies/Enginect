export default class Time {
    /**
     * Tempo entre o frame atual e o anterior (em segundos).
     */
    public deltaTime = 0;

    /**
     * Tempo desde que a aplicação iniciou (em segundos).
     */
    public elapsedTime = 0;

    /**
     * FPS atual.
     */
    public fps = 0;

    private lastFrameTime = performance.now();
    private frameCount = 0;
    private fpsTimer = 0;

    public update(): void {
        const now = performance.now();

        this.deltaTime = (now - this.lastFrameTime) / 1000;

        this.lastFrameTime = now;

        this.elapsedTime += this.deltaTime;

        this.frameCount++;
        this.fpsTimer += this.deltaTime;

        if (this.fpsTimer >= 1) {
            this.fps = this.frameCount;

            this.frameCount = 0;
            this.fpsTimer = 0;
        }
    }
}