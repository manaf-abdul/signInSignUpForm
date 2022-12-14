import mongoose from 'mongoose'

const userModel = new mongoose.Schema(
    {
        name: {
            type: String,
            default:null
        },
        email: {
            type: String,
            default: null,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
            trim: true, 
            lowercase: true
        },
        password: {
            type: String,
            default:null
        }
    },{
        timestamps:true
    }
)

const User=mongoose.model("User",userModel)
export default User