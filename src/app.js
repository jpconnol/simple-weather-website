const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

// Paths for Express config
const dir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(dir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'JP Connolly'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'JP Connolly'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is a help message',
        title: 'Help',
        name: 'JP Connolly'
    })
})

app.get('/weather', (req, res) => {
    address = req.query.address
    if (!address){
        return res.send({
            error: 'Address parameter is required.'
        })
    }

    geocode(address, (err, {latitude, longitude, place} = {}) => {
        if(err){
            return res.send({err})
        } 
        forecast(latitude, longitude, (err, {temperature, description} = {}) => {
            if(err){
                return res.send(err)
            }
            res.send({
                temperature,
                description: description[0],
                place
            })
        })
    
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'Search term is required. No argument given.'
        })
    }
    console.log(req.query)
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help Article Not Found',
        title: '404',
        name: 'JP Connolly'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page Not Found',
        title: '404',
        name: 'JP Connolly'
    })
})

app.listen(port, ()=> {
    console.log(`Server Listening on Port ${port}`)
})



