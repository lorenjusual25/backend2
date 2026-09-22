import * as ticketDao from '../dao/ticket.dao.js'
export async function createTicket (ticket) {
    return ticketDao.createTicket(ticket)
}
export async function findByUserAndEvent(userId, eventId) {
    return ticketDao.findByUserAndEvent(userId,eventId)
}
export async function findById(id) {
    return ticketDao.findById(id)
}
export async function findByUser (userId) {
    return ticketDao.findByUser(userId)
}
export async function findByEvent (eventId) {
    return ticketDao.findByEvent(eventId)
}
export async function save (ticket) {
    return ticketDao.save(ticket)
}
export async function sumReservedByEvent(eventId) {
    return ticketDao.sumReservedByEvent(eventId)
}