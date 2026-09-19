# Wiki de Rick and Morty - Ionic & React

## Presentación
* **Proyecto:** Aplicación Web y Móvil - Tarea 2
* **Asignatura:** Ingeniería Web y Móvil
* **Estudiante:** Iván Ferreira
* **Fecha:** 18/09/26

---

## Objetivo
El propósito de este proyecto es construir una aplicación tipo catálogo/wiki consumiendo la API pública de **Rick and Morty** (`https://rickandmortyapi.com/api/character`). A través de **Ionic Framework y React**, la app procesa la información de los personajes de forma y la presenta en una interfaz dinámica y amigable para el usuario.

---

## Funcionalidades Implementadas
* **Consumo de API REST:** Petición HTTP asíncrona mediante `fetch` para cargar la lista de personajes en tiempo real.
* **Diseño en cuadrícula responsivo:** Visualización organizada con `IonGrid` que se ajusta automáticamente (hasta 4 columnas en computadores y 1 a 2 en pantallas móviles).
* **Fichas de personaje detalladas:** Tarjetas con nombre, especie, género, origen, última ubicación conocida y estado vital (con badges de color según esté vivo, muerto o desconocido).
* **Control de imágenes:** Detección de enlaces caídos con reemplazo automático por una imagen de respaldo genérica.
* **Barra de navegación y paginación:**
  * Botones para avanzar y retroceder entre páginas.
  * Campo numérico editable para saltar directamente a cualquier página disponible.
  * Retorno suave al inicio de la pantalla (`scrollToTop`) cada vez que cambia la página.
* **Manejo de estados:** Indicador visual de carga (`IonSpinner`) durante las consultas y mensajes en caso de error de conexión.

---

## Tecnologías Utilizadas
* **Ionic Framework** (`@ionic/react`)
* **React** (Hooks `useState`, `useRef`)
* **TypeScript**
* **The Rick and Morty API**