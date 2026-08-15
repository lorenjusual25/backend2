import {Router} from 'express'
import {findAllSessions,createSession,findSessionsByEvent,register} from '../controllers/session.controller.js'
const router = Router()
router.get('/', findAllSessions)
router.post('/createSession',createSession)
router.get('/:eventId',findSessionsByEvent)
router.post('/register',register)
export default router