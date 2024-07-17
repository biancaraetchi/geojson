'use client'
import ListItem from "@/components/ListItem"
import { useFeatures } from "@/store/useFeatures"
import { navigate } from "../actions"
import React from "react"
import { isTokenExpired } from "@/utils/jwtCheck"
import { useAuth } from "@/store/useAuth"
import { fetchRefresh, fetchTokens } from "@/api/calls/tokens"

export default function Page() {
    const features = useFeatures((state) => state.features)

    const accessToken = useAuth((state) => state.accessToken)
    const refreshToken = useAuth((state) => state.refreshToken)
    const setAccessToken = useAuth((state) => state.setAccessToken)
    const setRefreshToken = useAuth((state) => state.setRefreshToken)

    React.useEffect(() => { 
        if(isTokenExpired(accessToken)){
            if(isTokenExpired(refreshToken)){
                let data = fetchTokens();
                data.then((data) => {
                    setAccessToken(data.data?.access)
                    setRefreshToken(data.data?.refresh)
                })
            } else {
                let data = fetchRefresh(refreshToken)
                data.then((data) => {
                    setAccessToken(data.data?.access)
                })
            }
        }
    }, [])

    return (
        <>
        <button onClick={() => navigate("/")}>Go to Map View</button>
        <h1>List of NL municipalities</h1>
        <h5>Click to edit properties</h5>
      {features?.map((feature, index) =>{ 
        return <ListItem key={index} feature={feature}/>
      }
      )}
      </>
    );
  }