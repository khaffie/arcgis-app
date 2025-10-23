var mapMain;

// @formatter:off
require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/rest/support/Query",
  "esri/widgets/Search",
  "esri/layers/GraphicsLayer"
], function(Map, MapView, FeatureLayer, Query, Search, GraphicsLayer) {

  // Create the map
  mapMain = new Map({
    basemap: "topo-vector"
  });

  var view = new MapView({
    container: "cpCenter",
    map: mapMain,
    zoom: 6,
    center: [-1.5, 52.5]
  });

  // Add the Search widget
  var searchWidget = new Search({
    view: view
  });

  view.ui.add(searchWidget, {
    position: "top-right"
  });

  // Add the quarry FeatureLayer
  var layer = new FeatureLayer({
    url: "https://services2.arcgis.com/mHXjwgl3OARRqqD4/arcgis/rest/services/Forestry_England_Quarries/FeatureServer/0",
    opacity: 0.7
  });

  mapMain.add(layer);

  // Query the layer for Shape__Area and quarry_name
  var query = layer.createQuery();
  query.outFields = ["quarry_name", "Shape__Area"];
  query.where = "Shape__Area IS NOT NULL";

  layer.queryFeatures(query).then(function(result) {
    var labels = [];
    var data = [];

    result.features.forEach(function(feature) {
      labels.push(feature.attributes.quarry_name);
      data.push(feature.attributes.Shape__Area);
    });

    // Create the polar chart
    new Chart(document.getElementById("polarChart"), {
      type: 'polarArea',
      data: {
        labels: labels,
        datasets: [{
          label: 'Quarry Area',
          data: data,
          backgroundColor: data.map(() => 'rgba(54, 162, 235, 0.5)')
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'right' },
          title: { display: true, text: 'Quarry Areas (Shape__Area)' }
        }
      }
    });
  });

});
