'use client'
import MapComponent from "@/components/MapComponent";
import React, { act } from "react";
import { useAuth } from '@/store/useAuth';
import { fetchTokens } from '@/api/calls/tokens';
import { useFeatures } from "@/store/useFeatures";
import { fetchFeatures } from "@/api/calls/features";

export default function Home() {
  const accessToken = useAuth((state) => state.accessToken)
  const refreshToken = useAuth((state) => state.accessToken)
  const setAccessToken = useAuth((state) => state.setAccessToken)
  const setRefreshToken = useAuth((state) => state.setRefreshToken)
  const features = useFeatures((state) => state.features) 
  const setFeatures = useFeatures((state) => state.setFeatures)
  React.useEffect(() => { 
    if(!accessToken || !refreshToken){
      let data = fetchTokens();
      data.then((data) => {
        setAccessToken(data.data?.access)
        setRefreshToken(data.data?.refresh)
      })
    }
    if(!features  && !!accessToken){
      let data = fetchFeatures([], 1, {headers:{"Authorization":"Bearer "+accessToken}})
      data.then((data) => {
        setFeatures(data)
      })
    }
  }, [accessToken, features])

  return (
  <>
    <button  style={{position:'absolute', zIndex: 1, right: "5px", top:"5px"}}>Go to List View </button>
    <MapComponent/>
  </>
  );
}
