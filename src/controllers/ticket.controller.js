import ticketService from "../services/ticket.service.js"
import { TicketDTO } from "../dto/ticketDTO.js"
export async function createTicket (req,res,next) {
    try {
        const {eventId} = req.params
        const {quantity = 1} = req.body
        const ticket = await ticketService.createTicket(
            req.user,
            eventId,
            quantity
        )
        const ticketDTO = new TicketDTO(ticket)
        return res.status(201).json({
            status: "success",
            message: "Inscripcion realizada con exito",
            data: ticketDTO
        })
    } catch (error) {
        next(error)
    }
}
export async function getMyTickets (req,res,next) {
    try {
        const tickets = await ticketService.getMyTickets(req.user._id)
        const ticketsDTO = tickets.map(t => new TicketDTO(t))
        return res.status(200).json({
            status: "success",
            payload: ticketsDTO
        })
    } catch (error) {
        next(error)
    }
}
export async function getEventTickets (req,res,next) {
    try {
        const {eventId} = req.params
        const tickets = await ticketService.getEventTickets(eventId,req.user)
        const ticketsDTO = tickets.map(t => new TicketDTO(t))
        return res.status(200).json({
            status: "success",
            payload: ticketsDTO
        })
    } catch (error) {
        next(error)
    }
}
export async function cancelTicket (req,res,next) {
    try {
        const {ticketId} = req.params
        const ticket = await ticketService.cancelTicket(
            ticketId,
            req.user
        )
        return res.status(200).json({
            status: "success",
            message: "Ticket cancelado",
            payload: ticket
        })
    } catch (error) {
        next(error)
    }
}