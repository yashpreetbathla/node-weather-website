const request = require('request')


const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?bbox=-77.083056,38.908611,-76.997778,38.959167&access_token=pk.eyJ1IjoieWFzaHByZWV0YmF0aGxhIiwiYSI6ImNqdGIyNnc0YjBnZXU0NHA4djNvN2NzbnUifQ.3p9BNQoHdSPgg4rXVu5OFw'

request({url,json:true},(error,{body})=>{
if(error){
    callback('Can\'t connect to web services!',undefined)
}else if(body.features===0){
    callback('Cant detect the location',undefined)
        }
        else{
            callback(undefined,{
              latitude:body.features[0].geometry.coordinates[1],
              longitude:body.features[0].geometry.coordinates[0],
              location:body.features[0].place_name
            })
        }

})
}


module.exports=geocode