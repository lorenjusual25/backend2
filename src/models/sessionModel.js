const sessions = []
export function createSession(s,eventId,user) {
    const session = {
        id:sessions.length + 1,
        eventId: Number(eventId),
        user,
        ...s
    }
    sessions.push(session)
    return session
}
export function findAllSessions() {
    return sessions
}
export function findSessionsByEvent(eventId) {
    return sessions.filter(s => s.eventId === Number(eventId))
}