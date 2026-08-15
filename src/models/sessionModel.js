import mongoose, { Schema,model } from "mongoose";
const sessionSchema = new Schema({
    eventId: {
        type:Schema.Types.ObjectId,
        ref:"event",
        required:true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
})
export const sessionModel = mongoose.model("session",sessionSchema)
/*export function createSession(s,eventId,user) {
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
}*/