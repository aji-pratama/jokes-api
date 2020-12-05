const express = require('express')
const axios = require('axios')

const router = express.Router()
var jokes = []


async function getJoke() {
    try {
      const response = await axios.get('http://api.icndb.com/jokes/random/');
      return response.data.value;
    } catch (error) {
      console.error(error);
    }
}

async function getAll(){
    new_jokes = []
    joke = getJoke()
    for (let i = 0; i < 10; i++) {
        new_jokes.push(getJoke())
    }
    let te_jokes = await Promise.all(new_jokes)
    return te_jokes
}

getAll().then(function(jokeData){
    jokes = jokeData
})


router.get('/all', async(req, res) => {
    try {
        res.json(jokes)
    } catch (err) {
        res.send('Error ' + err)
    }
})

router.get('/random-five', async(req, res) => {
    try {
        let indexes = []
        for (let i = 0; i < 5; i++) {
            let index = Math.floor((Math.random() * (jokes.length - 1) + 1));
            if (!indexes.includes(index)) {
                indexes.push(jokes[index])
            }
        }
        res.json(indexes)
    } catch (err) {
        res.send('Error ' + err)
    }
})

router.get('/remove-all', async(req, res) => {
    try {
        jokes = []
        res.json(jokes)
    } catch (err) {
        res.send('Error ' + err)
    }
})

router.get('/fetch-all', async(req, res) => {
    try {
        jokes = jokes.concat(await getAll())
        res.send(jokes)
    } catch (err) {
        res.send('Error ' + err)
    }
})

router.get('/random-ten', async(req, res) => {
    try {
        let indexes = []
        for (let i = 0; i < 10; i++) {
            let index = Math.floor((Math.random() * (jokes.length - 1) + 1));
            if (!indexes.includes(index)) {
                var arr = jokes[index]['joke'].split(" ")
                var obj = {}
                arr.forEach(function(item){
                    if (obj[item]) {
                        obj[item] = obj[item] + 1
                    } else {
                        obj[item] = 1
                    }
                })
                jokes[index]['words'] = obj
                indexes.push(jokes[index])
            }
        }
        res.json(indexes)
    } catch (err) {
        res.send('Error ' + err)
    }
})

module.exports = router
