# Frontend React para calculadora Northflank

Este proyecto es un frontend en React/Vite que consume el backend de calculadora desplegado en:

`https://p01--example--fynyvxxwv6zn.code.run`

## Características

- Calcula con los endpoints del backend:
  - `GET /calc/add?a=<num>&b=<num>`
  - `GET /calc/subtract?a=<num>&b=<num>`
  - `GET /calc/multiply?a=<num>&b=<num>`
  - `GET /calc/divide?a=<num>&b=<num>`
  - `GET /calc/power?a=<num>&b=<num>`
- Soporta operaciones de suma, resta, multiplicación, división y potencia.
- Usa proxy Vite en desarrollo para evitar problemas de CORS.

## Instalación

1. Abre una terminal en el directorio del proyecto:

```powershell
cd "c:\Users\Julio\OneDrive\Documentos\pythonU\Render_northflank_Front"
```

2. Instala dependencias:

```powershell
npm install
```

## Ejecutar en desarrollo

```powershell
npm run dev
```

Luego abre el enlace que muestre Vite (normalmente `http://localhost:5173`).

## Uso

- Ingresa un valor en `Valor A` y `Valor B`.
- Selecciona la operación.
- Haz clic en `Calcular`.
- El resultado se mostrará en pantalla.

### Ejemplo directo del backend

```bash
curl "https://p01--example--fynyvxxwv6zn.code.run/calc/add?a=3&b=2"
```

Respuesta esperada:

```json
{ "result": 5.0, "operation": "add" }
```

## Nota sobre CORS

En desarrollo, el proyecto usa el proxy configurado en `vite.config.js` para reenviar solicitudes a:

`https://p01--example--fynyvxxwv6zn.code.run`

Por defecto, las peticiones se realizan a rutas relativas como `/calc/add?a=...&b=...`.

## Configuración opcional

Si quieres cambiar el backend remoto, crea un archivo `.env` con:

```env
VITE_API_BASE=https://p01--example--fynyvxxwv6zn.code.run
```

## Estructura de archivos

- `src/App.jsx` — interfaz y lógica de llamada al backend.
- `vite.config.js` — proxy Vite para desarrollo.
- `src/style.css` — estilos.

## Problemas comunes

- Si ves `No se pudo conectar con el backend`, revisa que el backend esté accesible y que no haya bloqueos de red.
- Si el backend responde `400`, revisa que los parámetros `a` y `b` sean números válidos.
