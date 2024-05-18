import mongoose from "mongoose";

const deviceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    category: {
        name: {
            type: String,
            required: true
        },
        topic: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        voice: {
            type: String,
            required: true
        },
        notification: {
            type: Boolean,
            required: true
        },
        time: {
            type: String,
            required: true
        },
    },
}, { timestamps: true });

export const Device = mongoose.model('Device', deviceSchema);