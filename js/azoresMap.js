/***********************************************************************************/
/*********************************** Azores MAP ************************************/
/***********************************************************************************/
var options = {
    center: [38.1925496, -27.4106139],
    zoom: 8,

}

var azores_map = L.map('azoresMap', options);
// var basemap_url='https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png';
var basemap_url =
    'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}'
// var basemap_url = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/light_all/{z}/{x}/{y}.png'
var basemap_attributes = {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 19,
    ext: 'png'
}
var tiles = L.tileLayer(basemap_url, basemap_attributes).addTo(azores_map);


var myLocationLayer = L.geoJSON(azores, {
    pointToLayer: function (azoresLayer, azoresLatlng) {
        return L.marker(azoresLatlng);
    },
    onEachFeature: function (azoresFeature, azoresLayer) {
        azoresLayer.on("click", function (e) {
            azores_map.panTo(e.latlng); //When user click on the marker, the marker move to the center
            azores_map.setView(e.latlng, 11);
        });
        azoresLayer.on("mouseover", function () {
            console.log(azoresFeature);
            let loc = azoresFeature.properties.location;
            let picture = azoresFeature.properties.pic;
            azoresLayer.bindPopup(loc).openPopup();

            $('#photo-container').css("display", "block");
            $('#foto-frame').html(`<img class="pic-frame" src="${picture}" alt=""></img>`);
        });
        azoresLayer.on("mouseout", function () {
            let loc = azoresFeature.properties.location;
            azoresLayer.bindPopup(loc).closePopup();
            $('#photo-container').css("display", "none");

        });


    }

}).addTo(azores_map);