import './css/styles.css';
import './css/my.css';
import { fetchCountries } from './fetchCountries';
import { countriesList, countryCard } from './templates';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const refs = {
  inputEl: document.getElementById('search-box'),
  countryListEl: document.querySelector('.country-list'),
  countryInfoEl: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;
let name = '';

refs.inputEl.addEventListener(
  'input',
  debounce(onInputElSearch, DEBOUNCE_DELAY)
);

function onInputElSearch(e) {
  // Метод trim() удаляет пробелы с обеих сторон строки
  name = e.target.value.trim();
  // Якщо поле пошуку чисте, то інформація про країну зникає.
  if (name === '') {
    clearPage();
  }

  fetchCountries(name)
    .then(renderInputDate)
    .catch(error => {
      Notify.warning('Oops, there is no country with that name');
      clearPage();
      return error;
    });
}

function renderInputDate(countries) {
  if (Number(countries.length) > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (Number(countries.length) > 1) {
    renderCountriesData(countries);
    refs.countryInfoEl.innerHTML = '';
  } else if (Number(countries.length) === 1) {
    renderCountyCard(countries);
    refs.countryListEl.innerHTML = '';
  }
}

function renderCountriesData(countries) {
  const markup = countries.map(country => countriesList(country)).join('');
  refs.countryListEl.innerHTML = markup;
  console.log(markup);
}

function renderCountyCard(countries) {
  const markup = countries.map(country => countryCard(country)).join('');
  refs.countryInfoEl.innerHTML = markup;
  console.log(markup);
}

function clearPage() {
  refs.countryListEl.innerHTML = '';
  refs.countryInfoEl.innerHTML = '';
  return;
}
