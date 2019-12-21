
/***********************************************************************************/
/********************************* MY ROUTE MAP ************************************/
/***********************************************************************************/
  var options = {
    // center: [38.038685, -84.504164],
    // center: [40.00816, -105.27423],
    center: [12.1994847, -69.00883083333333],
    zoom: 10,
    zoomSnap: .2, // allow for smoother zooming
    zoomControl: false
  }

  var locate_options = {
    position: 'topleft',
    strings: {
      title: "Show me where I am, yo!"
    }
  }

  var map = L.map('routeMap', options);

  // add zoom control to top right window position
  L.control.zoom({
    position: 'topright'
  }).addTo(map);

  // add geolocation control to top right window position (Leaflet can handle multiple top-right elements)
  L.control.locate(locate_options).addTo(map);

  // Get basemap URL from Leaflet Providers
  var basemap_url = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'

  // Get basemap attributes from Leaflet Providers
  var basemap_attributes = {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd',
    maxZoom: 22
  };
  // requests some map tiles
  var tiles = L.tileLayer(basemap_url, basemap_attributes);

  map.addLayer(tiles);
  /*********************************************/
  /***************** Temporary *****************/
  /*********************************************/

  var message = '<h2>University of Kentucky!</h2>Department of Geography';

  // L.marker(map.getCenter())
  //   .bindPopup(message)
  //   .addTo(map)




  /************* extract only the LineString to style the path ******************/
  /******  Track is divided in 2 routes using the OsmAnd+ android app ***********/
  var layerGr = L.layerGroup();
  var myRoutePlan = L.geoJson(myRoute, {
    filter: function (feature) {
      let featureType = feature.geometry.type;
      if (featureType == 'LineString') {
        return feature;
      }
    },
    style: function (feature) {
      return {
        color: "#005DAA",
        weight: 4,
        opacity: .6
        // dashArray: "5, 5"
      }
    },
    onEachFeature: function (feature, layer) {
      layer.on("mouseover", function () {
          this.setStyle({
            color: "#d72b1e",
            weight: 4,
            opacity: .6
          }); //setting a new style on mouse over the layer

        }),
        layer.on("mouseout", function () {
          myRoutePlan.resetStyle(layer); //reset the layer on mouseout
        }),
        map.on("popupclose", function () {
          map.flyToBounds(myRoutePlan
            .getBounds()); //reset map view when user click on the popup close button.
        }),
        layer.on("click", function () {
          map.flyToBounds(layer.getBounds());
        });
    }
  }).addTo(map);



  /******** extract only the Points **************/
  /****** My stops added to the route ***********/
  var myStops = L.geoJson(myRoute, {
    filter: function (feature) {
      let featureType = feature.geometry.type;
      if (featureType == 'Point') {
        return feature;
      }
    },
    onEachFeature: function (feature, layer) {
      var popupMessage = `
      <p><b>Location:</b> ${feature.properties.name}</br>
      <b>Adress:</b> ${feature.properties.adress}</p>`;
      // console.log(feature);
      // console.log(layer._latlngs.length);
      layer.bindTooltip(feature.properties.name).bindPopup(popupMessage);
      // console.log(layer.getCenter);
      layer.on("click", function (e) {

        var coor = [e.latlng.lat, e.latlng.lng];
        console.log(coor);
        // map.setZoom(18);
        map.panTo(coor); //When user click on the marker, the marker move to the center
        map.setView(coor, 18);
      });

    }
  }).addTo(map);
  var bounds=myRoutePlan.getBounds();
  map.fitBounds(bounds,{padding:[50,50]});