import './css/styles.css';
import {
  fetchCountries,
  BASE_URL,
  END_POINT_RESTCOUNTRIES,
} from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

// console.log(countryList);
searchBox.addEventListener(
  'input',
  debounce(onSearchCountriesFiltered, DEBOUNCE_DELAY)
);

function onSearchCountriesFiltered(evt) {
  const countryName = evt.target.value.trim();

  fetchCountries(countryName)
    .then(countries => {
      const arrLength = countries.length;
      console.log(arrLength);

      if (arrLength > 10) {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        Notiflix.Notify.warning(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      } else if (arrLength >= 2 && arrLength <= 10) {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        return createMarkupCountries(countries);
      } else if (arrLength === 1) {
        countryList.innerHTML = '';
        return createMarkupCountry(countries);
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
    });
}

function createMarkupCountries(countries) {
  const markup = countries
    .map(({ name: { official }, flags: { svg } }) => {
      return `<li class ="country-list__item"><img class="country-list__image img"src="${svg}" alt="${official}"><p class=""country-list__text>${official}</p></li>`;
    })

    .join('');
  countryList.innerHTML = markup;
}

function createMarkupCountry(countries) {
  const markupCountry = countries
    .map(
      ({
        name: { official },
        flags: { svg },
        capital,
        population,
        languages,
      }) => {
        return ` 
        <li class="country-info__item list">
          <img class="country-info__image img" src="${svg}" alt="${official}" />
          <p class="country-info__text">${official}</p>
        </li>
      
        <ul class="description-list list">
          <li class="description-list__item">
            <span class="description-list-span">Capital: </span>${capital}
          </li>
          <li class="description-list__item">
            <span class="description-list-span">Population: </span> ${population}
          </li>
          <li class="description-list__item">
            <span class="description-list-span">Languages: </span>${Object.values(
              languages
            ).join(',')}
          </li>
        </ul>`;
      }
    )
    .join('');
  countryInfo.innerHTML = markupCountry;
}
