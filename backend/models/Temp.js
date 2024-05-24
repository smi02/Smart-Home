import mongoose from "mongoose";

const tempSchema = mongoose.Schema({
    topictemp: {
        type: String,
        required: true
    },
    statustemp: {
        type: String,
        required: true
    },
    notificationtemp: {
        type: String,
        required: true
    },
    topichumi: {
        type: String,
        required: true
    },
    statushumi: {
        type: String,
        required: true
    },
    notificationhumi: {
        type: String,
        required: true
    },
}, { timestamps: true })

export const Temp = mongoose.model('Temp', tempSchema)