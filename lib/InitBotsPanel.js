require("dotenv").config();
const { fork } = require("child_process");
const Bot = require("../models/Bot");

// const tokens = [
//   "5733322312:AAHemnA0AJ-olpfXlo57b8a0NeJ9uBbFpC8", // @MyFinTrackerBot:
//   "7992321179:AAGSb-TccSyKXtozyGvqnfjTPSjUvEbVqWE", // @AnnaNailsVnBot:
// ];

async function PanelsInitialization() {
  const tokens = await Bot.find({}, "token");

  tokens.forEach((botConfig, index) => {
    console.log(`Запускаємо ${botConfig._id}...`);
    const port = 3000 + index + 10;
    const botProcess = fork("./lib/BotPanel.js", [
      botConfig.token,
      port,
      botConfig._id,
    ]);

    // Логування повідомлень з процесу бота
    botProcess.on("message", (message) => {
      console.log(`Повідомлення від ${botConfig._id}:`, message);
    });

    // Обробка завершення процесу
    botProcess.on("exit", (code) => {
      console.log(`Процес ${botConfig._id} завершився з кодом: ${code}`);
    });
  });
}

module.exports = PanelsInitialization;
