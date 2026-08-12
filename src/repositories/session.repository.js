import * as sessionDao from '../dao/session.dao.js'
export function createSession (s,eventId,user) {
    return sessionDao.createSession(s,eventId,user)
}
export function findAllSessions() {
    return sessionDao.findAllSessions()
}
export function findSessionsByEvent (eventId) {
    return sessionDao.findSessionsByEvent(eventId)
}