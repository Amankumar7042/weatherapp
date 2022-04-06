const request =require('postman-request')

const geoCode = (address , weatherfun)=>{
        const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?limit=1&access_token=pk.eyJ1IjoiYW1hbmt1bWFyNzA0MiIsImEiOiJjbDFoZjFwazYwMnUxM2tycDA1ZmI2dXVlIn0.wPGgyufAODlAymAxNXUsXQ";
        request({ url, json:true },(error, {body})=> {

            if(error){
                weatherfun('something went wrong',undefined)

            }else if(body.features.length === 0){
                weatherfun('Unable to find cordinates',undefined)
                
    
            }else{
                weatherfun(undefined,{
                    place_name:body.features[0].place_name,
                    latitude:body.features[0].center[1],
                    longitude:body.features[0].center[0]
                })
    
            }
        });
}
module.exports = geoCode;