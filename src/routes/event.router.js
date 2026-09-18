import {Router} from 'express'
import {getEvents,getEventById,createEvent,updateEvent} from '../controllers/event.controller.js'
import { authorizeRoles, authEventOwnerOrAdmin } from '../middlewares/authorization.middleware.js'
import passport from 'passport'
const router = Router()
router.get('/',getEvents)
router.get('/:id',passport.authenticate('current',{session:false}),authorizeRoles('organizer','admin'),authEventOwnerOrAdmin,getEventById)
router.post('/createEvent',passport.authenticate('current',{session:false}),authorizeRoles('organizer','admin'),createEvent)
router.put('/updateEvent/:id',passport.authenticate('current',{session:false}),authorizeRoles('organizer','admin'),authEventOwnerOrAdmin,updateEvent)
router.get('/admin/getEvents',passport.authenticate('current',{session:false}),authorizeRoles('admin'),getEvents)
export default router