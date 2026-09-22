import {Router} from 'express'
import {getEvents,getEventById,createEvent,updateEvent,changeEventStatus} from '../controllers/event.controller.js'
import { authorizeRoles, authEventOwnerOrAdmin } from '../middlewares/authorization.middleware.js'
import passport from 'passport'
const router = Router()
const authenticate = passport.authenticate("current",{session: false})
router.get('/admin/getEvents',authenticate,authorizeRoles('admin'),getEvents)
router.get('/',getEvents)
//router.get('/:id',authenticate,authorizeRoles('organizer','admin'),authEventOwnerOrAdmin,getEventById)
router.get('/:id',getEventById)
router.put('/updateEvent/:id',authenticate,authorizeRoles('organizer','admin'),updateEvent)
router.post('/createEvent',authenticate,authorizeRoles('organizer','admin'),createEvent)
router.patch('/:id/status',authenticate,authorizeRoles('organizer','admin'),changeEventStatus)
export default router