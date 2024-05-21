import mongoose, { Types } from "mongoose";

const historySchema = mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
}, { timestamps: true })

export const History = mongoose.model('History', historySchema)