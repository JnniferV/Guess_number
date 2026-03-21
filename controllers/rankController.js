const gameService = require("../services/gameService");

// Affichage de la classement
getRank = async (req, res) => {
    const games = await gameService.allGames();
    res.render("rank/list", {
        games: games,
    });
};

module.exports = {getRank};
