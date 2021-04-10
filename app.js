const express= require("express");
const app= express();
const https= require("https");
const bodyParser= require("body-parser");


app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html");
})
app.post("/",function(req,res){
  const city=req.body.cityName
  const cityid="803e91ca3e0d0adb5f7b24511e872925"
  const unit= "metric"
  const url="https://api.openweathermap.org/data/2.5/weather?q=" +city+ "&appid=" + cityid + "&unit="+unit;
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData =JSON.parse(data)
      const weatherDescription = weatherData.weather[0].description
      const temp = weatherData.main.temp
      const icon= weatherData.weather[0].icon
      const imageUrl= "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1> The temprature in "+city+ " is"+ temp + " degree celcius </h1>")
      res.write("<h2> The current weather is "+ weatherDescription + "</h2>")
      res.write("<img src = " + imageUrl + ">")
      res.send()
    })
  })
})




app.listen(3000,function(){
  console.log("server is working on 3000...");

})
