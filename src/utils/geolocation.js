//if you don't understand, this code uses ES6 object destructuring. This also contains callback functions.(a fn passed as an argument)

const request=require('request')

const geocode = (address,callback)=>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaXRzLXNiIiwiYSI6ImNrYmh1bDk3YzA5NGoyeWxzZWU2OHZ3anoifQ.kTQTBChNwwXCqIaWPYbgTQ&limit=1'

    request({url: url, json: true},(error,{body}={})=>{ //instead of setting url:url, we use Shorthand ES6 property. 
        //we replace response with {body}, because it is the only property of Response object which we will ever use

        if(error){
            callback('Unable to Connect to weather Services!',undefined)
        }
        else if(body.features.length==0){
            callback('Unable to find location. Try another search.',undefined)
        }
        else{
            const data={
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                place: body.features[0].place_name
            }
            callback(undefined,data)
        }
    })
}


module.exports= geocode