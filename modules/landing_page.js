import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  
    let cities = await fetchCities();
  
  
  
  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    const data = await fetch(config.backendEndpoint +'/cities')
    return data.json()
  }
  catch {
    return null
  }
  

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const container = document.getElementById('data')
  const city1 = document.createElement('div')
  city1.className = 'tile col-lg-3 col-md-4 col-sm-12 '
  city1.innerHTML =`
    
      <a id=${id} href ="pages/adventures/?city=${id}">
      <img src=${image}>
      </a>
      <div class ='tile-text'>
        <p>${city}</p>
        <p>${description}</p>
      </div>
    
  `
  container.append(city1)
}

export { init, fetchCities, addCityToDOM };
