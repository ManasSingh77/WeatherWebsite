import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req, res)=>{
    res.render("index.ejs");
});
app.post("/submit", async (req, res) => {
    try {
        const city = req.body.city;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=31c1c03475b6baabc32242923ecdf771`);
        console.log("response");
        const data = response.data;

        const cityName = data.name;
        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        const temperatureCelsius = (temperature - 273.15).toFixed(2);

        res.render("index.ejs", {
            City: cityName,
            temp: `Temperature: ${temperatureCelsius}°C`,
            weather: `Weather: ${weatherDescription}`,
            humidity: `Humidity: ${humidity}%`,
            wind: `Wind Speed: ${windSpeed} m/s`,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Enter correct city name");
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });