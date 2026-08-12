import * as eventDao from '../dao/event.dao.js'
export function findAllEvents() {
    return eventDao.findAllEvents()
}
export function findEventById(id) {
    return eventDao.findEventById(id)
}
export function createEvent(e) {
    return eventDao.createEvent(e)
}
export function findEventByTitle(title) {
    return eventDao.findEventByTitle(title)
}