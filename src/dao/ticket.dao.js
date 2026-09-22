import Ticket from '../models/ticketModel.js'
export async function createTicket (ticket) {
    return Ticket.create(ticket)
}
export async function findByUserAndEvent(userId, eventId){
    return Ticket.findOne({user: userId, event: eventId, status: { $ne: 'cancelled' }})
}
export async function findById(id){
    return Ticket.findById(id).populate("event").populate("user","first_name last_name email")
}
export async function findByUser(userId){
    return Ticket.find({ user: userId }).populate("event", "title date location").sort({ createdAt:-1 })
}
export async function findByEvent(eventId){
    return Ticket.find({ event: eventId }).populate("user", "first_name last_name email").sort({ createdAt:-1 })
}
export async function save(ticket){
    return ticket.save()
}
export async function sumReservedByEvent(eventId){
    const result = await Ticket.aggregate([
        { $match: { event: eventId, status: "confirmed" } },
        { $group: {_id: "$event", totalReserved:{ $sum: "$quantity"}}}
    ])
    return result[0]?.totalReserved || 0
}