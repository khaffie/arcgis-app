var mapMain;

// @formatter:off
require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/rest/support/Query",
  "esri/widgets/Sketch",
  "esri/widgets/Search",
  "esri/layers/GraphicsLayer"
], function(Map, MapView, FeatureLayer, Query, Sketch, Search, GraphicsLayer) {

    // Create the map
    mapMain = new Map({
      basemap: "topo-vector"
    });

    var view = new MapView({
      container: "cpCenter",  // Reference to the scene div created in step 5
      map: mapMain,  // Reference to the map object created before the scene
      zoom: 6,  // Sets zoom level based on level of detail (LOD)
      center: [-1.5, 52.5]  // Sets center point of view using longitude,latitude
    });

    /*
     * Step: Add the Search widget
     */
    var searchWidget = new Search({
      view: view
    });

    // Add the search widget to the top right corner of the view
    view.ui.add(searchWidget, {
      position: "top-right"
    });

    var layer = new FeatureLayer({
      url:"https://services2.arcgis.com/mHXjwgl3OARRqqD4/arcgis/rest/services/Forestry_England_Quarries/FeatureServer/0",
      opacity: 0.7
    });

    mapMain.add (layer)


  });
