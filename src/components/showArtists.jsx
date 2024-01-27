import { useEffect } from "react";
import {getTopArtists} from "../utils/spotifyAuth";
import SpotifyComponent from "../App";
import { useState } from "react";


const ShowArtists = ()=>{
    const [profileData, setProfileData] = useState(null);

    useEffect(()=>{
        async function getArtists(){
            const profile = await getTopArtists();
            setProfileData(profile);
        }
        getArtists();
    }, [])

    return (
        <SpotifyComponent data={profileData} />
    )
}

export default ShowArtists;