// 1. Inicialización del Mapa
var map = L.map('map').setView([4.5708, -74.2973], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// 2. Variables Globales
var markersGroup = L.markerClusterGroup();
let datosEstaciones = [];

// 3. Función para cargar los datos desde el JSON
async function cargarDatosReales() {
    try {
        const response = await fetch('estaciones_limpias.json');
        datosEstaciones = await response.json();
        const datalist = document.getElementById('lista-estaciones');
        
        datalist.innerHTML = ""; // Limpiar buscador

        datosEstaciones.forEach(estacion => {
            if (estacion.LATITUD && estacion.LONGITUD) {
                // Crear marcador
                const marker = L.marker([estacion.LATITUD, estacion.LONGITUD])
                    .bindPopup(`<b>${estacion.Nombre}</b>`);
                
                // Agregar al grupo de clusters
                markersGroup.addLayer(marker);
                estacion.marker = marker;

                // Agregar al buscador
                if (estacion.Nombre) {
                    const option = document.createElement('option');
                    option.value = estacion.Nombre;
                    datalist.appendChild(option);
                }

                // Evento clic
                marker.on('click', () => mostrarDescripcion(estacion));
            }
        });

        map.addLayer(markersGroup);
        console.log("Sistema listo con " + datosEstaciones.length + " estaciones.");

        // Forzar renderizado del mapa
        setTimeout(() => { map.invalidateSize(); }, 500);

    } catch (e) { 
        console.error("Error cargando el JSON:", e); 
    }
}

// 4. Función para mostrar información en el panel
function mostrarDescripcion(estacion) {
    const panel = document.getElementById('panel-info');
    const contenido = document.getElementById('contenido-detalle');
    
    panel.style.display = 'block';
    contenido.innerHTML = `
        <p><b>Nombre:</b> ${estacion.Nombre}</p>
        <p><b>Departamento:</b> ${estacion.Departamento}</p>
        <p><b>Estado:</b> ${estacion.Estado}</p>
        <p><b>Altitud:</b> ${estacion.Altitud} msnm</p>
        <p><b>Municipio:</b> ${estacion.Municipio || 'No especificado'}</p>
    `;
    
    map.setView([estacion.LATITUD, estacion.LONGITUD], 15);
}

// 5. Función para el buscador
function buscarPunto() {
    const valor = document.getElementById('buscador').value.toUpperCase();
    const encontrada = datosEstaciones.find(e => e.Nombre.toUpperCase().includes(valor));
    
    if (encontrada) {
        markersGroup.zoomToShowLayer(encontrada.marker, () => {
            mostrarDescripcion(encontrada);
            encontrada.marker.openPopup();
        });
    } else {
        alert("Estación no encontrada");
    }
}

// 6. Función de filtrado (Activas/Suspendidas)
function filtrar(estado) {
    if (!markersGroup) return;
    markersGroup.clearLayers(); 
    
    datosEstaciones.forEach(estacion => {
        if (estacion && estacion.Estado) {
            const estadoEstacion = estacion.Estado.toUpperCase();
            if (estado === 'all' || estadoEstacion === estado.toUpperCase()) {
                markersGroup.addLayer(estacion.marker);
            }
        }
    });
}

// Ejecutar carga inicial
cargarDatosReales();