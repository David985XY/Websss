import React, { useState, useEffect } from "react";
import "./styles.css";

interface LineaMetro {
  ID_LINIA: number;
  CODI_LINIA: string;
  NOM_LINIA: string;
  DESC_LINIA: string;
  ORIGEN_LINIA: string;
  DESTI_LINIA: string;
  NOM_OPERADOR: string;
  HORARIO: string;
  PARADAS: string[];
}

const App: React.FC = () => {
  const [lineas, setLineas] = useState<LineaMetro[]>([]);
  const [paradas, setParadas] = useState<string[]>([]);
  const [lineaSeleccionada, setLineaSeleccionada] = useState<string | null>(null);

  useEffect(() => {
    fetch("/prueba.json")
      .then((response) => response.json())
      .then((data) => setLineas(data))
      .catch((error) => console.error("Error al cargar el archivo JSON:", error));
  }, []);

  const handleLineaClick = (codigoLinea: string) => {
    const linea = lineas.find((l) => l.CODI_LINIA === codigoLinea);
    if (linea) {
      setParadas(linea.PARADAS);
      setLineaSeleccionada(linea.CODI_LINIA);
    }
  };

  return (
    <div className="container">
      <h1>Metro de Barcelona</h1>

      <table>
        <thead>
          <tr>
            <th>Línea</th>
            <th>Ruta</th>
            <th>Operador</th>
            <th>Ver Paradas</th>
          </tr>
        </thead>
        <tbody>
          {lineas.map((linea) => (
            <tr key={linea.ID_LINIA}>
              <td>{linea.NOM_LINIA}</td>
              <td>{linea.DESC_LINIA}</td>
              <td>{linea.NOM_OPERADOR}</td>
              <td>
                <button onClick={() => handleLineaClick(linea.CODI_LINIA)}>
                  Ver Paradas
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;