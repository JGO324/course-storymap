/***********************************************************************************/
/********************************** MADEIRA MAP ************************************/
/***********************************************************************************/

var options = {
  center: [32.74505282312651, -17.00271606445313], //Location of Madeira
  zoom: 11
}

// CREATE LEAFLET MAP WITH ABOVE OPTIONS.
var madeira_map = L.map('madeiraMap', options); //for desktop layout

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
var tiles = L.tileLayer(basemap_url, basemap_attributes).addTo(madeira_map); //for desktop layout

// ************************************************** //


var myLocationLayer = L.geoJSON(madeira,{
  pointToLayer: function (madeiraFeature, madeiraLatlng) {
console.log(madeiraFeature);
    //change icon by category
    var props=madeiraFeature.properties;
    switch(props.capital)
    {
        case true:
            var cityIcon=L.icon({
                iconUrl:'./img/city.png',
                iconSize:[40,40]
            });
        return L.marker(madeiraLatlng,{icon:cityIcon});
        case false:
            var villageIcon=L.icon({
                iconUrl:'./img/village.png',
                iconSize:[40,40]
            });
        return L.marker(madeiraLatlng,{icon:villageIcon});
    }

  },
  onEachFeature: function (madeiraFeature, madeiraLayer) {
    console.log(madeiraFeature);
    madeiraLayer.on("click", function (e) {
      console.log(e);
      madeira_map.panTo(e.latlng); //When user click on the marker, the marker move to the center
      madeira_map.flyTo(e.latlng, 11);
      var props=madeiraFeature.properties;

     var popup = ` <div class="highlight">
                    <img class="img_popup" src="${props.image}">
                    <div class="middle"><a id="infoL" href="${props.web}">
                      <div class="text">Click</div>
                   </a></div>`
      popup += `</br><b><span>${props.location}</span></b></br>
                  <b>Population</b>: ${props.pop.toLocaleString()}`;
      if (props.capital == true) {
        popup += `</br><b>Capital of:</b> ${props.state}`;
      }
      madeiraLayer.bindTooltip(props.location).bindPopup(popup).openPopup();
    });




  }

}).addTo(madeira_map);

