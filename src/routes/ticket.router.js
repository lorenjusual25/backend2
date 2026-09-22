import { Router } from 'express'
import passport from 'passport'
const router = Router()
const authenticate = passport.authenticate('current', {session: false})
import { createTicket } from '../controllers/ticket.controller.js'
router.post('/event/:eventId/tickets',authenticate,createTicket)
export default router