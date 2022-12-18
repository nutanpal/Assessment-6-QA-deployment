/////////part5 - ROLLBAR - log info and errors about your app /////////

require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const { bots, playerRecord } = require("./data");
const { shuffleArray } = require("./utils");

app.use(express.json());
//app.use(express.static("public"));
app.use(express.static(`${__dirname}/public`));

////// Rollbar setup
var Rollbar = require("rollbar");
const { PORT, ROLLBAR_KEY } = process.env;
// include and initialize the rollbar library with your access token
var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: "b41772c2d3c74ae2a0c2791c5a497503",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");

//step2 ENDPOINT set-up
//call in public folder files from client using either 1.endpts(app.get) or 2. (app.use()) and change other files the html href and css src links,use the endpts names in html
//STEP2a MW SETUP
//app.use(express.static(path.join(__dirname,'public/index.js')))

//ENDPOINT set-up
//calling endpts of client files from current place (__dirname)server
app.get("/", (req, res) => {
  rollbar.log("HTML page loaded successfully .");
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get("/styles", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/styles.css"));
});
app.get("/js", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/main.js"));
});
//step3 api
app.get("/api/robots", (req, res) => {
  try {
    res.status(200).send(botsArr);
  } catch (error) {
    rollbar.error(
      "Error: On clicking See All Bots button, bots not loading. /api not able to send bots array to front end. "
    );
    console.log("ERROR GETTING BOTS", error);
    res.sendStatus(400);
  }
});

app.get("/api/robots/five", (req, res) => {
  try {
    let shuffled = shuffleArray(bots);
    let choices = shuffled.slice(0, 5);
    let compDuo = shuffled.slice(6, 8);
    res.status(200).send({ choices, compDuo });
  } catch (error) {
    rollbar.critical(
      " Critical Error: /api/robots/5 bots not loading so can't default."
    );
    console.log("ERROR GETTING FIVE BOTS", error);
    res.sendStatus(400);
  }
});

app.post("/api/duel", (req, res) => {
  try {
    // getting the duos from the front end
    let { compDuo, playerDuo } = req.body;

    // adding up the computer player's total health and attack damage
    let compHealth = compDuo[0].health + compDuo[1].health;
    let compAttack =
      compDuo[0].attacks[0].damage +
      compDuo[0].attacks[1].damage +
      compDuo[1].attacks[0].damage +
      compDuo[1].attacks[1].damage;

    // adding up the player's total health and attack damage
    let playerHealth = playerDuo[0].health + playerDuo[1].health;
    let playerAttack =
      playerDuo[0].attacks[0].damage +
      playerDuo[0].attacks[1].damage +
      playerDuo[1].attacks[0].damage +
      playerDuo[1].attacks[1].damage;

    // calculating how much health is left after the attacks on each other
    let compHealthAfterAttack = compHealth - playerAttack;
    let playerHealthAfterAttack = playerHealth - compAttack;

    // comparing the total health to determine a winner
    if (compHealthAfterAttack > playerHealthAfterAttack) {
      playerRecord.losses++;
      res.status(200).send("You lost!");
    } else {
      playerRecord.losses++;

      rollbar.info("Great! You Win");
      res.status(200).send("You won!");
    }
  } catch (error) {
    rollbar.warning(
      "Error duel score tracking. Oops!the win/loss count is erroneous"
    );
    console.log("ERROR DUELING", error);
    res.sendStatus(400);
  }
});

app.get("/api/player", (req, res) => {
  try {
    res.status(200).send(playerRecord);
  } catch (error) {
    console.log("ERROR GETTING PLAYER STATS", error);
    res.sendStatus(400);
  }
});

//step 4
app.listen(4000, () => {
  console.log(`Listening on 4000`);
});
