const express  = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();
//port should be defined after defining app
const port = process.env.PORT || 3000 // if PORT is not defined then use 3000
//  console.log(__dirname);
//  console.log(__filename);
// define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views'); //definig custom path -templates
const partialsPath = path.join(__dirname,'../templates/partials');

// app.get('',(req,res)=>{ //for index.html
//     res.send('<h1>Helloo Express</h1>');
// });
// app.get('/help',(req,res)=>{
//     res.send([{name:'Priya'},{name:'Chotu'}]);
// });
// app.get('/about',(req,res)=>{
//     res.send("<h1>About the app<h1>");
// });

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Setup handlerbars engine and views location
app.set('views',viewsPath);// views is the default path. Redifing views with custom path here
app.set('view engine', 'hbs'); // handlerbars engine
hbs.registerPartials(partialsPath); // regestering partial path

app.get('',(req, res)=>{
    res.render('index',{
        title:'Weather',
        name:'Pingo'
    }) //send value object to .hbs to make view dynamic
});
app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About me',
        name:'Pingo'
    }) //send value object to .hbs to make view dynamic
});
app.get('/help',(req, res)=>{
    res.render('help',{
        helptxt:'Help text' ,
        name:'Pingo',
    title:'Help'   }) //send value object to .hbs to make view dynamic
});
app.get('/weather',(req,res)=>{
    if(!req.query.address){ //query string
        return res.send({
            error:'You must provide an address'
        });
    }

    geocode(req.query.address, (error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error});
        }

         forecast(latitude,longitude,(error, forecastData)=>{
             if(error){
                return res.send({error});
             }
             res.send({
                forecastData, location,
                address: req.query.address
             });
         });
    });

    // res.send({
    //     forecast:'Good day',
    //     address:req.query.address
    // });
});

// app.get('/help/*',(req,res)=>{
//     console.log("My 404 page :)");
// });
// app.get('*',(req,res)=>{
//     console.log("My 404 page :)");
// });

// Dynamic 404 pages
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Pingo',
        errorMsg:'Help article not found'
    });
});
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Pingo',
        errorMsg:'Page not found'
    });
});


app.listen(port,()=>{
    console.log('Server is up in the port 3000');
});