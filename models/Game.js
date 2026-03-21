/**
 * Création modèle models/Game
 */
const mongoose = require('mongoose');

const Game = mongoose.model(
    'Game',
    new mongoose.Schema({
        uuid: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        attempts: Number,
        numberToFind: Number,
        time: Number,
        inProgress: Boolean,
    })
);

module.exports = Game;
