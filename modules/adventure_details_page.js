import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

  // Place holder for functionality to work in the Stubs
  

  return search.split('=')[1]
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let res = await fetch(config.backendEndpoint +'/adventures/detail?adventure='+adventureId)
    let ans = await res.json()
    return ans
  }
  catch{
    return null;
  }

  // Place holder for functionality to work in the Stubs
  

}
//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

let headerelement = document.getElementById('adventure-name')
headerelement.innerHTML = adventure.name
let subtitle = document.getElementById('adventure-subtitle')
subtitle.innerHTML = adventure.subtitle
let content = document.getElementById('adventure-content')
content.innerHTML = adventure.content
adventure.images.map(ele=>{
  let img = document.createElement('img')
  img.setAttribute('src',ele)
  img.className = 'activity-card-image'
  document.getElementById('photo-gallery').append(img)
})
}
function addBootstrapPhotoGallery(images){
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  /*

  */
  let imggallery = document.getElementById('photo-gallery')
  
  let temp =''
  images.map((ele,index)=>{
    if(index!==0){
      temp+=`
      <div class="carousel-item">
      <img class="d-block w-100 activity card" src="${ele}" alt="....">
      </div>
      `
    }
    else if(index ===0){
      temp+=`
      <div class="carousel-item active">
      <img class="d-block w-100 activity card" src="${ele}" alt="....">
      </div>
      `
    }
  })
  imggallery.innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
      ${temp}
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  `
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available ==true){
   
    document.getElementById('reservation-panel-sold-out').style.display ='none'
    document.getElementById('reservation-panel-available').style.display ='block'
    let costPerHead = document.getElementById('reservation-person-cost')
    costPerHead.innerHTML = adventure.costPerHead
    
  }
  else{
    document.getElementById('reservation-panel-available').style.display ='none'
    document.getElementById('reservation-panel-sold-out').style.display ='block'
    
  }
}
//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let reservationCost = document.getElementById('reservation-cost')
  
  reservationCost.innerHTML = adventure.costPerHead *persons
  
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let form = document.getElementById('myForm')
  
  
  form.addEventListener('submit', async (event)=>{
    event.preventDefault()
    try{
      let personName = document.getElementsByName('name')[0].value
      let datefilled = document.getElementsByName('date')[0].value
      let people =  document.getElementsByName('person')[0].value
      
      const test1=await fetch(`${config.backendEndpoint}/reservations/new`,{

        method:'POST',
        headers:{
          'Content-Type':'application/json;charset=UTF-8',
          'Accept':'application/json'
        },
        body:JSON.stringify({
          'name':personName,
          'date':datefilled,
          'person':people,
          'adventure':adventure.id
        })
        
      })
      
      
      const res1 = await test1.json()
      alert('Success')
      
    }
    catch{
      
      alert('Failed')
  
}})
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById('reserved-banner').style.display ='block'
  }
  else{
    document.getElementById('reserved-banner').style.display ='none'
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
}
