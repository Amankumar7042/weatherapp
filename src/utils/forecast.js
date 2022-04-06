const request =require('postman-request')

const forecast = (lat, lon, callback)=>{

    const url = "http://api.weatherstack.com/current?access_key=8900468f8d4c3a51bb1417095062b177&query="+encodeURIComponent(lat) +","+ encodeURIComponent(lon) +"&units=m";

    request({ url, json:true },(error, {body})=> {
        if(error){
            callback("unable to connect to Weather API",undefined)

        }else if(body.error){
            callback("unale to find location sorry something went wrong!",undefined)
            
            
        }else{
            callback(undefined, 'Weather today is '+body.current.weather_descriptions[0] +' and the temperature is '+body.current.temperature  +' degree it feels like '+ body.current.feelslike+' degree')
        }
    });
}
module.exports = forecast;