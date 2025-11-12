
import SymptomsSelector from "./SymptomsSelector";
import "./Login.css";

export default function Login() {
    return (
        <div className="login-container">
            <div className="login-background">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>

            <div className="login-content">
                <div className="login-header">
                    <div className="logo-circle">
                        <span className="logo-icon">⚕️</span>
                    </div>
                    <h1 className="login-title">Asistente Médico</h1>
                    <p className="login-subtitle">
                        Tu compañero inteligente de salud
                    </p>
                </div>

                <div className="login-welcome">
                    <h2>Bienvenido de nuevo</h2>
                    <p>
                        Cuéntanos qué síntomas presentas y obtendremos un diagnóstico personalizado para ti
                    </p>
                </div>

                <div className="symptoms-wrapper">
                    <SymptomsSelector />
                </div>
            </div>

            <div className="login-footer">
                <p>
                    Este diagnóstico es orientativo. Consulta siempre con un profesional médico.
                </p>
            </div>
        </div>
    );
}