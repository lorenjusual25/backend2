import {Router} from 'express'
import {getEvents,getEventById,createEvent,updateEvent} from '../controllers/event.controller.js'
import { authorizeRoles } from '../middlewares/authorization.middleware.js'
import passport from 'passport'
const router = Router()
router.get('/',getEvents)
router.get('/:id',passport.authenticate('current',{session:false}),authorizeRoles('organized','admin'),getEventById)
router.post('/createEvent',passport.authenticate('current',{session:false}),authorizeRoles('organized','admin'),createEvent)
router.put('/updateEvent',passport.authenticate('current',{session:false}),authorizeRoles('organized','admin'),updateEvent)
export default router