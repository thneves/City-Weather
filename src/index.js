import './styles.css';
import form from './form'

let content = document.getElementById('content');
let h1 = document.createElement('h1');
h1.innerHTML = 'Weather App';
h1.classList.add('color')
content.appendChild(h1);
content.appendChild(form);
const weatherCityInfo = {
  description: '',
  wind: '',
  humidity: '',
  temperature: ''
}


export default async function weatherInfo(city) {
try {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=749526431275a6828d7b2107b0a88638`, {
        mode: 'cors'
      })
    if(response.status == "404") {
      alert('City Not Found')
      throw "City not found";
    }
    let weatherData = await response.json();
    weatherCityInfo.description = weatherData.weather[0].description
    weatherCityInfo.wind = weatherData.wind.speed
    weatherCityInfo.humidity = weatherData.main.humidity
    weatherCityInfo.temperature = weatherData.main.temp
    console.log(weatherData)
    console.log(weatherData.weather[0].description)
    console.log(weatherData.wind.speed + 'mts/s vento')
    console.log(weatherData.main.humidity + '% de humidade')
    console.log(weatherData.main.temp + ' Cº')
  } catch (error) {
    console.log(error)
  } 
}

// weatherInfo();

console.log(weatherCityInfo)

