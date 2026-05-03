# 🏀 Club Belgrano Cultural y Deportivo
> Plataforma digital Fullstack MERN

## 🚀 Quick Start

### Requisitos
- Node.js 18+
- MongoDB 6+

### Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env con tu URI de MongoDB

# 3. Iniciar servidor
npm run dev
```

### Cliente (Frontend)
```bash
cd client
npm install
npm run dev
```

## Estructura del Proyecto

```
├── server/           # Backend API
│   └── src/
│       ├── features/  # Módulos por entidad
│       │   ├── auth/
│       │   ├── players/
│       │   ├── matches/
│       │   ├── competitions/
│       │   ├── sponsors/
│       │   ├── staff/
│       │   ├── club/
│       │   └── membership/
│       └── core/
│           ├── middleware/
│           └── utils/
│
├── client/          # Frontend React
│   └── src/
│       ├── features/   # Páginas por feature
│       ├── components/ # UI reusable
│       └── core/      # Api, hooks, context
│
└── PLAN_MAESTRO_ARQUITECTURA.md
```

## API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| **Auth** |||
| POST | `/api/v1/auth/register` | Registrar usuario |
| POST | `/api/v1/auth/login` | Iniciar sesión |
| POST | `/api/v1/auth/refresh` | Refresh token |
| GET | `/api/v1/auth/me` | Datos usuario |
| **Players** |||
| GET | `/api/v1/players` | Listar jugadores |
| GET | `/api/v1/players/:id` | Jugador específico |
| GET | `/api/v1/players/latest` | Último partido |
| GET | `/api/v1/players/next` | Próximo partido |
| POST | `/api/v1/players` | Crear jugador |
| PUT | `/api/v1/players/:id` | Actualizar |
| DELETE | `/api/v1/players/:id` | Eliminar |
| **Matches** |||
| GET | `/api/v1/matches` | Listar partidos |
| GET | `/api/v1/matches/latest` | Último resultado |
| GET | `/api/v1/matches/next` | Próximo partido |
| POST | `/api/v1/matches` | Crear partido |
| PUT | `/api/v1/matches/:id/score` | Actualizar score |
| **Competitions** |||
| GET | `/api/v1/competitions` | Lista competencias |
| GET | `/api/v1/competitions/:id/standings` | Tabla posiciones |
| **Sponsors** |||
| GET | `/api/v1/sponsors/home` | Sponsors home |
| **Membership** |||
| POST | `/api/v1/membership/validate-qr` | Validar QR |

## Tecnologías

- **Backend**: Express, Mongoose, JWT, bcryptjs
- **Frontend**: React 19, Tailwind 4, Vite
- **Database**: MongoDB (relacional con Refs)

## Roles

| Rol | Descripción |
|-----|-------------|
| `ADMIN` | Administrador total |
| `STAFF` | Staff técnico |
| `SOCIO` | Socio activo |
| `PUBLIC` | Visitante |

## Ambiente

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/belgrano_club
JWT_SECRET=your-secret-key
CLIENT_URL=http://localhost:5173
```

## Licencia

© 2026 Club Belgrano Cultural y Deportivo - Todos los derechos reservados# AppClubBelgranoCulturalyDeportivo-Backend
