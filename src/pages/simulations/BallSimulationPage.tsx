import SimulationCanvas from "../../core/components/SimulationCanvas";
import BallScene from "../../simulations/balls/BallScene";

export default function BallSimulationPage() {
    return (
        <SimulationCanvas
            scene={new BallScene()}
        />
    );
}