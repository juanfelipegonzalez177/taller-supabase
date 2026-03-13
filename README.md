# 📋 TaskApp — Gestión de Tareas en Tiempo Real

Aplicación web de gestión de tareas construida con **React**, **TypeScript** y **Supabase**, con funcionalidades de tiempo real, dashboard de estadísticas y chat en vivo.

##  Características

-  **Autenticación completa** — registro, login y recuperación de contraseña
-  **Gestión de tareas** — crear, completar y eliminar tareas en tiempo real
-  **Dashboard** — estadísticas, gráficas de actividad y distribución
-  **Chat en vivo** — chat general entre usuarios conectados
-  **Presencia** — muestra cuántos usuarios están conectados
-  **Realtime** — cambios reflejados instantáneamente sin recargar
-  **UI moderna** — diseño oscuro con efectos y animaciones

##  Tecnologías

| Tecnología | Uso |
|-----------|-----|
| React 18 + TypeScript | Frontend |
| Vite | Bundler |
| Supabase | Base de datos, Auth y Realtime |
| React Router DOM | Navegación |
| Recharts | Gráficas del dashboard |

##  Estructura del proyecto
```
src/
├── lib/
│   └── supabaseClient.ts
├── types/
│   └── database.ts
├── services/
│   ├── authService.ts
│   ├── taskService.ts
│   └── dashboardService.ts
├── hooks/
│   ├── useAuth.ts
│   ├── useTasks.ts
│   ├── useRealtimeTasks.ts
│   ├── usePresence.ts
│   ├── useChat.ts
│   └── useDashboard.ts
├── components/
│   ├── RealtimeIndicator.tsx
│   ├── TaskForm.tsx
│   ├── TaskItem.tsx
│   ├── Chat/
│   │   └── ChatWidget.tsx
│   └── Dashboard/
│       ├── StatCard.tsx
│       ├── TaskChart.tsx
│       ├── DonutChart.tsx
│       └── ActivityFeed.tsx
├── pages/
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── ForgotPassword.tsx
│   ├── ResetPassword.tsx
│   ├── Tasks.tsx
│   └── Dashboard.tsx
└── App.tsx
```

##  Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/TU_USUARIO/taller-supabase.git
cd taller-supabase
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:
```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_anon_key
```

> Encuéntralas en tu proyecto de Supabase → **Settings → API**

### 4. Configurar la base de datos

Corre este SQL en el **SQL Editor** de Supabase:
```sql
create table "Tareas" (
  id          uuid primary key default gen_random_uuid(),
  titulo      text not null,
  descripcion text,
  completada  boolean default false,
  created_at  timestamptz default now(),
  user_id     uuid references auth.users(id) on delete cascade
);

alter table "Tareas" enable row level security;

create policy "Ver propias tareas"
  on "Tareas" for select to authenticated
  using (auth.uid() = user_id);

create policy "Crear propias tareas"
  on "Tareas" for insert to authenticated
  with check (auth.uid() = user_id);

create policy "Actualizar propias tareas"
  on "Tareas" for update to authenticated
  using (auth.uid() = user_id);

create policy "Eliminar propias tareas"
  on "Tareas" for delete to authenticated
  using (auth.uid() = user_id);

alter publication supabase_realtime add table "Tareas";
```

### 5. Correr el proyecto
```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

##  Páginas

| Página | Ruta | Descripción |
|--------|------|-------------|
| Login | `/` | Inicio de sesión |
| Registro | `/register` | Crear cuenta |
| Recuperar contraseña | `/forgot-password` | Envío de enlace |
| Tareas | `/tasks` | Lista de tareas + chat |
| Dashboard | `/dashboard` | Estadísticas y gráficas |

##  Autor

Desarrollado como proyecto del taller de Supabase con React.
