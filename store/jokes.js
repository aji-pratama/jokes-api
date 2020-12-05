const axios = require('axios')

var jokes = []


async function getJoke() {
    try {
      	const response = await axios.get('http://api.icndb.com/jokes/random/');
      	return response.data.value;
    } catch (error) {
      	console.error(error);
    }
}

async function getAllJokes(){
    new_jokes = []
    joke = getJoke()
    for (let i = 0; i < 10; i++) {
        new_jokes.push(getJoke())
    }
    let jokesData = await Promise.all(new_jokes)
    return jokesData
}

module.exports = {
    jokes: jokes,
    getAllJokes: getAllJokes()
}
