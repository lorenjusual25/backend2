import mongoose, { Schema,model } from "mongoose";
const eventSchema = new Schema(
    {
        title: {
            type:String,
            required:true,
            trim:true
        },
        description: {
            type:String,
            required:true,
            trim:true
        },
        category:{
            type: String,
            required: true,
            trim: true
        },
        date: {
            type:Date,
            required:true
        },
        location: {
            type:String,
            required:true,
            trim:true
        },
        capacity: {
            type: Number,
            required:true,
            min:1
        },
        price: {
            type: Number,
            required: true,
            default:0,
            min: 0
        },
        status: {
            type: String,
            enum: ["draft", "published", "cancelled", "finished"],
            default: "draft"
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