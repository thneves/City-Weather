import {
  showWeather, showError, displayLoader, hideLoader,
} from './dom';

export default async function fetchApi(city) {
  try {
    displayLoader();
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=749526431275a6828d7b2107b0a88638&units=metric`, {
      mode: 'cors',
    });

    if (response.status === '404') {
      throw new Error('City Not Found :(');
    }

    const weatherData = await response.json();
    hideLoader();
    showWeather(weatherData);
  } catch (e) {
    showError(e);
  }
}
