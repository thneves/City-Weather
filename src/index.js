import './styles.css';
import form from './form'
import 'bootstrap/dist/css/bootstrap.min.css';
import Convert from './converter'

const content = document.getElementById('content');
const weatherInfoDiv = document.createElement('div');
const degButton = document.createElement('div');


const h1 = document.createElement('h1');
h1.innerHTML = 'Current Weather';
h1.classList.add('color', 'text-center')

degButton.classList.add('toggle-container', 'mx-auto', 'mt-2')
degButton.innerHTML = `
<input type="checkbox" id="deg" />
<div class="slider round"></div>
`

content.appendChild(h1);
content.appendChild(form);
content.appendChild(degButton);
content.classList.add('w-50', 'd-flex', 'flex-column', 'justify-content-center')

let current_date = (new Date()).toString().split(' ').splice(1, 3).join(' ');
let date = new Date();
let weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

let temp = 0;
let deg = 'celsius'
let sign = 'C'


export default async function weatherInfo(city) {
  try {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=749526431275a6828d7b2107b0a88638&units=metric`, {
      mode: 'cors'
    })
    if (response.status == "404") {
      alert('City Not Found')
      throw "City not found";
    }
    let weatherData = await response.json();
    console.log(weatherData)
  
    temp = weatherData.main.temp;
    if (deg === 'fare') {
      temp = Math.round(Convert.toFare(temp))
      sign = 'F'
    }

    weatherInfoDiv.classList.add('weatherInfoDiv')
    weatherInfoDiv.innerHTML = `
      <h2 id="city">${weatherData.name}, ${weatherData.sys.country}</h2>
      <h3 id="temperature">${Math.round(temp) } ${sign}°</h3>
      <h3 id="description">${weatherData.weather[0].description.replace(/\b[a-z]/g, match => match.toUpperCase())}
      <img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png">
      </h3>
      <h5 id="date">${current_date} - ${weekday[date.getDay()]}, ${date.toLocaleTimeString()}</h5>
      <h5 id="wind">Wind Speed: ${Math.round(weatherData.wind.speed*3.60)} KM/H</h5>
      <h5 id="humidity">Humidity: ${weatherData.main.humidity}%</h5> 
    `
    document.body.appendChild(weatherInfoDiv);
    temp = weatherData.main.temp;
  } catch (error) {
    console.log(error)
  }
}

let degrees = document.getElementById('deg');
degrees.addEventListener('click', () => {
  if (deg === 'celsius') {
    document.getElementById('temperature').innerHTML = `${Math.round(Convert.toFare(temp))} F º`;
    deg = 'fare';
  } else {
    document.getElementById('temperature').innerHTML = `${Math.round(temp)} C º`;
    deg = 'celsius';
  }
})

