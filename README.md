#Colombia Hydro Monitor: Visualización de Datos Geoespaciales
Este proyecto es una solución integral para la visualización y análisis de estaciones hidrológicas en Colombia. Implementa un flujo de trabajo que va desde la limpieza de datos masivos con Python hasta la creación de un dashboard interactivo de alto rendimiento.

🎯 El Desafío Técnico
Visualizar más de 7,000 puntos geográficos en un navegador web puede degradar el rendimiento y congelar la interfaz del usuario.
Solución: Se implementó una arquitectura basada en Marker Clustering, que agrupa puntos cercanos y optimiza el renderizado, reduciendo drásticamente el consumo de memoria RAM.

🛠️ Tecnologías y Herramientas
Data Engineering: Python 3 (Pandas) para procesos de ETL (Extracción, Transformación y Carga).

Frontend: JavaScript (ES6+), HTML5, CSS3.

Map Engine: Leaflet.js con el plugin Leaflet.markercluster.

⚙️ Proceso de Ingeniería de Datos
Antes de la visualización, se realizó una limpieza profunda de la base de datos cruda del IDEAM para asegurar la estabilidad del sistema:

Filtro de Coordenadas: Eliminación de registros con valores NaN o nulos en latitud/longitud para evitar errores de ejecución en el mapa.

Normalización de Estados: Estandarización de la columna "Estado" (ACTIVA/SUSPENDIDA) para permitir un filtrado dinámico preciso.

Optimización de Archivo: Exportación a un formato JSON estructurado de 7.3 MB, ideal para una carga rápida vía Web.

🚀 Funcionalidades Principales
Agrupamiento Inteligente (Clustering): Los marcadores se agrupan automáticamente según el nivel de zoom, mejorando la legibilidad.

Buscador con Autocompletado: Sistema de búsqueda vinculado a un datalist para localización instantánea de estaciones por nombre.

Filtros en Tiempo Real: Segmentación visual instantánea de estaciones operativas y suspendidas.

Panel de Detalles: Visualización de metadatos (Departamento, Altitud, Corriente) al interactuar con cualquier punto.

💻 Cómo ejecutar el proyecto
Clona este repositorio.

Asegúrate de que los archivos index.html, styles.css, app.js y estaciones_limpias.json estén en el mismo directorio.

Utiliza una extensión de servidor local (como Live Server en VS Code) para abrir el index.html.
