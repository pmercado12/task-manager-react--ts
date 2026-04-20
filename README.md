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

---

## Despliegue en Render.com

### Preparación previa

1. **Sube tu proyecto a GitHub**
   - Crea un repositorio en GitHub
   - Haz push de tu código

2. **Crea una cuenta en [Render.com](https://render.com)**

### Paso 1: Base de Datos PostgreSQL

1. En Render Dashboard, haz clic en **"New +"** → **"PostgreSQL"**
2. Completa los datos:
   - **Name**: `taskmanager-db`
   - **Database**: `taskmanager`
   - **Region**: Elige la más cerca a ti
   - **PostgreSQL Version**: 16
3. Haz clic en **"Create Database"**
4. Copia la **Internal Database URL** (la necesitarás después)

### Paso 2: Desplegar Backend

1. En Render Dashboard, haz clic en **"New +"** → **"Web Service"**
2. Conecta tu repositorio GitHub
3. Completa la configuración:
   - **Name**: `taskmanager-backend`
   - **Runtime**: Node
   - **Build Command**: 
     ```
     cd backend && npm install && npx prisma generate
     ```
   - **Start Command**:
     ```
     cd backend && npm run dev
     ```
   - **Region**: Misma que la BD

4. **Variables de Ambiente**:
   - `DATABASE_URL`: Pega la Internal Database URL de PostgreSQL
   - `NODE_ENV`: `production`

5. Haz clic en **"Create Web Service"**

### Paso 3: Desplegar Frontend

#### Opción A: Como Static Site (recomendado)

1. En Render Dashboard, haz clic en **"New +"** → **"Static Site"**
2. Conecta tu repositorio GitHub
3. Completa:
   - **Name**: `taskmanager-frontend`
   - **Build Command**: 
     ```
     npm install && npm run build
     ```
   - **Publish Directory**: `dist`
   - **Region**: Misma que backend

4. Antes de crear, actualiza tu frontend para usar la URL del backend desplegado

#### Opción B: Como Web Service

Si necesitas variables de ambiente dinámicas:

1. En Render Dashboard, haz clic en **"New +"** → **"Web Service"**
2. Conecta tu repositorio GitHub
3. Completa:
   - **Name**: `taskmanager-frontend`
   - **Runtime**: Node
   - **Build Command**: 
     ```
     npm install && npm run build
     ```
   - **Start Command**: 
     ```
     npm install -g serve && serve -s dist -l 3000
     ```

### Paso 4: Conectar Frontend con Backend

Ya está configurado para usar variables de entorno. Los archivos están listos:

- **`src/config/api.ts`** - Importa la variable `VITE_API_URL`
- **`.env.local`** - Para desarrollo local: `VITE_API_URL=http://localhost:3000`
- **`.env.example`** - Plantilla de variables

Para cambiar la URL del backend, solo actualiza la variable de entorno según el ambiente.

### Paso 5: Migraciones en Render

Si necesitas ejecutar Prisma solo una vez:

1. Ve a tu Web Service del backend en Render
2. Abre la consola (Shell)
3. Ejecuta:
   ```bash
   npx prisma migrate deploy
   ```

---

## Checklist Final

- [ ] Repositorio creado en GitHub
- [ ] Base de datos PostgreSQL creada en Render
- [ ] Backend desplegado en Render
- [ ] Frontend desplegado en Render
- [ ] Variables de ambiente configuradas
- [ ] URL del backend actualizada en frontend
- [ ] Migraciones ejecutadas

---

## URLs después del despliegue

- **Frontend**: `https://taskmanager-frontend.onrender.com`
- **Backend**: `https://taskmanager-backend.onrender.com`
- **Base de Datos**: Gestionada por Render

---

## Despliegue Frontend en Vercel.com

### Paso 1: Preparación

Tu frontend ya está configurado con variables de entorno. Necesitas:

1. **Repository en GitHub** - Con tu código frontend
2. **Cuenta en Vercel** - Crea una en [vercel.com](https://vercel.com)

### Paso 2: Conectar Vercel con GitHub

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Haz clic en **"Add New..."** → **"Project"**
3. Selecciona tu repositorio de GitHub
4. Vercel detectará automáticamente que es un proyecto Vite

### Paso 3: Configurar Variables de Entorno

1. En la página de configuración del proyecto, ve a **"Environment Variables"**
2. Agrega la variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://taskmanager-backend.onrender.com`
   - **Environments**: Selecciona Production, Preview, Development

3. Haz clic en **"Save"**

### Paso 4: Deploy

1. Vercel creará automáticamente un deployment
2. Espera a que termine (verá la URL de tu sitio)
3. Tu frontend estará disponible en: `https://taskmanager-frontend.vercel.app` (o similar)

### Paso 5: Verificar Conexión

1. Abre tu sitio en Vercel
2. Abre la consola del navegador (F12)
3. Verifica que se conecte correctamente al backend

---

## Variables de Entorno - Explicación

### Para Vite en React

Vite usa variables con prefijo `VITE_` para que estén disponibles en el navegador.

**Archivo: `src/config/api.ts`**
```typescript
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
```

### Archivos de configuración incluidos

- **`.env.local`** - Desarrollo local (gitignored)
  ```
  VITE_API_URL=http://localhost:3000
  ```

- **`.env.example`** - Plantilla para otros desarrolladores
  ```
  VITE_API_URL=http://localhost:3000
  ```

- **`src/config/api.ts`** - Centraliza todas las URLs del API

### Cómo usar en desarrollo

1. Abre `.env.local`
2. Cambia `VITE_API_URL` según sea necesario
3. Reinicia el servidor de desarrollo (`npm run dev`)
4. Los cambios se aplicarán automáticamente

### Cómo usar en Vercel

1. Ve a tu proyecto en Vercel Dashboard
2. Settings → Environment Variables
3. Configura `VITE_API_URL` con la URL de tu backend
4. Vercel redesplegará automáticamente

### Cómo usar en Render para Frontend

Si despliegas el frontend en Render en lugar de Vercel:

1. Ve a Environment Variables en tu Web Service
2. Agrega: `VITE_API_URL=https://taskmanager-backend.onrender.com`
3. Redespliega

---

## Solución de problemas

**El backend no conecta a la BD:**
- Verifica la `DATABASE_URL` esté correcta
- Ejecuta migraciones en la consola de Render

**El frontend no ve el backend:**
- Verifica la URL del API en tu código
- Revisa la consola del navegador (F12) para errores CORS

**Los cambios no se despliegan:**
- Haz push a GitHub
- Render se redesplegará automáticamente
- O redespliega manualmente desde Render Dashboard