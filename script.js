document.addEventListener("DOMContentLoaded", function () {
    const tablaBody = document.getElementById("tabla-body");
    const paradasDiv = document.getElementById("paradas");
    const listaParadas = document.getElementById("lista-paradas");
    const nombreLinea = document.getElementById("nombre-linea");

    fetch("prueba.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(linea => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${linea.NOM_LINIA}</td>
                    <td>${linea.DESC_LINIA}</td>
                    <td>${linea.NOM_OPERADOR}</td>
                    <td>
                        Pico: ${linea.FRECUENCIA_MINUTOS.hora_pico} min | 
                        Valle: ${linea.FRECUENCIA_MINUTOS.hora_valle} min | 
                        Nocturno: ${linea.FRECUENCIA_MINUTOS.nocturno} min
                    </td>
                    <td>
                        <button class="btn btn-danger ver-paradas" data-id="${linea.CODI_LINIA}">
                            Ver Paradas
                        </button>
                    </td>
                `;

                tablaBody.appendChild(row);
            });

            // Reasignar eventos después de generar la tabla
            document.querySelectorAll(".ver-paradas").forEach(btn => {
                btn.addEventListener("click", function () {
                    const lineaSeleccionada = data.find(linea => linea.CODI_LINIA === this.getAttribute("data-id"));
                    if (lineaSeleccionada) {
                        nombreLinea.textContent = lineaSeleccionada.NOM_LINIA;
                        listaParadas.innerHTML = lineaSeleccionada.PARADAS.map(parada => `<li>${parada}</li>`).join("");
                        paradasDiv.classList.remove("d-none");
                    }
                });
            });
        })
        .catch(error => console.error("Error al cargar el JSON:", error));
});
