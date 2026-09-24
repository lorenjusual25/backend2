import mongoose from 'mongoose'
import * as ticketRepository from '../repositories/ticket.repository.js'
import * as eventRepository from '../repositories/event.repository.js'
import {generateTicketCode} from '../utils/ticketCode.js'
import EmailService from './email.service.js'
import * as userRepository from '../repositories/user.repository.js'
function businessError (message,status = 400) {
    const error = new Error(message)
    error.status = status
    return error
}
function validateObjectId (id) {
    if (!mongoose.isValidObjectId(id)) {
        throw businessError ("ID invalido",400)
    }
}
function validateQuantity (quantity) {
    const value = Number(quantity)
    if(!Number.isInteger(value)|| value < 1){
        throw businessError("La cantidad de lugares debe ser mayor a 0",400)
    }
    return value
}
export class TicketService {
    async createTicket (user,eventId,quantity) {
        validateObjectId(eventId) 
        const seats = validateQuantity(quantity)
        const event = await eventRepository.findEventById(eventId)
        if (!event) {
            throw businessError("Este evento no existe",404)
        }
        if (event.status !== "published") {
            throw businessError("No se puede anotar a este evento",400)
        }
        if (new Date(event.date) <= new Date()) {
            throw businessError("Este evento ya terminó o no está disponible",400)
        }
        const existeTicket = await ticketRepository.findByUserAndEvent(user._id,event._id)
        if (existeTicket) {
            throw businessError("Usuario ya anotado a este evento",409)
        }
        const reserved = await ticketRepository.sumReservedByEvent(event._id)
        const available = Number(event.capacity) - reserved
        if (seats > available) {
            throw businessError("No hay suficientes cupos",400)
        }
        const createdTicket = await ticketRepository.createTicket({
            user: user._id,
            event: event._id,
            status: 'confirmed',
            quantity: seats,
            reservationCode: generateTicketCode()
        })
        const populatedTicket = await ticketRepository.findById(createdTicket._id)
        try {
            await EmailService.sendTicketConfirmation(user,event,populatedTicket)
        } catch (error) {
            console.error('No se pudo enviar el email:', error.message)
        }
        return populatedTicket
    }
    async getMyTickets(userId) {
        validateObjectId(userId)
        return ticketRepository.findByUser(userId)
    }
    async getEventTickets(eventId,user) {
        validateObjectId(eventId)
        const event = await eventRepository.findEventById(eventId)
        if (!event) {
            throw businessError("Este evento no existe",404)
        }
        const isAdmin = user.role === "admin"
        const isOwner = event.organizer?.toString() === user._id.toString()
        if (!isAdmin && !isOwner) {
            throw businessError("No tenes permisos para ver estos tickets",403)
        }
        return ticketRepository.findByEvent(eventId)
    }
    async cancelTicket(ticketId,user) {
        validateObjectId(ticketId)
        const ticket = await ticketRepository.findById(ticketId)
        if (!ticket) {
            throw businessError("Ticket no encontrado",404)
        }
        if (ticket.status === "cancelled") {
            throw businessError("Ticket ya cancelado",409)
        }
        const ticketUserId = ticket.user?._id || ticket.user
        const isOwner = ticketUserId.toString() === user._id.toString()
        const eventId = ticket.event?._id || ticket.event
        const event = await eventRepository.findEventById(eventId)
        const isAdmin = user.role === "admin"
        if (!isOwner && !isAdmin) {
            throw businessError("No tenes permisos para cancelar este ticket",403)
        }
        ticket.status = "cancelled"
        ticket.cancelledAt = new Date()
        const cancelledTicket = await ticketRepository.save(ticket)
        const ticketUser = ticket.user?._id? ticket.user: await userRepository.findUserById(ticket.user)
        try {
            await EmailService.sendTicketCancellation(
                ticketUser,
                event,
                cancelledTicket
            )
        } catch (error) {
            console.error("No se pudo enviar el email:", error.message)
        }
        return cancelledTicket
    }
}
export default new TicketService()