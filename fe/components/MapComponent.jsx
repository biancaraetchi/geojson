// MapComponent.js
import React, { useState, useEffect, useRef } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';
import { useFeatures } from '@/store/useFeatures';
import WKT from 'ol/format/WKT.js';
import {Vector as VectorSource} from 'ol/source.js';
import {Vector as VectorLayer} from 'ol/layer.js';
import { fromLonLat } from 'ol/proj';

function MapComponent() {
    const features = useFeatures((state) => state.features)
    const [maps, setMaps] = React.useState(null)
    useEffect(() =>  {
        if (features && features?.length !== 0) {
          const format = new WKT();
          const newMaps = []
          features.forEach((wkt) => 
            {                 
                newMaps.push(format.readFeature(wkt.geom_text, {
              dataProjection: 'EPSG:4326',
              featureProjection: 'EPSG:3857',
            }))
        }
          );
          setMaps(newMaps);
        }
      }, [features]);
    
      useEffect(() => {
        if (maps) {
          const raster = new TileLayer({
            source: new OSM(),
          });
          const vector = new VectorLayer({
            source: new VectorSource({
              features: maps,
            }),
          });
    
          const map = new Map({
            layers: [raster, vector],
            target: 'map',
            view: new View({
              center: fromLonLat([5.3, 52.2]),
              zoom: 7,
              projection: 'EPSG:3857'
            }),
          });
    
          return () => map.setTarget(null);
        }
      }, [maps]);

    return (
      <div style={{height:'100%',width:'100%'}} id="map" className="map-container" />
    );
}

export default MapComponent;