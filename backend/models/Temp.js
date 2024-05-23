import mongoose from "mongoose";

const tempSchema = mongoose.Schema({
    topicdevice: {
        type: String,
        required: true
    },
    statusdevice: {
        type: String,
        required: true
    },
    notificationdevice: {
        type: String,
        required: true
    },
}, { timestamps: true })

export const Temp = mongoose.model('Temp', tempSchema)