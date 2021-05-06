requirejs(['../examples/WorldWindShim',
        '../examples/LayerManager'],
    function (WorldWind,
              LayerManager) {
        "use strict";

        // Tell WorldWind to log only warnings and errors.
        WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

        // Create the WorldWindow.
        var wwd = new WorldWind.WorldWindow("canvasOne");

        // Create and add layers to the WorldWindow.
        var layers = [
            // Imagery layers.
            {layer: new WorldWind.BMNGLayer(), enabled: true},
            {layer: new WorldWind.BMNGLandsatLayer(), enabled: false},
            {layer: new WorldWind.BingAerialWithLabelsLayer(null), enabled: true},
            // Add atmosphere layer on top of all base layers.
            {layer: new WorldWind.AtmosphereLayer(), enabled: true},
            // WorldWindow UI layers.
            {layer: new WorldWind.CompassLayer(), enabled: true},
            {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
            {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}
        ];

        for (var l = 0; l < layers.length; l++) {
            layers[l].layer.enabled = layers[l].enabled;
            wwd.addLayer(layers[l].layer);
        }

        // Generate 10000 random points to display on the HeatMap with varying intensity over the area of the whole world.
        // var locations = [];
        // for (var i = 0; i < 10000; i++) {
        //     locations.push(
        //         new WorldWind.MeasuredLocation(
        //             -89 + (179 * Math.random()),
        //             -179 + (359 * Math.random()),
        //             Math.ceil(100 * Math.random())
        //         )
        //     );
        // }

        var location = [];
        for (var i = 0; i < 80000; i++) {
            location.push(
                new WorldWind.MeasuredLocation(
                    -89 + (179 * Math.random()),
                    -179 + (359 * Math.random()),
                    Math.ceil(100 * Math.random())
                )
            );
        }
        console.log(WorldWind.MeasuredLocation);
console.log(location);
        // Add new HeatMap Layer with the points as the data source.
        wwd.addLayer(new WorldWind.HeatMapLayer("HeatMap", location));

        // Create a layer manager for controlling layer visibility.
        var layerManager = new LayerManager(wwd);
    });