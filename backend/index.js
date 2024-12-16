const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const game = require('./memorygame');
const cors = require('cors');
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/jwlgames')
.then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.log("Error connecting to database");
    });

app.get('/api/getGameData/:gameId', async (req, res) => {
    try {
        const gameData = await game.findOne();
        const words = Array.from(gameData.words.entries()).slice(0, 5).reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
        }, {});

        res.status(200).send({ ...gameData._doc, words });
    } catch (error) {
        res.status(500).send(error);
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});