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

app.post("/api/gameData/:gameId", async (req, res) => {
    const levelData = {
        words: [
            {
                level: 1,
                words: [
                    { word: "if", letters: ["p", "i", "d"] },
                    { word: "at", letters: ["a", "b", "n"] },
                    { word: "go", letters: ["f", "w", "g"] },
                    { word: "be", letters: ["k", "x", "b"] },
                    { word: "do", letters: ["p", "d", "c"] }
                ]
            },
            {
                level: 2,
                words: [
                    { word: "rid", letters: ["n", "y", "r"] },
                    { word: "put", letters: ["p", "a", "s"] },
                    { word: "rag", letters: ["p", "r", "d"] },
                    { word: "led", letters: ["j", "g", "l"] },
                    { word: "rug", letters: ["y", "r", "n"] }
                ]
            }
        ]
    };

    const gameData = new game({
        words: levelData.words
    });
    try {
        await gameData.save();
        res.status(201).send(gameData);
    }
    catch (err) {
        res.status(400).send(err);
    }
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