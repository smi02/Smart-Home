import mongoose from "mongoose";

// KeywordGame Schema
const KeywordGameSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    keywords: [
        {
            type: String,
            required: true
        }
    ]
});

// PuzzlePiece Schema
const PuzzlePieceSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    colorCode: {
        type: String,
        required: true
    }
});

// PuzzleGame Schema
const PuzzleGameSchema = new mongoose.Schema({
    totalPieces: {
        type: Number,
        required: true
    },
    puzzlePieces: [PuzzlePieceSchema]
});

// DominoPiece Schema
const DominoPieceSchema = new mongoose.Schema({
    leftContent: {
        type: String,
        required: true
    },
    rightContent: {
        type: String,
        required: true
    },
    leftOrder: {
        type: Number,
        required: true
    },
    rightOrder: {
        type: Number,
        required: true
    }
});

// DominoGame Schema
const DominoGameSchema = new mongoose.Schema({
    dominoPieces: [DominoPieceSchema]
});

// Chapter Schema
const ChapterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    theoryPdf: {
        type: String,
        required: true
    },
    exercisePdf: {
        type: String,
        required: true
    },
    practicalPdf: {
        type: String,
        required: true
    },
    keywordGames: [KeywordGameSchema],
    puzzleGames: [PuzzleGameSchema],
    dominoGames: [DominoGameSchema]
});

export const Chapter = mongoose.model('Chapter', ChapterSchema);