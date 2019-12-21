/***********************************************************************************/
/********************************** MADEIRA MAP ************************************/
/***********************************************************************************/

var options = {
  center: [32.74505282312651, -17.00271606445313], //Location of Madeira
  zoom: 11
}

// CREATE LEAFLET MAP WITH ABOVE OPTIONS.
var madeira_map = L.map('madeiraMap', options);//for desktop layout

// GET BASEMAP URL FROM LEAFLET PROVIDERS
var basemap_url = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'

// GET BASEMAP ATTRIBUTES FROM LEAFLET PROVIDERS
var basemap_attributes = {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  minZoom: 1,
  maxZoom: 16,
  ext: 'png'
}
// GET COORDINATE LOCATION ON CLICK IN THE CONSOLE.
// madeira_map.on("click", function (e) {
//   console.log(e.latlng);
// })

// ADD TILESET AS A LAYER IN OUR MAP.
var tiles = L.tileLayer(basemap_url, basemap_attributes).addTo(madeira_map);//for desktop layout

// ************************************************** //

// STORING DATA VALUES IN ARRAYS
//********* Rewite the code of lesson 2 with javascript***********//
var cities = ["Santa Cruz", "Câmara de Lobos", "Funchal"], //declare and assign a array of city names.
  cityCoords = [
    [32.715934, -16.9130414],
    [32.6601177, -17.0062457],
    [32.6600368, -16.9596902]
  ], //2 dimensional array that holds the coordinates for each city.
  cityPops = [43005, 35666, 111892], //define an array cityPops and add population data for each city.
  cityCapital = [false, false, true], //define an array of cityCapital and add true or false for each city.
  cityStates = ["Madeira", "Madeira", "Madeira"], //define the states for each city
  cityLinks = [
    "http://mbest.wowsystems.pt/guide/facts-about/madeira-island-towns-and-municipalities/santa-cruz",
    "http://www.madeiratop10.com/en/pages/camara-de-lobos-madeira",
    "http://www.madeiratop10.com/en/pages/madeira-funchal"
  ], //define an array of city info links for each city
  cityImages = [
    "https://static.traveltek.net/uploaded/2015/4/1429271396.jpg",
    "http://madeiratop10.com/img/uploads/767x578_4a083f78dc36bb4a06b8e574ed762a9e.jpg",
    "http://3.bp.blogspot.com/-uSF_7p4_KmQ/UfqBql3ShqI/AAAAAAAACb0/0qhuePqWBSU/s400/Funchal+1.jpg"
  ]; //define an array of cityImage links for each city.

/* LOOP THROUGH THE ARRAYS USING FOR LOOP*/
for (var i = 0; i < cities.length; i++) {


  var popup = ` <div class="highlight">
                    <img class="img_popup" src="${cityImages[i]}">
                    <div class="middle"><a id="infoL" href="${cityLinks[i]}">
                      <div class="text">Click</div>
                   </a></div>`
  popup += `</br><b><span>${cities[i]}</span></b></br>
                  <b>Population</b>: ${cityPops[i].toLocaleString()}`;
  if (cityCapital[i] == true) {
    popup += `</br><b>Capital of:</b> ${cityStates[i]}`;
  }


  //for desktop layout
  L.marker(cityCoords[i]).addTo(madeira_map) // add it to the map
    .bindTooltip(cities[i]) //tooltip. when user hover mouse on pinpoint, it popup the content
    // .bindPopup(imgPopupHighlight); // bind the Popup
    .bindPopup(popup);

  console.log(cities[i]);
  console.log(cityCoords[i]);
  console.log(cityCapital[i]);

}