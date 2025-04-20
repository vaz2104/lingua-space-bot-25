require("dotenv").config();
const { AssemblyAI } = require("assemblyai");

async function convert(audioFile) {
  const client = new AssemblyAI({
    apiKey: process.env.ASSEMBLY_AI_KEY,
  });

  const params = {
    audio: audioFile,
  };

  const transcript = await client.transcripts.transcribe(params);

  if (transcript.status === "error") {
    console.error(`Transcription failed: ${transcript.error}`);
    process.exit(1);
  }

  const text = transcript.text
    ? transcript.text.toLowerCase().slice(0, -1)
    : "";

  console.log(text);
  return text;
}

module.exports = { convert };
