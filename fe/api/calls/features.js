import { axiosInstance } from "../axios";

let config = {
    headers: {
    },
    params: {
      "x_high_bound":180,
      "x_low_bound":0,
      "y_high_bound":180,
      "y_low_bound":0
    }
  }

export const fetchFeatures = async (features, page, options) => {
    let response = await axiosInstance.get(`municipalities/?page=${page}`, {...config, ...options})
    features.push(...response.data.results) 
    if (response.data.next){
        let promise = await fetchFeatures(features, page+1, options)
        return promise
    }
    else{
      return features
    }
  };

export const editFeatureProps = async (feature, name, options) => {
  return axiosInstance.put(`municipalities/${feature.ogc_fid}/`, {
    name,
    geom_text:feature.geom_text,
    ogc_fid:feature.ogc_fid
  }, {...options})
};