const { convert } = require("../lib/assemblyai");
const fs = require("fs");

class ThirdPartyAPIService {
  async audioToText(options) {
    const base64 = options?.audio;
    const buffer = Buffer.from(base64, "base64");

    const fileName = options?.userId || new Date().getTime();
    let voice = "./uploads/" + fileName + ".webm";
    await fs.writeFileSync(voice, buffer);

    const text = await convert(voice);

    return { text };
  }
}

module.exports = new ThirdPartyAPIService();
