import weatherInfo from './index'

var form = document.createElement("form");

var input = document.createElement("input"); //input element, text
input.setAttribute('type',"text");
input.setAttribute('id',"city-name");

var submitBtn = document.createElement("button"); //input element, Submit button
submitBtn.setAttribute('type',"submit");
submitBtn.setAttribute('for',"city-name");
submitBtn.textContent = 'Search'

form.appendChild(input);
form.appendChild(submitBtn);

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let cityName = document.getElementById('city-name').value
  // console.log(cityName)
  weatherInfo(cityName)
}) 

export default form;