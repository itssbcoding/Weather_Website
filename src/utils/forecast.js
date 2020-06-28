//if you don't understand, this code uses ES6 object destructuring. This also contains callback functions.(a fn passed as an argument)

const request = require('request')

const forecast = (latittude,longitude,callback)=>{
    
    const url = 'http://api.weatherapi.com/v1/current.json?key=1457b8285dca49e0893204833201606&q='+latittude+','+longitude

    request({url, json: true},(error,{body}={})=>{ //instead of setting url:url, we use Shorthand ES6 property. we replace response with {body}, because it is the only property of Response object which we will ever use
    //if response is undefined then the body default value will be {}  
        if(error){
            callback('Unable to Connect to weather Services!',undefined)
        }
        else if(body.error)
        {
            callback(body.error.message,undefined)
        }
        else{
            callback(undefined,'The weather condition is '+body.current.condition.text+' and Current temperature is '+body.current.temp_c+'°C')
        }
    })
}

module.exports=forecast