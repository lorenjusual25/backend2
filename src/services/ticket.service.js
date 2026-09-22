import mongoose from 'mongoose'
import * as ticketRepository from '../repositories/ticket.repository.js'
import * as eventRepository from '../repositories/event.repository.js'
import {generateTicketCode} from '../utils/ticketCode.js'
import EmailService from './email.service.js'
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
        if (newDate(event.date) <= new Date()) {
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
            console.error('No se pudo enviar el email:', emailError.message)
        }
        return populatedTicket
    }
    async getMyTickets(userId) {
        validateObjectId(userId)
        return ticketRepository.findByUser(userId)
    }
    async getEventTickets(eventId) {
        validateObjectId(eventId)
        return ticketRepository.findByEvent(eventId)
    }
    async cancelTicket(ticketId,user) {
        validateObjectId(ticketId)
        const ticket = await ticketRepository.findById(ticketId)
        if (!ticket) {
            throw businessError('Ticket no encontrado', 404)
        }
        if(ticket.status === "cancelled"){
            throw businessError("Ticket ya cancelado", 409)
        }
        const isOwner = ticket.user?._id? ticket.user._id.toString() === currentUser._id.toString(): ticket.user.toString() === currentUser._id.toString()
        const event = await eventRepository.findEventById(ticket.event?._id ?? ticket.event)
        const isEventOwner = event && event.organizer?.toString() === currentUser._id.toString()
        const isAdmin = currentUser.role === 'admin'
        if (!isOwner && !isAdmin && !isEventOwner) {
            throw businessError('No tienes permisos para cancelar este ticket', 403)
        }
        ticket.status = 'cancelled'
        ticket.cancelledAt = new Date()
        return ticketRepository.save(ticket)
    }
}
export default new TicketService()