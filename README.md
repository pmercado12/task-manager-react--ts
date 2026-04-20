# Task Manager

Aplicación de gestión de tareas con arquitectura monorepo que incluye frontend en React y backend en Express con Prisma.

## Estructura del Proyecto

```
.
├── src/                 # Frontend (React + Vite + TypeScript)
├── backend/             # Backend (Express + Prisma + PostgreSQL)
├── package.json         # Dependencias del frontend
└── README.md
```

## Frontend

Aplicación React con Vite construida con TypeScript.

### Requisitos
- Node.js 18+
- npm o yarn

### Instalación

```bash
npm install
```

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