
import SymptomsSelector from "./SymptomsSelector";

export default function Login() {
    return (
        <div className="LoginForm">
            <h2>Bienvenido, ¿puedes decirnos qué síntomas presentas?</h2>
            <br />

            <div style={{ maxWidth: 840, margin: "0 auto" }}>
                <SymptomsSelector />
            </div>
        </div>
    );
}