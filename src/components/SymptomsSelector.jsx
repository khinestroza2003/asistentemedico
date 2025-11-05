import { useState } from "react";

export default function SymptomsSelector({ symptoms: initialSymptoms } = {}) {
  const defaultSymptoms = [
    "Fiebre",
    "Tos",
    "Dolor de cabeza",
    "Náusea",
    "Mareo",
    "Fatiga",
    "Dolor abdominal",
    "Pérdida de olfato",
    "Dificultad para respirar",
  ];

  const symptoms = initialSymptoms && initialSymptoms.length ? initialSymptoms : defaultSymptoms;

  const [selected, setSelected] = useState([]);

  function toggle(symptom) {
    setSelected((prev) => {
      if (prev.includes(symptom)) return prev.filter((s) => s !== symptom);
      return [...prev, symptom];
    });
  }

  function remove(symptom) {
    setSelected((prev) => prev.filter((s) => s !== symptom));
  }

  return (


    <div className="symptoms-selector" style={{ textAlign: "left", borderInline: "2px solid #000000ff", padding: "2rem", borderRadius: "8px" }}>
      <h3>Selecciona los síntomas</h3>

      <div className="symptom-list" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {symptoms.map((s) => (
          <label key={s} className="symptom-item" style={{ display: "flex", alignItems: "center", gap: "0.5rem", minWidth: "200px" }}>
            <input
              type="checkbox"
              checked={selected.includes(s)}
              onChange={() => toggle(s)}
            />
            <span>{s}</span>
          </label>
        ))}
      </div>

      <div className="selected-area" style={{ marginTop: "1rem" }}>
        <h4>Síntomas seleccionados</h4>
        {selected.length === 0 ? (
          <p style={{ color: "#666" }}>No has seleccionado síntomas.</p>
        ) : (
          <div className="selected-list" style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {selected.map((s) => (
              <div key={s} className="symptom-chip" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 0.6rem", background: "#e6f7ff", border: "1px solid #b3e5ff", borderRadius: "999px" }}>
                <span>{s}</span>
                <button type="button" aria-label={`Eliminar ${s}`} onClick={() => remove(s)} style={{ background: "transparent", border: "none", cursor: "pointer", fontWeight: "700" }}>×</button>
                 <br />
              </div>

            ))}

            
          </div>
        )}
        <br />
        <br />  
        <div> 
                <button type= "button" style={{color: "black", borderRadius: "30 px", backgroundColor: "#9dd1efff"}}>Siguiente </button>
            </div>
      </div>
    </div>

  );
}
