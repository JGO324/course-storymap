/***********************************************************************************/
/*********************************** Azores MAP ************************************/
/***********************************************************************************/
var options = {
    center: [38.1925496, -27.4106139],
    zoom: 8,
    
}

var Stamen_Terrain = L.tileLayer('', {
	
});

var map = L.map('azoresMap', options);
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
var tiles = L.tileLayer(basemap_url, basemap_attributes).addTo(map);


var myLocationLayer=L.geoJSON(azores,{
pointToLayer: function(myLocationLayer,latlng){
return L.marker(latlng);
},
onEachFeature: function(feature,layer){
    
    layer.on("mouseover",function(){
        console.log(feature);
        let loc=feature.properties.location;
        layer.bindPopup(loc).openPopup();
     });
     layer.on("mouseout",function(){
        let loc=feature.properties.location;
        layer.bindPopup(loc).closePopup();
     });
    layer.on("click",function(e){

       let picture=feature.properties.pic;
        $('#photo-container').css("display","block");
        $('#foto-frame').html(`<img class="pic-frame" src="${picture}" alt=""></img>`);
        console.log(picture);
    });

}

}).addTo(map);


// var p=L.marker([37.8554, -25.7863]).bindTooltip("Lagoa das Sete Cidases").addTo(map);
// L.marker([37.8491, -25.7743]).bindTooltip("Lagoa do Santiago").addTo(map);
// L.marker([37.7635, -25.4752]).bindTooltip("Lagoa do Fogo").addTo(map);
// L.marker([38.4691, -28.4024]).bindTooltip("Ilha do Pico").addTo(map);
// L.marker([38.5846, -28.7156]).bindTooltip("Ilha do Faial").addTo(map);
// // temporary map click to get coordinates
// p.on("click",function(e){
// // console.log("clicked");
// map.flyToBounds(e.getBounds());
// });
map.on("click", function (e) {
    // console.log(e.latlng);
    // var coor = [e.latlng.lat, e.latlng.lng];
    // map.panTo(coor); //When user click on the marker, the marker move to the center
    // console.log(map);
    // map.setView(coor, 18);
});

$('#closebtn').click(function()
{
    $('#photo-container').css("display","none");
    
}
);

// 