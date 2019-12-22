/***********************************************************************************/
/*********************************** Azores MAP ************************************/
/***********************************************************************************/
var options = {
    center: [38.514325529001326, -27.15395251781775],
    // zoom: 6,
   	

}

var azores_map = L.map('azoresMap', options);
var corner1=[37.396482510021585,-25.123668640229948];
var corner2=[39.266417324437775,-28.965345039930856];
azores_map.fitBounds([corner1,corner2]);
// var basemap_url='https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png';
var basemap_url =
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
// var basemap_url = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/light_all/{z}/{x}/{y}.png'
var basemap_attributes = {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 19,
    ext: 'png'
}
var tiles = L.tileLayer(basemap_url, basemap_attributes).addTo(azores_map);

azores_map.on("click", function (e) {
    console.log(e.latlng);
});

var myLocationLayer = L.geoJSON(azores, {
    pointToLayer: function (azoresFeature, azoresLatlng) {
        
        //change icon by category
        switch(azoresFeature.properties.cat)
        {
            case "lake":
                var lakeIcon=L.icon({
                    iconUrl:'./img/lake.png',
                    iconSize:[40,40]
                });
            return L.marker(azoresLatlng,{icon:lakeIcon});
            case "montain":
                var montainIcon=L.icon({
                    iconUrl:'./img/montain.png',
                    iconSize:[40,40]
                });
            return L.marker(azoresLatlng,{icon:montainIcon});
        }
        
    },
    onEachFeature: function (azoresFeature, azoresLayer) {
        azoresLayer.on("click", function (e) {
            console.log(e);
            azores_map.panTo(e.latlng); //When user click on the marker, the marker move to the center
            azores_map.flyTo(e.latlng, 11);
            var loc = azoresFeature.properties.location;
            var picture = azoresFeature.properties.pic;
            var capt=azoresFeature.properties.caption;
            var website=azoresFeature.properties.web;
            azoresLayer.bindPopup(loc).openPopup();
            $('.photo-container').css("display", "block");
            $('.foto-frame').html(`<img class="pic-frame" src="${picture}" alt=""></img>`);
            $('.foto-frame').append(`<p class="caption-text">${capt}</br><a href="${website}">website</a></p>`);

        });

        


    }

}).addTo(azores_map);

