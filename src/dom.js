import 'bootstrap/dist/css/bootstrap.min.css';
import Convert from './converter';
import './styles.css';
import { form } from './form';

const content = document.getElementById('content');
export const weatherInfoDiv = document.createElement('div');
const degButton = document.createElement('div');

const loader = document.createElement('div');
loader.setAttribute('id', 'loading');
content.appendChild(loader);

const h1 = document.createElement('h1');
h1.innerHTML = 'Current Weather';
h1.classList.add('color', 'text-center');

degButton.classList.add('toggle-container', 'mx-auto', 'mt-2');
degButton.innerHTML = `
<input type="checkbox" id="deg" />
<div class="slider round"></div>
`;

content.appendChild(h1);
content.appendChild(form);
content.appendChild(degButton);
content.classList.add('w-50', 'd-flex', 'flex-column', 'justify-content-center');

const currentDate = (new Date()).toString().split(' ').splice(1, 3)
  .join(' ');
const date = new Date();
const weekday = new Array(7);
weekday[0] = 'Sunday';
weekday[1] = 'Monday';
weekday[2] = 'Tuesday';
weekday[3] = 'Wednesday';
weekday[4] = 'Thursday';
weekday[5] = 'Friday';
weekday[6] = 'Saturday';

let temp = 0;
let deg = 'celsius';
let sign = 'C';

export function displayLoader() {
  loader.classList.add('display');
  setTimeout(() => {
    loader.classList.remove('display');
  }, 5000);
}

export function hideLoader() {
  loader.classList.remove('display');
}

export function showWeather(data) {
  temp = data.main.temp;
  if (deg === 'fare') {
    temp = Math.round(Convert.toFare(temp));
    sign = 'F';
  }

  weatherInfoDiv.classList.add('weatherInfoDiv');
  weatherInfoDiv.innerHTML = `
      <h2 id="city">${data.name}, ${data.sys.country}</h2>
      <h3 id="temperature">${Math.round(temp)} ${sign}°</h3>
      <h3 id="description">${data.weather[0].description.replace(/\b[a-z]/g, (match) => match.toUpperCase())}
      <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
      </h3>
      <h5 id="date">${currentDate} - ${weekday[date.getDay()]}, ${date.toLocaleTimeString()}</h5>
      <h5 id="wind">Wind Speed: ${Math.round(data.wind.speed * 3.60)} KM/H</h5>
      <h5 id="humidity">Humidity: ${data.main.humidity}%</h5> 
    `;
  document.body.appendChild(weatherInfoDiv);
  temp = data.main.temp;
}

export function showError() {
  weatherInfoDiv.classList.add('weatherInfoDiv');
  weatherInfoDiv.innerHTML = `
  <h1>City Not Found :(</h1>
  `;
  document.body.appendChild(weatherInfoDiv);
}

const degrees = document.getElementById('deg');

degrees.addEventListener('click', () => {
  if (deg === 'celsius') {
    deg = 'fare';
    if (document.getElementById('temperature') === null) {
      return;
    }
    document.getElementById('temperature').innerHTML = `${Math.round(Convert.toFare(temp))} F º`;
  } else {
    deg = 'celsius';
    if (document.getElementById('temperature') === null) {
      return;
    }
    document.getElementById('temperature').innerHTML = `${Math.round(temp)} C º`;
  }
});
