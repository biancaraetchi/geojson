import { axiosInstance } from "../axios";

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