
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  return search.split('=')[1]
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  
  
  try{
    const apiname = await fetch(config.backendEndpoint +'/adventures?city='+city)
    const res = await apiname.json()
    
    return res
  }
  catch{
    return null
  }
  
  
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  
  try{
    adventures.forEach((adventure)=>{
      const containerDiv = document.getElementById('data')
      const cityCard = document.createElement('div')
      cityCard.className = 'col-lg-3 col-md-6 col-sm-12'
      cityCard.innerHTML = `
      <div class='card activity-card'>
        <div class = 'category-banner'>${adventure.category}</div>
        <a id=${adventure.id} href='detail/?adventure=${adventure.id}'>
        <img style='padding:0px' src ='${adventure.image}'>
        </a>
        <div class='card-body'>
          <div style='display:flex;justify-content:space-between;'>
          <strong><p style='font-size:1rem'>${adventure.name}</p></strong>
      
          <p>₹${adventure.costPerHead}</p>
          </div>
        
          <div style='display:flex;justify-content:space-between;'>
            <strong><p style='font-size:1rem'>Duration</p></strong>
            <p>${adventure.duration}</p>
          </div>
        </div>
      </div>
      `
      containerDiv.append(cityCard)
    })
  
    const testbutton = document.createElement('button');
    testbutton.className='btn btn-default btn-dark'
    testbutton.style='max-width:97%;margin:0px 32px 0px 20px'
    testbutton.innerHTML = 'Add More Adventures'
    
    const contDiv = document.getElementById('data')
    contDiv.append(testbutton)
    testbutton.addEventListener('click', async function addMoreAdvent(){
      const test1=await fetch(`${config.backendEndpoint}/adventures/new`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'Accept':'application/json',
        },
        body:JSON.stringify({
          'city':'goa'
        })
      })
      const res1 = await test1.json()
      
  })
  

}
  catch{
    return null
  }
    
  
}



//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filtlist2=[]
  list.forEach((li)=>{
    if(li.duration<=high && li.duration>=low){
      filtlist2.push(li)
    }
  })
  return filtlist2
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
 

  
  let filteredList=[];
  list.filter(function (e) {
    if(categoryList.includes(e.category))
      filteredList.push(e);   
      });

      

  
  
  return filteredList;
  
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filtlist1 =[]
  
    
  

  
  if(filters["category"].length>0 && filters["duration"].length>0){
    filtlist1=filterByCategory(list,filters.category)
    let s = filters["duration"].split('-')
    filtlist1=filterByDuration(filtlist1,parseInt(s[0]),parseInt(s[1]))
  }
  else if (filters["category"].length>0){
    filtlist1=filterByCategory(list,filters.category)
   
  }
  else if(filters["duration"].length>0){
    let s = filters["duration"].split('-')
    filtlist1=filterByDuration(list,parseInt(s[0]),parseInt(s[1]))
    
  }
  else{
    filtlist1=list
  }
  
  // Place holder for functionality to work in the Stubs
  
  return filtlist1
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  
  localStorage.setItem('filters',JSON.stringify(filters))
  
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  
  return JSON.parse(localStorage.getItem('filters'))
  // Place holder for functionality to work in the Stubs
}
//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  document.getElementById('duration-select').value = filters['duration']

  filters.category.forEach((cate)=>{
    const pill = document.createElement('div')
    pill.className = 'category-filter'
    pill.id = cate
    pill.innerHTML = `${cate}<i  onclick ='removeCategory(event)' style='cursor:pointer;padding-left:7px;font-size:x-small' class="fa-solid fa-xmark"></i>`
    document.getElementById('category-list').append(pill)
    
  })
  
  
  
  
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
