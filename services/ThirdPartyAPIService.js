const { convert } = require("../lib/assemblyai");
const fs = require("fs");

class ThirdPartyAPIService {
  async audioToText(options) {
    const base64 = options?.audio;
    // console.log("base64", base64);

    const buffer = Buffer.from(base64, "base64");

    // console.log("buffer", buffer);

    const fileName = options?.userId || new Date().getTime();

    // console.log("fileName", fileName);

    let voice = "./uploads/" + fileName + ".webm";

    // console.log("voice", voice);

    await fs.writeFileSync(voice, buffer);

    const text = await convert(voice);

    return { text };
  }
}

module.exports = new ThirdPartyAPIService();
