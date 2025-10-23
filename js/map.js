var mapMain;

// @formatter:off
require([
  "esri/Map",
  "esri/views/MapView",
  "esri/widgets/Search"],
  function (Map, MapView, Search
  ) {

    // Create the map
    mapMain = new Map({
      basemap: "topo"
    });

    var view = new MapView({
      container: "cpCenter",  // Reference to the scene div created in step 5
      map: mapMain,  // Reference to the map object created before the scene
      zoom: 13,  // Sets zoom level based on level of detail (LOD)
      center: [-117.19, 34.05]  // Sets center point of view using longitude,latitude
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


  });