const fetch = require("cross-fetch");

async function fetchApi(url, query, method = "POST") {
  try {
    let options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (method !== "GET") {
      options["body"] = JSON.stringify(query);
    }

    let response = await fetch(url, options);

    if (response.status !== 200) {
      console.log(await response.json());
      return null;
    }

    return await response.json();
  } catch (err) {
    console.warn("ferchAPI Error", err);
    throw new Error(err);
  }
}

module.exports = fetchApi;
