import * as eventRepository from '../repositories/event.repository.js'
import {createEventService} from '../services/event.service.js'
const eventService = createEventService(eventRepository)
export async function getEvents (req, res,next) {
    try {
        const result = await eventService.findAllEvents(req.query)
        return res.json({message:"success",...result})
    }
    catch (error) {
        next(error)
    }
}
export async function getEventById (req,res,next) {
    try {
        const { id } = req.params
        const event = await eventService.findEventById(id)
        return res.json({message:"success",event:event})
    }
    catch (error) {
        next(error)
    }
}
export async function createEvent (req,res,next) {
    try {
        const newEvent = await eventService.createEvent(req.body,req.user)
        return res.status(201).json({message: "evento creado", event:newEvent})
    } catch (error) {
        next(error)
    }
}
export async function updateEvent(req,res,next) {
    try {
        const {id} = req.params
        const data = req.body
        const user = req.user
        const event = await eventService.updateEvent(id,data,user)
        return res.status(200).json({
            status:"success",
            payload: event
        })
    } catch(error) {
        next(error)
    }
}
export async function changeEventStatus  (req, res, next) {
  try {
    const {status} = req.body
    if (!status) {
        return res.status(400).json({
            status: "error",
            message: "El campo status es obligatorio"
        })
    }
    const {id} = req.params
    const user = req.user
    const event = await eventService.changeStatus(id,status,user)
    res.json({
        status: "success",
        message: "Estado del evento actualizado",
        data: event
    })
  } catch (error) {
    next(error)
  }
}