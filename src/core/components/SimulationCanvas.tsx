import { useEffect, useMemo, useRef, useState } from "react";
import Engine, { type EngineDebugInfo } from "../engine/Engine";
import Scene from "../scene/Scene";
import Vector2 from "../math/Vector2";

interface SimulationCanvasProps {
    scene: Scene;
}

export default function SimulationCanvas({ scene }: SimulationCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const engineRef = useRef<Engine | null>(null);
    const [paused, setPaused] = useState(false);
    const [gravity, setGravity] = useState(220);
    const [damping, setDamping] = useState(0.999);
    const [restitution, setRestitution] = useState(0.95);
    const [debugInfo, setDebugInfo] = useState<EngineDebugInfo>({
        fps: 0,
        objectCount: 0,
        paused: false,
        gravityX: 0,
        gravityY: 220
    });

    const sceneKey = useMemo(() => scene, [scene]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const engine = new Engine(canvas);
        engineRef.current = engine;
        engine.setDebugListener((info) => setDebugInfo(info));
        void engine.start(sceneKey);

        return () => {
            engine.stop();
            engineRef.current = null;
        };
    }, [sceneKey]);

    useEffect(() => {
        engineRef.current?.setPaused(paused);
    }, [paused]);

    useEffect(() => {
        engineRef.current?.setGravity(new Vector2(0, gravity));
    }, [gravity]);

    useEffect(() => {
        engineRef.current?.setDamping(damping);
    }, [damping]);

    useEffect(() => {
        engineRef.current?.setRestitution(restitution);
    }, [restitution]);

    return (
        <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", background: "#111" }}>
            <canvas ref={canvasRef} style={{ width: "100vw", height: "100vh", display: "block" }} />
            <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(9, 12, 24, 0.85)", color: "#f3f4f6", padding: 12, borderRadius: 12, minWidth: 260, border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 10px 30px rgba(0,0,0,0.25)" }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Controles de simulação</div>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                    <button onClick={() => setPaused((value) => !value)}>{paused ? "Continuar" : "Pausar"}</button>
                    <button onClick={() => engineRef.current?.reset()}>Resetar</button>
                </div>
                <label style={{ display: "block", fontSize: 12, marginBottom: 6 }}>
                    Gravidade: {gravity}
                    <input type="range" min="0" max="600" value={gravity} onChange={(event) => setGravity(Number(event.target.value))} style={{ width: "100%", marginTop: 4 }} />
                </label>
                <label style={{ display: "block", fontSize: 12, marginBottom: 6 }}>
                    Amortecimento: {damping.toFixed(3)}
                    <input type="range" min="0.85" max="1" step="0.001" value={damping} onChange={(event) => setDamping(Number(event.target.value))} style={{ width: "100%", marginTop: 4 }} />
                </label>
                <label style={{ display: "block", fontSize: 12 }}>
                    Restituição: {restitution.toFixed(2)}
                    <input type="range" min="0" max="1" step="0.01" value={restitution} onChange={(event) => setRestitution(Number(event.target.value))} style={{ width: "100%", marginTop: 4 }} />
                </label>
                <div style={{ marginTop: 10, fontSize: 12, color: "#cbd5e1" }}>
                    <div>FPS: {debugInfo.fps}</div>
                    <div>Objetos: {debugInfo.objectCount}</div>
                    <div>Estado: {paused ? "Pausado" : "Rodando"}</div>
                </div>
            </div>
        </div>
    );
}