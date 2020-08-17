const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000// heroku

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Shreyansh Thakur'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Shreyansh Thakur'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Shreyansh Thakur'
    })
})

app.get('/weather', (req, res) => {
// queryString: to 
    if(!req.query.address){
        return res.send({
            error:"Enter a valid address"
        })
    }

  geoCode(req.query.address,(error,{latitude,longitude,location}={/* default params*/}/* Destructing*/)=>{

if(error){
    return res.send({
        error:error
    })
}
forecast(latitude,longitude,(error,forecastData)=>{
    if(error){
        return res.send({
            error:error
        })
    }
    res.send({
        forecast:forecastData,
        location,// shorthand
        address:req.query.address

        })
     })
  }) 
})

app.get("/help/*",(req,res)=>{

res.render("404",{
    title:"404",
    name:"Shreyansh",
   errorMsg:"Help article not found"
})

})


// 404 error (*: this is provided by express for url that has'nt been matched yet)
app.get("*",(req,res) => {/*this needs to be after all the get methods*/

    res.render("404",{
        title:"404",
        name:"Shreyansh",
       errorMsg:"Page not found"
    })
})

app.listen(port , () => {
    console.log('Server is up on port .' + port)
})







              /********************** */


// const path = require("path")
// const express = require("express")
// const hbs = require("hbs")



// const app = express();


// const publicDirectoryPath = path.join(__dirname,"../public")// going to public directory
// // app.set('views', path.join(__dirname, '../views'));
// // const viewsPath = path.join(__dirname,"../templates")
// const viewsPath = path.join(__dirname/*location of the file we are working in*/,"../templates/views")
// const partialsPath = path.join(__dirname,"../templates/partials")

// //hbs is an handle-bar just like ejs
// app.set("view engine","hbs")// setup handle bar engine
// app.set("views",viewsPath)//setup views location
// hbs.registerPartials(partialsPath)



// app.use(express.static(publicDirectoryPath))

// // app.get("/",(req,res)=>{
// //     res.send("<h1>Welcome</h1>")// html response
// // })


// app.get("",(req,res)=>{
//     res.render("index",{
//         title:"Weather App",
//         name:"Shreyansh"
//     })//index.hbs
// })

// app.get("/about",(req,res)=>{
//     res.render("about",{
//         title:"Hi I am Shreyansh",
//         name:"Shreyansh"
//     })
// })

// app.get("/help",(req,res)=>{
//     res.render("help",{
//         title:"Help Page",
//         help:"We are there to help you ",
//         name:"Shreyansh"
        
//     })
// })


// app.get("/weather",(req,res)=>{
//     res.send({
//         forecast:"It is raining ",
//         location:"India"

//     })
// })


// app.listen(3000,() =>{
//     console.log("The server is running")
// })




// //views: this dynamic files
// //public: this folder has static files