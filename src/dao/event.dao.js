import {eventModel} from '../models/eventModel.js'
export async function createEvent (e) {
    return await eventModel.create(e)
}
export async function findAllEvents (filter, { skip, limit, sort }){
    return await eventModel.find(filter).populate("organizer","first_name last_name email role")
      .sort(sort)
      .skip(skip)
      .limit(limit)
}
export async function findEventById (id) {
    return await eventModel.findById(id)
}
export async function findEventByTitle (title) {
    return await eventModel.findOne({title})
}
export async function updateEvent (id, eventData) {
    return await eventModel.findByIdAndUpdate(id,eventData,{new:true, runValidators:true})
}
export async function count (filter) {
    return await eventModel.countDocuments(filter)
}