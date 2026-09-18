import {Router} from 'express'
import {getEvents,getEventById,createEvent,updateEvent} from '../controllers/event.controller.js'
import { authorizeRoles, authEventOwnerOrAdmin } from '../middlewares/authorization.middleware.js'
import passport from 'passport'
const router = Router()
router.get('/',getEvents)
router.get('/:id',passport.authenticate('current',{session:false}),authorizeRoles('organized','admin'),authEventOwnerOrAdmin,getEventById)
router.post('/createEvent',passport.authenticate('current',{session:false}),authorizeRoles('organized','admin'),createEvent)
router.put('/updateEvent/:id',passport.authenticate('current',{session:false}),authorizeRoles('organized','admin'),authEventOwnerOrAdmin,updateEvent)
export default router