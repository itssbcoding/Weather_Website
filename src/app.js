const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode=require('./utils/geolocation')
const forecast=require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000 //this gives heroku port number or 3000 when run on local machine

//Define paths for Express Config
const pathStaticPage = path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and view location
app.set('view engine','hbs')//we tell express, which templating engine we installed(here:-hbs)
app.set('views', viewPath)//we change the loaction of views folder and tell it to express
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(pathStaticPage))

app.get('',(req,res)=>{
     res.render('index',{
         name:'Shubham',
         title: 'Weather'
     })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name: 'Shubham',
        title:'Weather-App'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Shubham'
    })
})

app.get('/weather',(req,res)=>{
    const address=req.query.address
    if(!address)
    {
        return res.send({
            error:'No Address Provided!'
        })
    }
    geocode(address,(error,{latitude,longitude,place}={})=>{//this is the locationData 
        //object. using ES6 object destructuring, we extract its properties into variables of same name.
        if(error)
        {
            return res.send({
                error
            })
        }
    
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error)
            {
                return res.send({
                    error
                })
            }
            res.send({
                place,
                forecastData
            })
        })
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404',{
        title:'Help',
        message:'Help Article Not Found',
        name:'Shubham'
    })
})

app.get('*',(req,res)=>{
    res.render('404', {
        title:'404',
        message:'Page not Found!',
        name:'Shubham'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on '+port)
})