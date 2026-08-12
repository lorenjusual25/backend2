import * as sessionModel from '../models/sessionModel.js'
export function createSession (s,eventId,user) {
    return sessionModel.createSession(s,eventId,user)
}
export function findAllSessions () {
    return sessionModel.findAllSessions()
}
export function findSessionsByEvent(eventId) {
    return sessionModel.findSessionsByEvent(eventId)
}