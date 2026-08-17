import * as sessionRepository from '../repositories/session.repository.js'
import * as eventRepository from '../repositories/event.repository.js'
import * as userRepository from '../repositories/user.repository.js'
import { createSessionService } from '../services/session.service.js'
const sessionService = createSessionService(sessionRepository,eventRepository,userRepository)
export async function createSession(req,res,next) {
    try {
        const session = req.body
        const s = await sessionService.createSession(session)
        return res.status(201).json({status:"success",message:"sesion creada",payload:s})
    } 
    catch (error) {
        next(error)
    }
}
export async function findAllSessions (req,res,next) {
    try {
        const sessions = await sessionService.findAllSessions()
        return res.json({status:"success",payload:sessions})
    }
    catch (error) {
        next(error)
    }
}
export async function findSessionsByEvent (req,res,next) {
    try {
        const { eventId } = req.params
        const sessions = await sessionService.findSessionsByEvent(eventId)
        return res.json({status:"success",payload:sessions})
    } 
    catch (error) {
        next(error)
    }
}
export async function register(req,res,next) {
    try {
        const newUserInfo = req.body
        const user = await sessionService.register(newUserInfo)
        res.status(201).json({status:"success",payload:user})
    } 
    catch (error) {
        next(error)
    }
}