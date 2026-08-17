import mongoose, { Schema,model} from 'mongoose'
const userSchema = new Schema({
    first_name:{
        required:true,
        type:String,
        trim:true
    },
    last_name:{
        required:true,
        type:String,
        trim:true
    },
    email: {
        required:true,
        type:String,
        trim:true,
        unique:true,
        lowercase:true,
    },
    password: {
        required:true,
        type:String,
    },
    role:{
        type:String,
        enum:["admin","user","organizer"],
        default:"user"
    },
})
export const userModel = mongoose.model("user",userSchema)