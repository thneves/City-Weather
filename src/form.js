export const form = document.createElement('form');
form.classList.add('w-25', 'mx-auto');

const input = document.createElement('input'); // input element, text
input.setAttribute('type', 'text');
input.setAttribute('id', 'city-name');
input.setAttribute('placeholder', 'City');
input.classList.add('form-control');
// input.required = true;/

export const submitBtn = document.createElement('button'); // input element, Submit button
submitBtn.setAttribute('type', 'submit');
submitBtn.setAttribute('for', 'city-name');
submitBtn.textContent = 'Search Location';
submitBtn.classList.add('form-control', 'button');

form.appendChild(input);
form.appendChild(submitBtn);
