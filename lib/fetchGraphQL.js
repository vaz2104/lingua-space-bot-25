const fetch = require('cross-fetch')

async function fetchGraphQL (query, variables) {
    const data = await fetch(`${process.env.WP_URL}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables
        }),
      })
        .then(res => res.json())
        .then(res => {
          if(!res.data) {
            console.log(res);
          }
          return res.data
        })

    // console.log(data);
    return data
}

module.exports = fetchGraphQL