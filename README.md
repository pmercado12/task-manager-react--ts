# Task Manager

Aplicación Full Stack para la gestión de tareas desarrollada con React, Express, Prisma y PostgreSQL.

### Características
- React 19 con TypeScript
- Vite para desarrollo rápido
- ESLint configurado
- Componentes modulares:
  - TaskCard: Componente individual de tarea
  - TaskList: Lista de tareas
  - TaskInput: Entrada de nuevas tareas
  - Header y Footer
  - EmptyState: Estado vacío

[![CI](https://github.com/pmercado12/task-manager-react--ts/actions/workflows/ci.yml/badge.svg)](https://github.com/pmercado12/task-manager-react--ts/actions/workflows/ci.yml)

## Requisitos

- Node 18+
- npm

## FRONTEND

## 🚀 Instalación local

```bash
git clone https://github.com/pmercado12/task-manager-react--ts
cd task-manager-react--ts
npm install
```

### Variables de entorno

```
VITE_API_URL=
```

## 📜 Comandos disponibles
 
| Comando          | Descripción                               |
|------------------|-------------------------------------------|
| `npm run dev`    | Levanta el entorno de desarrollo           |
| `npm run build`  | Genera el build de producción              |
| `npm test`       | Corre las pruebas automatizadas (pendiente — Sesión 3) |

## 🗄️ Base de datos
 
PostgreSQL con migraciones y seeds gestionados con Prisma (ver Módulo 2).

### Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```
---

## Backend

API REST construida con Express, Prisma ORM y PostgreSQL.

### Requisitos
- Node.js 18+
- PostgreSQL 12+
- npm o yarn

### Instalación

```bash
cd backend
npm install
npx prisma generate
```

### Configuración

Crear archivo `.env` en la carpeta backend:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/taskmanager"
```

### Desarrollo

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

### Scripts

- `npm run dev` - Inicia el servidor en modo desarrollo con hot-reload

### Base de Datos

Ejecutar migraciones:

```bash
npx prisma migrate dev --name <nombre_migracion>
```

Sincronizar esquema:

```bash
npx prisma db push
```

### Características
- Express 5
- Prisma ORM con adaptador PostgreSQL
- JWT para autenticación
- CORS habilitado
- TypeScript
- Rutas REST:
  - GET /api/tasks - Obtener todas las tareas
  - POST /api/tasks - Crear nueva tarea
  - PUT /api/tasks/:id - Actualizar tarea
  - DELETE /api/tasks/:id - Eliminar tarea

---

## Desarrollo

### Ejecutar ambas partes simultáneamente

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```

### Variables de ambiente necesarias

Frontend: utiliza la URL del backend (configurar en el código)

Backend: `DATABASE_URL` con conexión a PostgreSQL

---

## Tecnologías

### Frontend
- React 19
- TypeScript
- Vite
- ESLint

### Backend
- Node.js
- Express 5
- Prisma ORM
- PostgreSQL
- JWT
- CORS
- TypeScript

---
