import './styles.css';
import form from './form'
import bgImg from './synthwave.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';

const myImg = new Image();
myImg.src = bgImg;

let content = document.getElementById('content');
let h1 = document.createElement('h1');
h1.innerHTML = 'Weather App';
h1.classList.add('color')
content.appendChild(h1);
content.appendChild(form);
const weatherInfoDiv = document.createElement('div');

export default async function weatherInfo(city) {
try {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=749526431275a6828d7b2107b0a88638&units=metric`, {
        mode: 'cors'
      })
    if(response.status == "404") {
      alert('City Not Found')
      throw "City not found";
    }
    let weatherData = await response.json();
    console.log(weatherData)
    console.log(weatherData.sys.country)

    
    weatherInfoDiv.classList.add('weatherInfoDiv')
    weatherInfoDiv.innerHTML = `
      <h2 id="city">${weatherData.name}, ${weatherData.sys.country}</h2>
      <h3 id="temperature">${Math.round(weatherData.main.temp) }C°<h3>
      <h3 id="description">${weatherData.weather[0].description}</h3>
      <h5 id="date">Hoje</h5>
      <div>
        <span id="wind">Wind: ${Math.round(weatherData.wind.speed)} mts/s</span><span id="humidity">Humidity: ${weatherData.main.humidity}%</span> 
      </div>
    `
    content.appendChild(weatherInfoDiv);

    // console.log(weatherData.name)
    // console.log(weatherData)
    // console.log(weatherData.weather[0].description)
    // console.log(weatherData.wind.speed + 'mts/s vento')
    // console.log(weatherData.main.humidity + '% de humidade')
    // console.log(weatherData.main.temp + ' Cº')
    // console.log(weatherCityInfo)
  } catch (error) {
    console.log(error)
  } 
}

// weatherInfo();

// console.log(weatherCityInfo)

