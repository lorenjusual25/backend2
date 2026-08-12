export function createSessionService(sessionRepository,eventRepository,userRepository) {
    return {
        async createSession (s,eventId,user) {
            const event = await eventRepository.findEventById(eventId)
            if (!event) {
                throw new Error ("El evento no existe")
            }
            const existe = await userRepository.findUserById(user.id)
            if (!existe) {
                throw new Error ("El usuario no existe")
            }
            return sessionRepository.createSession(s,eventId,user)
        },
        async findAllSessions () {
            return sessionRepository.findAllSessions()
        },
        async findSessionsByEvent (eventId) {
            const event = await eventRepository.findEventById(eventId)
            if (!event) {
                throw new Error("El evento no existe");
            }
            return sessionRepository.findSessionsByEvent(eventId)
        }
    }
}