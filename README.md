# Atlas Electoral Acandí 2027

Mapa interactivo de los **10 puestos de votación** del municipio de Acandí
(Chocó, Colombia) con datos del censo electoral, listas, mesas, coordenadas y
enlace a Google Maps. 100% HTML/CSS/JS, **sin dependencias de internet**
(Leaflet y Chart.js están embebidos en `assets/`). Funciona en computador y
celular.

## Abrir sin publicar

Doble clic en `index.html` y se abre en el navegador. Sin internet carga el
mapa, los datos y las gráficas; solo los **satélites de OpenStreetMap** piden
conexión (el mapa de fondo puede verse gris sin red, pero todo lo demás
funciona).

## Publicar en la web (opcional, gratis)

- **GitHub Pages**: sube esta carpeta a un repo y activa Pages.
- **Netlify Drop**: arrastra esta carpeta a https://app.netlify.com/drop
- **Vercel / Anywhere**: cualquier hosting estático sirve; basta el
  `index.html` + `assets/`.

No hace falta ningún servidor especial (no hay backend).

## Estructura

```
web/
├── index.html          # el mapa completo (una sola página)
└── assets/
    ├── leaflet/        # Leaflet 1.9.4 local
    └── chart/          # Chart.js 4.4.1 local
```

## Editar los datos

Los 10 puestos están en el arreglo `PUESTOS` dentro de `index.html`
(buscar `const PUESTOS = [`). Cada entrada:

```js
{ puesto: "NOMBRE", lat: 8.5125, lon: -77.2780,
  votantes: 1234, mesas: 6, listas: 8, veredas: "...", direccion: "..." }
```

- `votantes` / `mesas` / `listas` alimentan la tarjeta del puesto y las gráficas.
- El archivo fuente editable también está en `../datos/`.

## Puestos incluidos

Cabecera Municipal, La Caleta, Capitan, Capurgana, San Miguel,
Santa Cruz de Chugandi, Sapzurro, Peñaloza, Rufino y San Francisco
(ex-Villa Claret). 10 puestos, 100% georreferenciados.

---
Proyecto de análisis electoral — Acandí, Chocó, Colombia. 2027.
