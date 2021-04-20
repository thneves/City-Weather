import { form, submitBtn } from './form';
import { weatherInfoDiv } from './dom';
import fetchApi from './api';

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const cityName = document.getElementById('city-name').value;
  weatherInfoDiv.innerHTML = '';
  fetchApi(cityName);
  form.reset();
});
