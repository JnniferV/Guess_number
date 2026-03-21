const gameRepository = require("../repositories/gameRepository");
const {v4: uuidv4} = require("uuid");

function generateGoodNumber() {
    return Math.floor(Math.random() * 100) + 1; // Attention Math.random() [0,1[
}

function checkNumber(mysteryNumber, choice) {
    //Mise en place des messages flash
    let errorMessage = 'Vous devez saisir un nombre';
    let successMessage = '';

    if (choice > mysteryNumber) {
        errorMessage = 'Nombre trop grand';
    } else if (choice < mysteryNumber) {
        errorMessage = 'Nombre trop petit';
    } else if (choice === mysteryNumber) {
        successMessage = 'Bravo !';
        errorMessage = '';
    }

    return {errorMessage, successMessage};
}

// Classement
const saveGame = async (game) => {
    game.uuid = uuidv4();
    return await gameRepository.addGame(game);
};

const update = async (game) => {
    return await gameRepository.update(game);
};

const searchById = async (id) => {
    return await gameRepository.findById(id);
};

const allGames = async () => {
    return await gameRepository.findAll();
};

const gameInProgress = async (user) => {
    return await gameRepository.findByUserAndInProgress(user);
};


module.exports = {
    generateGoodNumber,
    checkNumber,
    saveGame,
    update,
    searchById,
    allGames,
    gameInProgress
};
