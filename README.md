 # Smart Book Finder - Frontend

Aplicación web desarrollada con React + Vite para búsqueda inteligente de libros.

## Tecnologías
- React 18
- Vite 5
- Playwright (pruebas e2e)

## Requisitos
- Node.js 20+
- npm 10+
- Backend corriendo en http://localhost:8080

## Cómo iniciar el frontend

1. Clona el repositorio:
   git clone https://github.com/JuanPablo3103/smart-book-finder-frontend.git
   cd smart-book-finder-frontend

2. Instala dependencias:
   npm install

3. Inicia el servidor de desarrollo:
   npm run dev

4. Abre en el navegador: http://localhost:5173

## Funcionalidades
- Formulario de búsqueda con 4 campos: título, autor, idioma, año
- Visualización de resultados con portada, autor, año y ediciones
- Manejo de errores: campos vacíos, pocos resultados

## Ejecutar pruebas Playwright

1. Asegúrate de que el backend esté corriendo en puerto 8080
2. Asegúrate de que el frontend esté corriendo en puerto 5173
3. Ejecuta:
   npx playwright test --config=playwright.config.cjs

## Resultados de pruebas
- 4 pruebas Playwright — 0 fallos
- Cubre: búsqueda exitosa, resultados visibles, error campos vacíos, error pocos resultados