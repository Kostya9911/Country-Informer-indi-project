import { fetchCountries } from './fetchCountries';
import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
console.log('777');
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
let name = null;
const input = document.querySelector('input#search-box');
const listCoutries = document.querySelector('.country-list');
const singleCountry = document.querySelector('.country-info');

input.addEventListener('input', debounce(inputText, DEBOUNCE_DELAY));
console.log(777);
function inputText() {
  listCoutries.innerHTML = ' ';
  singleCountry.innerHTML = ' ';

  name = input.value.trim();
  if (name.length === 0) {
    return;
  }
  fetchCountries(name)
    .then(data => {
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }

      if (data.length === 1) {
        createMarkupDiv(data);
        return;
      }
      createMarkupList(data);
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
    });
}

function createMarkupList(data) {
  const capitalsMarkup = data
    .map(
      ({ name, flags }) =>
        `<li><img src="${flags.svg}" alt="Flag of ${name.common}" width = "25px" height = "18px" /><span>${name.common}</span></li>`
    )
    .join('');
  listCoutries.insertAdjacentHTML('beforeend', capitalsMarkup);
}
function createMarkupDiv(data) {
  const capitalMarkup = data
    .map(
      ({ name, flags, population, languages, capital }) => `<style>
        .flag {
          background-image: url(${flags.svg});
          
        }
      </style> <img src="${flags.svg}" alt="Flag of ${
        name.common
      }" width = "50px" height = "35px" /><h2>${name.common}</h2><br><br />
      <span><b>Capital: </b>${capital}</span><br />
      <br />
      <span><b>Population: </b>${population}</span><br />
      <br />
      <span><b>Languages: </b>${Object.values(languages).join(
        ', '
      )}</span><br />`
    )
    .join('');
  singleCountry.insertAdjacentHTML('beforeend', capitalMarkup);
}
