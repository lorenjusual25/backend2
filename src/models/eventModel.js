import mongoose, { Schema,model } from "mongoose";
const eventSchema = new Schema(
    {
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
        },
        capacity: {
            type: Number,
            default:0,
            min:0
        },
        organizer: {
            type: Schema.Types.ObjectId,
            ref:"user",
            required:true
        }
    },
    {
        timestamps:true
    }
)
export const eventModel = mongoose.model("event",eventSchema)