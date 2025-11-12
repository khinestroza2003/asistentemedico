import { useState, useMemo, useEffect } from "react";
import "./SymptomsSelector.css";

export default function SymptomsSelector({ symptoms: initialSymptoms } = {}) {
  const [symptoms, setSymptoms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Cargar síntomas desde la API
  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8080/api/diagnostico/sintomas");
        if (!response.ok) {
          throw new Error("Error al cargar los síntomas");
        }
        const data = await response.json();
        // Si la respuesta es un array de objetos con propiedad 'nombre', extrae los nombres
        const symptomsList = Array.isArray(data)
          ? data.map((item) => (typeof item === "string" ? item : item.nombre || item.sintoma))
          : [];
        setSymptoms(symptomsList);
        setError(null);
      } catch (err) {
        console.error("Error fetching symptoms:", err);
        setError("No se pudieron cargar los síntomas");
        setSymptoms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSymptoms();
  }, []);

  // Filtrar síntomas basado en la búsqueda
  const filteredSuggestions = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const lowerSearch = searchTerm.toLowerCase();
    return symptoms.filter(
      (symptom) =>
        symptom.toLowerCase().includes(lowerSearch) &&
        !selected.includes(symptom)
    );
  }, [searchTerm, selected, symptoms]);

  function toggle(symptom) {
    setSelected((prev) => {
      if (prev.includes(symptom)) return prev.filter((s) => s !== symptom);
      return [...prev, symptom];
    });
    setSearchTerm("");
    setShowSuggestions(false);
  }

  function remove(symptom) {
    setSelected((prev) => prev.filter((s) => s !== symptom));
  }

  function handleSuggestionClick(symptom) {
    toggle(symptom);
  }

  return (
    <div className="symptoms-selector">
      <h3>Encuentra tu diagnóstico</h3>
      <p style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: "15px", marginBottom: "1rem", fontWeight: "400" }}>
        Busca los síntomas que experimentas para obtener un diagnóstico personalizado
      </p>

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <span>Cargando síntomas...</span>
        </div>
      )}

      {error && (
        <div className="error-container">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Barra de búsqueda tipo Google */}
          <div className="search-container">
            <div className="search-box">
              <input
                type="text"
                placeholder="Escribe un síntoma (ej: fiebre, dolor de cabeza)..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="search-input"
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setShowSuggestions(false);
                  }}
                  className="clear-btn"
                  aria-label="Limpiar búsqueda"
                  title="Limpiar búsqueda"
                >
                  ×
                </button>
              )}
            </div>

            {/* Sugerencias desplegables */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="suggestions-dropdown">
                {filteredSuggestions.slice(0, 8).map((symptom) => (
                  <div
                    key={symptom}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(symptom)}
                  >
                    <span className="suggestion-icon">→</span>
                    <span className="suggestion-text">{symptom}</span>
                  </div>
                ))}
              </div>
            )}

            {showSuggestions && searchTerm && filteredSuggestions.length === 0 && (
              <div className="suggestions-dropdown">
                <div className="no-results">
                  No encontramos ese síntoma. Intenta con otro término.
                </div>
              </div>
            )}
          </div>

          {/* Síntomas seleccionados */}
          <div className="selected-area">
            <h4>
              {selected.length === 0
                ? "Selecciona síntomas para comenzar"
                : `Síntomas seleccionados (${selected.length})`}
            </h4>
            {selected.length === 0 ? (
              <div className="empty-state">
                Busca y selecciona los síntomas que experimentas para continuar
              </div>
            ) : (
              <>
                <div className="selected-list">
                  {selected.map((s) => (
                    <div key={s} className="symptom-chip">
                      <span>{s}</span>
                      <button
                        type="button"
                        aria-label={`Eliminar ${s}`}
                        onClick={() => remove(s)}
                        title={`Eliminar ${s}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="next-button"
                  onClick={() => console.log("Síntomas seleccionados:", selected)}
                >
                  Analizar síntomas
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
