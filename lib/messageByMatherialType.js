const LINK_URL = "";
const LINK_TITLE = "Перейти в бот";

async function sendWordQuiz(bot, chatId, quizType, wordId, optionsIDs) {
  try {
    const answerWords = [...optionsIDs];
    answerWords.push(wordId);
    const mixedAnswerWords = shuffle(shuffle(answerWords));
    const wordsData = await fetchGraphQL(queryWordsIn, {
      in: mixedAnswerWords,
    });

    if (!wordsData) {
      console.log("Не вдалось завантажити слова");
      return null;
    }

    const options = [];
    let correctOptionId = 0;
    let currentWordOptions;
    const wordsDataNodes = wordsData.words.nodes;
    wordsDataNodes.forEach((node, index) => {
      const nodeTranslation =
        node.wordOptions.wordOptions.uaTranslation ||
        node.wordOptions.wordOptions.ruTranslation;
      const option =
        quizType === "translationWord" ? node.title : nodeTranslation;
      options.push(option);
      if (node.databaseId === wordId) {
        correctOptionId = index;
        currentWordOptions = node;
      }
    });

    const title = currentWordOptions.title;
    const { sound, soundfile, ruTranslation, uaTranslation } =
      currentWordOptions.wordOptions.wordOptions;
    const fullAudioPath =
      soundfile && soundfile.mediaItemUrl
        ? soundfile.mediaItemUrl
        : SOUNDS_FOLDER + sound;

    const translation = uaTranslation || ruTranslation;

    let quizTitle;
    switch (quizType) {
      case "audioTranslation":
        await bot.sendAudio(chatId, fullAudioPath);
        quizTitle = "Прослухайте аудіо та перекладіть слово на українську мову";
        break;
      case "wordTranslation":
        quizTitle = `Перекладіть українською слово «${title}»`;
        break;
      case "translationWord":
        quizTitle = `Перекладіть aнглійською слово «${translation}»`;
        break;
    }

    return await bot.sendPoll(chatId, quizTitle, options, {
      type: "quiz",
      correct_option_id: correctOptionId,
      is_anonymous: true,
    });
  } catch (error) {
    console.log(console.log(error));
    return null;
  }
}

async function sendSentenceQuiz(
  bot,
  chatId,
  sentenceId,
  hiddenText,
  answerOptions
) {
  try {
    const sentenceOptions = await fetchGraphQL(querySentenceById, {
      id: sentenceId,
    });

    if (!sentenceOptions) {
      console.log("Не вдалось завантажити речення");
      return null;
    }

    const { title } = sentenceOptions.sentence;
    const { audio, soundfile, uaTranslation, ruTranslation } =
      sentenceOptions.sentence.sentenceOptions.sentenceOptions;
    const fullAudioPath =
      soundfile && soundfile.mediaItemUrl
        ? soundfile.mediaItemUrl
        : SOUNDS_FOLDER + audio;

    const translation = uaTranslation || ruTranslation;
    const filteredTitle = title.replace(hiddenText, "______");

    const options = [...answerOptions, hiddenText];
    const mixedOptions = shuffle(shuffle(options));
    let quizTitle = "Варіанти відповіді:";
    await bot.sendMessage(
      chatId,
      `Оберіть один із варіантів, який потрібно поставити в пропущене місце\n\n<b>${filteredTitle}</b>\n<i>- ${translation}</i>`,
      {
        parse_mode: "HTML",
      }
    );
    if (audio) {
      await bot.sendAudio(chatId, fullAudioPath);
    }
    const poll = await bot.sendPoll(chatId, quizTitle, mixedOptions, {
      type: "quiz",
      correct_option_id: mixedOptions.indexOf(hiddenText),
      is_anonymous: true,
    });
    return poll;
  } catch (error) {
    console.log(error);
    return null;
  }
}

function printWordSet(words) {
  let list = "";

  words.forEach((word, index) => {
    const { transcription, uaTranslation } = word?.wordOptions?.wordOptions;
    list += `<b>• ${word.title}</b> - <i>${uaTranslation}</i> - ${transcription}\n`;
  });

  return list;
}

function printPhrasesSet(phrases) {
  let list = "";

  phrases.forEach((phrase, index) => {
    const { uaTranslation } = phrase?.sentenceOptions?.sentenceOptions;
    let newLine = index !== 0 ? "\n\n" : "";
    list += newLine + `<b>• ${phrase.title}</b>\n<i>${uaTranslation}</i>`;
  });

  return list;
}

function messageByMatherialType(content, type) {
  let body = null;
  let thumbnail = null;
  let footerText = "";

  switch (type) {
    case "grammar":
      const sentencesPart = content?.RulesData?.rulesData?.sentences.slice(
        0,
        3
      );
      const examples = printPhrasesSet(sentencesPart);

      body =
        content?.RulesData?.rulesData?.content.replace(/<\/?[^>]+(>|$)/g, "") +
        "\n\nПРИКЛАДИ РЕЧЕНЬ\n\n" +
        examples +
        "\n";

      footerText =
        "<b><u>Бажаєш закріпити граматику?</u></b>\nПереходь в телеграм бот, виконуй завдання, цим самим поєднуюй теоретичні знання з практикою😉";
      break;
    case "wordset":
      thumbnail = content?.wordSetOptions?.wordSetOptions?.image?.mediaItemUrl;
      body = printWordSet(content?.wordSetOptions?.wordSetOptions?.words);
      footerText =
        "<b><u>Хочеш запамятати цей набір слів?</u></b>\nПереходь в телеграм бот, виконуй завдання, цим самим практикуй вимову та написання😉";
      break;
    case "phrasebook":
      thumbnail =
        content?.sentenceSetOptions?.sentenceSetOptions?.image?.mediaItemUrl;
      body = printPhrasesSet(
        content?.sentenceSetOptions?.sentenceSetOptions?.sentences
      );
      footerText =
        "<b><u>Хочеш запамятати дані фрази?</u></b>\nПереходь в телеграм бот, виконуй завдання, цим самим практикуй вимову та написання😉";
      break;
    case "text":
      thumbnail = content?.TextOptions?.textOptions?.image?.mediaItemUrl;
      const cleanText = content?.TextOptions?.textOptions?.content.replace(
        /<\/?[^>]+(>|$)/g,
        ""
      );
      body = cleanText;

      footerText =
        "<b>Переходь в телеграм бот, виконуй завдання до тексту, цим самим вдосконалюй читання та сприйняття тексту на слух😉</b>";
      break;
  }

  return { thumbnail, body, footerText };
}

module.exports = messageByMatherialType;
