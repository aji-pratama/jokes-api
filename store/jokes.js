const axios = require('axios')

var jokes = []


async function getJoke() {
    await axios.get('http://api.icndb.com/jokes/random/').then(function(response) {
        if (jokes.length < 10) {
            let data = response.data.value
            dataId = jokes.map(data => data.id)
            if (!dataId.includes(data.id)){
                jokes.push(data)
                console.log("getJoke Length: "+ jokes.length)
            }
            return getJoke()
        }
    });
}

async function getAllJokes(){
    getJoke()
    return jokes
}

module.exports = {
    jokes: jokes,
    getAllJokes: getAllJokes(),
}
