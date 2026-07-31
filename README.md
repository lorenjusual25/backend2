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
GET /api/sessions

## Estructura de carpetas

```text
backend2/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   ├── config.js
│   ├── controllers/
│   │   ├── event.controller.js
│   │   └── session.controller.js
│   ├── routes/
│   │   ├── event.router.js
│   │   └── session.router.js
│   ├── models/
│   │   ├── eventModel.js
│   │   └── userModel.js
│   ├── middlewares/
│   │   ├── temporal.middleware.js
│   ├── utils/
│   │   ├── util.js
│   ├── services/
│   │   ├── temporal.service.js
│   ├── repositories/
│   │   ├── temporal.repository.js
│   └── dao/
│   │   ├── temporal.dao.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```
## Captura de /api/health respondiendo OK
![api respondiendo OK](img/Captura%20de%20pantalla%202026-07-28%20211332.png)