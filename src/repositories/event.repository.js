import * as eventDao from '../dao/event.dao.js'
export async function findAllEvents(filters, pagination) {
    return await eventDao.findAllEvents(filters,pagination)
}
export async function findEventById(id) {
    return await eventDao.findEventById(id)
}
export async function createEvent(e) {
    return await eventDao.createEvent(e)
}
export async function findEventByTitle(title) {
    return await eventDao.findEventByTitle(title)
}
export async function updateEvent(id, eventData) {
    return await eventDao.updateEvent(id, eventData)
}
export async function count (filter) {
    return await eventDao.count(filter)
}