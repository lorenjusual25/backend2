# Backend2

Entrega 1 por Lorenzo Suarez Almeyra, temática de eventos y sesiones 

## Tecnologías
- Node.js
- Express
- Nodemon
- dotenv

## Instalación
```bash
npm install
```

## Iniciacion
```bash
npm run dev
```

## Rutas disponibles
GET /api/health
GET /api/events
GET /api/events/:id
POST /api/events/createEvent
GET /api/sessions
GET /api/sessions/eventId
POST /api/sessions/createSession

## Flujo de datos
Request → Router → Controller → Service → Repository → DAO → Model

## Estructura de carpetas

```text
backend2/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   └── config.js
│   ├── controllers/
│   │   ├── event.controller.js
│   │   └── session.controller.js
│   ├── dao/
│   │   ├── event.dao.js
│   │   ├── session.dao.js
│   │   └── user.dao.js
│   ├── middlewares/
│   │   └── error.middleware.js
│   ├── models/
│   │   ├── eventModel.js
│   │   ├── sessionModel.js
│   │   └── userModel.js
│   ├── repositories/
│   │   ├── event.repository.js
│   │   ├── session.repository.js
│   │   └── user.repository.js
│   ├── routes/
│   │   ├── event.router.js
│   │   └── session.router.js
│   ├── services/
│   │   ├── event.service.js
│   │   └── session.service.js
│   └── utils/
│       └── util.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```
## Captura de /api/health respondiendo OK
![api respondiendo OK](img/Captura%20de%20pantalla%202026-07-28%20211332.png)