import mongoose, { Schema,model } from "mongoose";
const eventSchema = new Schema({
    title: {
        type:String,
        required:true
    },
    date: {
        type:Date,
        required:true
    },
    location: {
        type:String,
        required:true
    }
})
export const eventModel = mongoose.model("event",eventSchema)
/*
export function createEvent (e) {
    const event = {
        id:events.length + 1,
        title: e.title,
        date: e.date,
        location: e.location
    }
    events.push(event)
    return event
}
export function findAllEvents () {
    return events;
}
export function findEventById (id) {
    return events.find(e => e.id === Number(id))
}
export function findEventByTitle(title) {
    return events.find(e => e.title === title)
}*/