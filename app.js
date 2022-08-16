const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    const query = req.body.cityName;
    const apiKey = "2f29dd34a3f621f65fb8a867a937087c";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ apiKey + "&units=" + unit;
        https.get(url, function(response){
            console.log(response.statusCode);
        
            response.on("data", function(data){
            
                const weatherData = JSON.parse(data);
                console.log(weatherData);
                const temp = weatherData.main.temp;
                const description = weatherData.weather[0].
                description;
                const icon = weatherData.weather[0].icon;
                const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
                
                // console.log(temp);
                // console.log(description);
    
    
    
                res.write("<p>The weather is currently " + description + "</p>")
                res.write("<h1>The temperature in"+ query +" is "+ temp + "degree celcius </h1>");
                res.write("<img src=" + imageURL + ">");
                res.send();
        
            });
        
        
        
        });
    
        // res.send("Server is up and running");
    
})


// app.get("/", function(req, res){

// // });






app.listen(3000 , function (){
    console.log("server is running on port 3000");
});

