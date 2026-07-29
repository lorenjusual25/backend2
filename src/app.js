import express from 'express';
import eventRouter from './routes/event.router.js';
import sessionRouter from './routes/session.router.js';
const app = express()
app.use(express.json())
app.get('/api/health', (req, res) => {
  res.status(200).json({status:'ok',"message":"Servidor activo"})
})
app.use('/api/events',eventRouter)
app.use('/api/sessions',sessionRouter)
export default app