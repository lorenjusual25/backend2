import { EventDTO } from "./eventDTO.js";
export class TicketDTO {
    constructor(ticket) {
        this.id = ticket._id
        this.status = ticket.status
        this.quantity = ticket.quantity
        this.reservationCode = ticket.reservationCode
        this.createdAt = ticket.createdAt
        this.cancelledAt = ticket.cancelledAt
        if (ticket.event) {
            this.event = new EventDTO(ticket.event)
        }
        if (ticket.user) {
            this.user = {
                id: ticket.user._id || ticket.user,
                first_name: ticket.user.first_name,
                last_name: ticket.user.last_name
            }
        }
    }
}