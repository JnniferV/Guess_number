/** @type {import("mongoose").Model} */
const Game = require("../models/Game");

addGame = async (game) => {
    const newGame = new Game(game);
    return await newGame.save(); // Sauvegarde en base de données
};

update = async (game) => {
    return Game.findOneAndUpdate({_id: game._id}, game);
};

findById = async (id) => {
    return await Game.findOne({_id: id});
};

findAll = async () => {
    return Game.find().populate({
        path: "user",
        select: "email -_id",
    });
};

// Rechercher un jeu non terminé selon l’utilisateur du token JWT
findByUserAndInProgress = async (user) => {
    return Game.findOne({user: user._id, inProgress: true});
};

module.exports = {
    addGame,
    update,
    findById,
    findAll,
    findByUserAndInProgress,
};
