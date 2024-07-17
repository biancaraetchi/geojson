import { editFeatureProps, fetchFeatures } from "@/api/calls/features";
import { useAuth } from "@/store/useAuth";
import { isTokenExpired } from "@/utils/jwtCheck";
import { useState } from "react";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function ListItem({feature}){
    const [isEditing, setIsEditing] = useState(false)
    const [newName, setNewName] = useState(feature.name)
    const [name, setName] = useState(feature.name)
    const accessToken = useAuth((state) => state.accessToken)

    function editFeature(){
        if(!isTokenExpired(accessToken)){
            let data = editFeatureProps(feature, newName, {headers:{"Authorization":"Bearer "+accessToken}})
            data.then((data) => data.status === 200 ? setName(newName) : window.alert("An error occurred, please refresh page."))
        }
        else{
            window.alert("Please refresh page.")
        }
    }

    return (
        <>
        <p className="h2 text-primary" role="button" onClick={() => setIsEditing(!isEditing)} key={feature.ogc_fid}>{name}</p>
        <form onSubmit={(e) => e.preventDefault()} style={{display:isEditing ? "block":"none"}}>
            <label className="mt-2" htmlFor="name">Name of location</label>
            <input className="d-block" type="text" id="name" name="name" value={newName} onChange={(e) =>setNewName(e.target.value)}/>
            <label className="mt-2" htmlFor="geom_text">Geometry text</label>
            <input className="d-block" disabled id="geom_text" name="geom_text" type="text" value={feature.geom_text} />
            <input className="mt-2" type="submit" onClick={editFeature}/>
        </form>
        </>
    )
}

export default ListItem;