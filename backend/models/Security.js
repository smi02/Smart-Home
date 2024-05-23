import mongoose from "mongoose";

const securitySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    notification: {
        type: Boolean,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    primaryPassword: {
        type: String
    },
},  { timestamps: true })

export const Security = mongoose.model('Security', securitySchema)