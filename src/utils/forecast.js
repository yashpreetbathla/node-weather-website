 const request=require('request')
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast=(lat,long,callback)=>{
 
const url='https://api.darksky.net/forecast/8013fde5075639c41a29dbf0d4544205/'+lat+','+long
request({url,json:true},(error,{body})=>{
    if(error){
                callback('Can\'t connect to web services!',undefined)
                    }else if(body.features===0){
                
                callback('Cant detect the location',undefined)
                    }
                    else{
                  callback(undefined,body.daily.data[0].summary+' It is currently '+body.currently.temperature+' degrees out. There is a '+body.currently.precipProbability+'% chance of rain.')
                    }

})

}
module.exports=forecast

