import { useEffect, useRef } from "react";

import Engine from "../engine/Engine";
import Scene from "../scene/Scene";

interface SimulationCanvasProps {
    scene: Scene;
}

export default function SimulationCanvas({ scene }: SimulationCanvasProps) {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) return;
        
        const engine = new Engine(canvas);
        engine.start(scene);
        
        return () => engine.stop();
    }, [scene]);

    return (
        <canvas
            ref={canvasRef}
            style={{ width: "100vw", height: "100vh", display: "block" }}
        />
    );
}