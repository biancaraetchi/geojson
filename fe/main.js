import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import WKT from 'ol/format/WKT.js';
import {Vector as VectorSource} from 'ol/source.js';
import {Vector as VectorLayer} from 'ol/layer.js';

let accessToken = null
let refreshToken = null
let baseUrl = import.meta.env.VITE_BE_BASE_URL

let config = {
  headers: {
  },
  params: {
    "x_high_bound":10,
    "x_low_bound":2,
    "y_high_bound":55,
    "y_low_bound":35
  }
}

let result = null

const raster = new TileLayer({
  source: new OSM(),
});


const getTokens = async () => {
  return axios
  .post(baseUrl+"api/token/",{
    username:import.meta.env.VITE_USERNAME,
    password:import.meta.env.VITE_PASSWORD
  })
  .then((response) => {
    accessToken = response.data.access
    refreshToken = response.data.refresh
    config.headers["Authorization"] = "Bearer " + accessToken
    getMunicipalitiesList(1, []).then((features) => {
      const vector = new VectorLayer({
        source: new VectorSource({
          features: features,
        }),
      });
      
      const map = new Map({
        layers: [raster, vector],
        target: 'map',
        view: new View({
          center: [160, 6],
          zoom: 6,
        }),
      });

    })
  })
  .catch((error) => console.error(error));
};

const getMunicipalitiesList = async (page, features) => {
  return axios
  .get(`http://127.0.0.1:8000/municipalities/?page=${page}`, config)
  .then((response) => {
    result = response.data
    const format = new WKT();
    result.results.forEach((wkt) => {
      features.push(format.readFeature(wkt.geom_text, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857',
      }));
    })
    if(result.next){
        return getMunicipalitiesList(page+1, features)
    } else{
      return features
    }
  })
  .catch((error) => console.error(error));
};

getTokens()
