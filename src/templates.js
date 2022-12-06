export  function countriesList({ name, flags }) {
  return `
    <li class="country-item"><img class="country-img" src="${flags.svg}" alt="flag of ${name.official}" width="60"/>
        <p class="counry-title">${name.official}</p>
      </li>
    `;
};

export  function countryCard({ name, capital, population, flags, languages }) {
  return `
  <div class="card">
  <div class="card-wrap">
  <img class="card-img" src="${flags.svg}" alt="flag of ${name.official}" width="140" />
  <p class="card-title">${name.official}</p>
</div>
<p class="card-text"><span class="card-span">Capital:</span>${capital}</p>
<p class="card-text"><span class="card-span">Population:</span>${population}</p>
<p class="card-text"><span class="card-span">Languages:</span>${Object.values(
        languages,
      )}</p>
</div>
  `;
}