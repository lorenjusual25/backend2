import * as eventRepository from '../repositories/event.repository.js'
import {createEventService} from '../services/event.service.js'
import { EventDTO } from '../dto/eventDTO.js'
const eventService = createEventService(eventRepository)
export async function getEvents (req, res,next) {
    try {
        const result = await eventService.findAllEvents(req.query)
        const eventsDTO = result.data.map(e => new EventDTO(e))
        return res.json({
            message:"success",
            data:eventsDTO,
            page:result.page,
            limit:result.limit,
            total:result.total,
            totalPages:result.totalPages
        })
    }
    catch (error) {
        next(error)
    }
}
export async function getEventById (req,res,next) {
    try {
        const { id } = req.params
        const event = await eventService.findEventById(id)
        const eventDTO = new EventDTO(event)
        return res.json({message:"success",event:eventDTO})
    }
    catch (error) {
        next(error)
    }
}
export async function createEvent (req,res,next) {
    try {
        const newEvent = await eventService.createEvent(req.body,req.user)
        const eventDTO = new EventDTO(newEvent)
        return res.status(201).json({message: "evento creado", event:eventDTO})
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
        const eventDTO = new EventDTO(event)
        return res.status(200).json({
            status:"success",
            payload: eventDTO
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
    const eventDTO = new EventDTO(event)
    res.json({
        status: "success",
        message: "Estado del evento actualizado",
        data: eventDTO
    })
  } catch (error) {
    next(error)
  }
}