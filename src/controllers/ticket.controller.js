import ticketService from "../services/ticket.service.js"
export async function createTicket (req,res,next) {
    try {
        const {eventId} = req.params
        const {quantity = 1} = req.body
        const ticket = await ticketService.createTicket(
            req.user,
            eventId,
            quantity
        )
        return res.status(201).json({
            status: "success",
            message: "Inscripcion realizada con exito",
            data: {
                id: ticket._id,
                event: ticket.event,
                quantity: ticket.quantity,
                status: ticket.status,
                reservationCode: ticket.reservationCode
            }
        })
    } catch (error) {
        next(error)
    }
}
export async function getMyTickets (req,res,next) {
    try {
        const tickets = await ticketService.getMyTickets(req.user._id)
        return res.status(200).json({
            status: "success",
            payload: tickets
        })
    } catch (error) {
        next(error)
    }
}
export async function getEventTickets (req,res,next) {
    try {
        const {eventId} = req.params
        const tickets = await ticketService.getEventTickets(eventId,req.user)
        return res.status(200).json({
            status: "success",
            payload: tickets
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