import Notiflix from 'notiflix';
const BASE_URL = 'https://restcountries.com/v3.1';
const END_POINT_RESTCOUNTRIES = '/name';

function fetchCountries(name) {
  return fetch(
    `${BASE_URL}${END_POINT_RESTCOUNTRIES}/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

export { fetchCountries, BASE_URL, END_POINT_RESTCOUNTRIES };
