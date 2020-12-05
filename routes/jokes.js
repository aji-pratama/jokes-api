const express = require('express')
const jokesStore = require('../store/jokes')
const router = express.Router()

let jokes = jokesStore.jokes
let getAllJokes = jokesStore.getAllJokes


function getRandomJokes(num, dataObj) {
    if (dataObj.length < num) {
        let index = Math.floor((Math.random() * jokes.length));
        let dataId = dataObj.map(item => item.id)
        if (!dataId.includes(jokes[index].id)){
            dataObj.push(jokes[index])
        }
        return getRandomJokes(num, dataObj)
    } else {
        return dataObj
    }
}

getAllJokes.then(function(jokesData){
    jokes = jokesData
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
        var dataObj = []
        if (jokes.length > 0){
            if (jokes.length > 5){
                getRandomJokes(5, dataObj)
            } else {
                var dataObj = jokes
            }
        }
        res.json(dataObj)
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
        jokes = jokes.concat(await getAllJokes)
        res.send(jokes)
    } catch (err) {
        res.send('Error ' + err)
    }
})

router.get('/random-ten', async(req, res) => {
    try {
        var dataObj = []
        if (jokes.length > 0){
            if (jokes.length > 10){
                getRandomJokes(10, dataObj)
            } else {
                var dataObj = jokes
            }
            dataObj.forEach(function (objs) {
                var arrWords = objs['joke'].split(" ")
                var obj = {}
                arrWords.forEach(function(item){
                    if (obj[item]) {
                        obj[item] = obj[item] + 1
                    } else {
                        obj[item] = 1
                    }
                })
                objs['words'] = obj
            })
        }
        res.json(dataObj)
    } catch (err) {
        res.send('Error ' + err)
    }
})

module.exports = router
