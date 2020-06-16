const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Prashant Deshmukh",
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Prashant Deshmukh"
    })
})

app.get('/weather', (req, res) => {
    if (! req.query.address) {
        return res.send({
            error : "Address Must Be Provided"
        })
    }

    geocode(req.query.address,(error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error : error
            })    
        } else {
            forecast(latitude,longitude, (error, forecastData) => {
                if (error) {
                    return es.send({
                        error : error
                    })
                }
                
                res.send({
                    forecast : forecastData,
                    location : location,
                    address : req.query.address
                })
            })
        }
    })    
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "This is help message",
        title: 'Help',
        name: "Prashant Deshmukh"
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errMsg : "Help Article Not Found",
        name : "Prashant Deshmukh",
        title : "Error Page"
    })
})


app.get('*', (req,res) => {
    res.render('404', {
        errMsg : "Page not found",
        name : "Prashant Deshmukh",
        title : "Error Page"
    })
})

app.listen(port, () => {
    console.log("Server is up on port " + port)
})