import { useState } from "react";
import SpotifyComponent from "../App";
import { useEffect } from "react";
import { getTopArtists, getTopTracks } from "../utils/spotifyAuth";
import ShowTracks from "../components/showTracks";
import ShowArtists from "../components/showArtists";
import { useRef } from "react";

const Content = () => {
  const [showArtists, setShowArtists] = useState(false);
  const [showTracks, setShowTracks] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      console.log(ref.current);
      if (ref.current === "artists") {
        setShowArtists(true);
      } else {
        setShowTracks(true);
      }
    }
  }, []);

  async function handleTopArtists() {
    // const profile = await getTopArtists();
    // console.log(profile);
    // setProfileData(profile);
    setShowArtists(true);
    ref.current = "artists";
  }

  async function handleTopTracks() {
    // const profile = await getTopTracks();
    // console.log(profile);
    // setProfileData(profile);
    setShowTracks(true);
    ref.current = "tracks";
  }

  console.log(profileData);

  return (
    <>
      {/* {showArtists && <SpotifyComponent />} */}

      <main className="bg-[#1DB954] h-[100vh] w-[100vw] flex items-center justify-center">
        {showTracks === false && showArtists === false ? (
          <>
            <button
              className="p-4 rounded-sm font-semibold text-lg text-foreground border bg-white m-4 shadow-md"
              onClick={async ()=> await handleTopTracks()}
            >
              Get Top Tracks
            </button>
            <button
              className="p-4 rounded-sm font-semibold text-lg text-foreground border bg-white m-4 shadow-md"
              onClick={async () => await handleTopArtists()}
            >
              Get Top Artists
            </button>
          </>
        ) : (
          ""
        )}

        {showArtists ? <ShowArtists data={profileData} /> : ""}

        {showTracks ? <ShowTracks data={profileData} /> : ""}
      </main>
    </>
  );
};

// This is not working, instead of rendering a spotify component everytime, render a unique different component for every feature, where all the data fetching happens in the useEffect and use spotify component inside that component to display the data

export default Content;
