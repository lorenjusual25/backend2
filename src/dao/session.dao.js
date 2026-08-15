import * as sessionModel from '../models/sessionModel.js'
export async function createSession (eventId,userId) {
    return await sessionModel.sessionModel.create({eventId,userId})
}
export async function findAllSessions () {
    return await sessionModel.findAllSessions()
}
export async function findSessionsByEvent(eventId) {
    return await sessionModel.findSessionsByEvent(eventId)
}