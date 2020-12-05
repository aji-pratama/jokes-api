const axios = require('axios')

var jokes = []


async function getJoke(num) {
    await axios.get('http://api.icndb.com/jokes/random/').then(function(response) {
        if (jokes.length < num) {
            let data = response.data.value
            dataId = jokes.map(data => data.id)
            if (!dataId.includes(data.id)){
                jokes.push(data)
                console.log("getJoke Length: "+ jokes.length)
            }
            return getJoke(num)
        }
    });
}

async function getAllJokes(){
    getJoke(10)
    return jokes
}

module.exports = {
    jokes: jokes,
    getAllJokes: getAllJokes(),
}
