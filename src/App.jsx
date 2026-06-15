import { useState } from "react";

const REMOTE_API_BASE =
  import.meta.env.VITE_API_BASE ||
  "https://p01--example--fynyvxxwv6zn.code.run";
const operations = [
  { key: "add", label: "Sumar" },
  { key: "subtract", label: "Restar" },
  { key: "multiply", label: "Multiplicar" },
  { key: "divide", label: "Dividir" },
  { key: "power", label: "Potencia" },
];

function App() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState(null);
  const [operation, setOperation] = useState("add");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [requestUrl, setRequestUrl] = useState("");

  const buildUrl = (operation) => {
    const path = `/calc/${operation}?a=${encodeURIComponent(a)}&b=${encodeURIComponent(b)}`;
    if (import.meta.env.DEV) {
      return path;
    }
    return `${REMOTE_API_BASE}${path}`;
  };

  const calculate = async () => {
    setError("");
    setResult(null);
    setRequestUrl("");

    if (a.trim() === "" || b.trim() === "") {
      setError("Ingresa ambos valores antes de calcular.");
      return;
    }

    const url = buildUrl(operation);
    setRequestUrl(url);
    setLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        setError(
          `Error ${response.status}: ${data?.error || "Respuesta no válida del backend."}`,
        );
      } else {
        setResult(data.result);
      }
    } catch (fetchError) {
      setError(
        `No se pudo conectar con el backend. URL: ${url}. Error: ${fetchError.message}`,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setA("");
    setB("");
    setResult(null);
    setError("");
  };

  return (
    <div className="app-shell">
      <div className="card">
        <h1>Calculadora</h1>

        <div className="inputs-row">
          <label>
            Valor A
            <input
              type="number"
              value={a}
              onChange={(event) => setA(event.target.value)}
              placeholder="Número A"
            />
          </label>

          <label>
            Valor B
            <input
              type="number"
              value={b}
              onChange={(event) => setB(event.target.value)}
              placeholder="Número B"
            />
          </label>
        </div>

        <div className="operation-row">
          <label>
            Operación
            <select
              value={operation}
              onChange={(event) => setOperation(event.target.value)}
            >
              {operations.map((op) => (
                <option key={op.key} value={op.key}>
                  {op.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="actions-row">
          <button type="button" onClick={calculate} disabled={loading}>
            {loading ? "Calculando..." : "Calcular"}
          </button>
          <button type="button" className="secondary" onClick={handleReset}>
            Limpiar
          </button>
        </div>

        {error && <div className="alert error">{error}</div>}
        {result !== null && !error && (
          <div className="alert success">Resultado: {result}</div>
        )}
        {requestUrl && (
          <div
            className="alert"
            style={{ background: "#eef2ff", color: "#1e40af" }}
          >
            Petición: <code>{requestUrl}</code>
          </div>
        )}

        <footer>
          <small>
            Backend remoto: {REMOTE_API_BASE}
            <br />
            Usa <strong>npm run dev</strong> para desarrollo y proxy local.
          </small>
        </footer>
      </div>
    </div>
  );
}

export default App;
