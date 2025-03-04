require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const adminRouts = require("./routs/adminRouts");
const botRouts = require("./routs/botRouts");
const studentRouts = require("./routs/studentRouts");
const telegramUserRouts = require("./routs/telegramUserRouts");
const authRouts = require("./routs/authRouts");
const groupRouts = require("./routs/groupRouts");

const grammarRouts = require("./routs/grammarRouts");
const wordsetRouts = require("./routs/wordsetRouts");
const phrasebooksRouts = require("./routs/phrasebooksRouts");
const textRouts = require("./routs/textRouts");
const taskRouts = require("./routs/taskRouts");

const BotMethods = require("./lib/BotMethods");
const PanelsInitialization = require("./lib/InitBotsPanel");

const app = express();

async function init() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log(`DB connected`);
  } catch (error) {
    console.log(`Error whyle init project ${error}`);
  }
}

init();

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: {
    interval: 300,
    autoStart: true,
  },
});

/*********************************************
 *     Commands
 **********************************************/
BotMethods.initCommand(bot);
BotMethods.callbackListener(bot);

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", `${process.env.APP_URL || "*"}`);
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to a LinguaSpace`s API" });
});
app.use("/api", studentRouts);
app.use("/api", adminRouts);
app.use("/api", botRouts);
app.use("/api", telegramUserRouts);
app.use("/api", authRouts);
app.use("/api", groupRouts);

app.use("/api", grammarRouts);
app.use("/api", wordsetRouts);
app.use("/api", phrasebooksRouts);
app.use("/api", textRouts);
app.use("/api", taskRouts);

app.listen(process.env.PORT, () => {
  console.log(`Main bot started and listening on port ${process.env.PORT}`);
});

PanelsInitialization();
