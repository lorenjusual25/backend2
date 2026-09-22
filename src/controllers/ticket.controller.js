import ticketService from "../services/ticket.service.js"
export async function createTicket (req, res, next) {
    try{
        const { eventId } = req.params
        const { quantity = 1 } = req.body
        const ticket = await ticketService.createTicket(req.user, eventId, quantity)
        res.status(201).json({
            status: "success",
            massage: "Incripcion realizada con exito",
            data: {
                id: ticket._id,
                event: ticket.event,
                quantity: ticket.quantity,
                status: ticket.status,
                reservationCode: ticket.reservationCode
            }
        })
    }catch(error){
        next(error)
    }
}