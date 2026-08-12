import * as eventModel from '../models/eventModel.js'
export function findAllEvents (){
    return eventModel.findAllEvents()
}
export function createEvent (e) {
    return eventModel.createEvent(e)
}
export function findEventById (id) {
    return eventModel.findEventById(id)
}
export function findEventByTitle (title) {
    return eventModel.findEventByTitle(title)
}