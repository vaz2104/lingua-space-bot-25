const GrammarService = require("../services/GrammarService");
const PhrasebookService = require("../services/PhrasebookService");
const TextService = require("../services/TextService");
const WordsetService = require("../services/WordsetService");

async function loadMatherialDetails(setType, slug) {
  // console.log(setType, slug);

  let data = null;

  switch (setType) {
    case "grammar":
      data = await GrammarService.getSingleBy({
        id: slug,
        idType: "DATABASE_ID",
      });
      break;
    case "wordset":
      data = await WordsetService.getOneBySlug(slug, "DATABASE_ID");
      break;
    case "phrasebook":
      data = await PhrasebookService.getSingleBy(slug, "DATABASE_ID");
      break;
    case "text":
      data = await TextService.getSingleBy(slug, "DATABASE_ID");
      break;
  }

  return data;
}

module.exports = loadMatherialDetails;
