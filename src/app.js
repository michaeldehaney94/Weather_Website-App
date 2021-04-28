const express = require('express') //use express module in project
const hbs = require('hbs') //use to create partials
const path = require('path') //used to create and find  filepaths
const geocode = require('./utils/geocode.js') //import geocode
const forecast = require('./utils/forecast.js')//import forecast

const app = express() 

//port number used to connect to heroku server
const port = process.env.PORT || 3000 //default port

//static file location path
const directoryPath = path.join(__dirname, '../public')
//new path for views
const viewPath = path.join(__dirname, '../templates/views') 
//partials path
const partialsPath = path.join(__dirname, '../templates/partials')

//setting up handlebars and views to be recognized in express
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath)

//this method finds the folder containing static file
app.use(express.static(directoryPath)); 

//route for index.hbs
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Michael Dehaney'
    }); //view file
});

//route for about.hbs
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Michael Dehaney'
    });
});

//route for about.hbs
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Need Help?',
        message: 'In the search box, enter a location, anywhere in the world, and get a forecast of the area.',
        name: 'Michael Dehaney'
    });
});

//weather page route handler modified to use query string
//http://localhost:3000/weather?address=spanish town
app.get('/weather', (req, res) => {
    if (!req.query.address) {
       return res.send({
           error: 'You must provide an address'
       });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} ={}) => {
        if (error) {
            return res.send({error})   
        } 

        forecast(longitude, latitude , (error, forecastData) => {
            if (error) {
                return res.send({error})   
            } 
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            });
        })
    })
    
})

//help 404 page if link to web document is not found
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Michael Dehaney',
        errorMessage: 'Help article not found'
    });
});


//404 page
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Michael Dehaney',
        errorMessage: 'Page not found'
    });
});

app.listen(port, () => {
    console.log('Server started on port ' + port) //indicate server started on port.
});