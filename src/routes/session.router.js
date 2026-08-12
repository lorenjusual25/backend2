import {Router} from 'express'
import {findAllSessions,createSession,findSessionsByEvent} from '../controllers/session.controller.js'
const router = Router()
router.get('/', findAllSessions)
router.post('/createSession',createSession)
router.get('/:eventId',findSessionsByEvent)
export default router