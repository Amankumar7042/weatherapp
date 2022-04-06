const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();
const port = process.env.PORT || 3000



// define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// setup handle bards engine and views locations
app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath)

// https://weather-app-aman-7042.herokuapp.com/
// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{title:"Weather",name:"Your weather information"})
})

app.get('/help',(req,res)=>{
    res.render('help', {title:"help for weather",name:"Get help"})
});

app.get('/about',(req,res)=>{
    res.render('about',{title:"weather about" , name:"About Weather "})
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"please provide a search to get results"
        })
    }
        res.send({
            products:[]
        })
    
  
})

app.get('/weather',(req,res)=>{
    const address =req.query.address;
    if(!address){
        return res.send({
            error:"please provide an address"
        })
        
    }
    geoCode(address,(error,{latitude,longitude,place_name}= {})=>{

        if(error){
            return res.send({error })

        }
                place_name:place_name,
        forecast(latitude,longitude, (error, forcastdata) => {
            if(error){
                return res.send({error})
                
            }
            return res.send({
                place_name,
                address,
                forcastdata
            })
        })
    });
    
    // res.send({
    //     address:req.query.address,
    //     forcast:"its snowing",
    //     location:"india",
    // })
})

app.get('/help/*' ,(req,res)=>{
    res.render('404',{title:"404",Errormsg:"help article not found" , name:"404 help "})

})

app.get('*',(req,res)=>{
    res.render('404',{title:"404",Errormsg:"page not found" , name:"404 "})
})




app.listen(port,()=>{
    console.log("server is up on port "+ port)
})