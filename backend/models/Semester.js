import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
    id: { type: String, required: true },
    text: { type: String, required: true },
    isCorrect: { type: Boolean, required: true }
});

const questionSchema = new mongoose.Schema({
    id: { type: String, required: true },
    text: { type: String, required: true },
    type: { type: String, required: true },
    answers: [answerSchema]
});

const testInfoSchema = new mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    timeInMinutes: { type: Number, required: true },
    attemptsAllowed: { type: Number, required: true },
    questions: [questionSchema]
});

const testSchema = new mongoose.Schema({
    name: { type: String, required: true },
    testInfo: testInfoSchema
});

const examSchema = new mongoose.Schema({
    name: { type: String, required: true },
    tests: [testSchema]
});

const semesterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    exams: [examSchema]
});

// , { timestamps: true }

export const Semester = mongoose.model('Semester', semesterSchema)