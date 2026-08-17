import {createHash} from'../utils/hash.js'
const longMinPass = 8
export function createSessionService(sessionRepository,eventRepository,userRepository) {
    return {
        async createSession (session) {
            const event = await eventRepository.findEventById(session.eventId)
            if (!event) {
                throw new Error ("El evento no existe")
            }
            const userExists = await userRepository.findUserById(session.userId)
            if (!userExists) {
                throw new Error ("El usuario no existe")
            }
            const userInSession = await sessionRepository.findUserInSession(session.eventId,session.userId)
            if (userInSession) {
                throw new Error ("Este usuario ya existe en alguna sesion")
            }
            return await sessionRepository.createSession(session)
        },
        async findAllSessions () {
            return await sessionRepository.findAllSessions()
        },
        async findSessionsByEvent (eventId) {
            const event = await eventRepository.findEventById(eventId)
            if (!event) {
                throw new Error("El evento no existe")
            }
            return await sessionRepository.findSessionsByEvent(eventId)
        },
        async register(userData) {
            const first_name = userData.first_name?.trim()
            const last_name = userData.last_name?.trim()
            const email = userData.email?.trim().toLowerCase()
            const password = userData.password
            if (!first_name || !last_name || !email || !password) {
                throw new Error("Faltan campos")
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(email)) {
                throw new Error("No es un formato email correcto")
            }
            if (password.length > longMinPass) {
                throw new Error(`La contraseña no puede tener una cantidad de caracteres mayor a ${longMinPass}`)
            }
            const emailExiste = await userRepository.findEmail(email)
            if (emailExiste) {
                throw new Error("Este email ya existe")
            }
            const user = {
                first_name,
                last_name,
                email,
                password:await createHash(userData.password),
                role:"user"
            }
            const newUser = await userRepository.addUser(user)
            return ({
                id:newUser._id,
                first_name:newUser.first_name,
                last_name:newUser.last_name,
                email:newUser.email,
                role:newUser.role
            })
        }
    }
}