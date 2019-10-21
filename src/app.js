const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))
const partialsPath = path.join(__dirname, '../views/partials')
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Weather Forecast'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Help Weather Forecast'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Weather App',
        name: 'About Weather Forecast'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({error: 'you must send an address'})
    }
    console.log(req.query.address)

    geocode(req.query.address, (error, {latitude, longitude, place} = {}) => {
        console.log(latitude,longitude, place)
        if (error) {
            return res.send({error})
        } else {
            forecast(latitude, longitude, (error, data) => {
                if (error) return res.send({error})
                return res.send(data)
            })
        }
    })

    
})

app.get('*', (req, res) => {
    res.render('404')
})

app.listen(port, () => {
    console.log('server is running on port', port)
})