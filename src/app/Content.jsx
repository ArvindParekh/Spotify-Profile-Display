import { useState } from "react";
import SpotifyComponent from "../App";
import { useEffect } from "react";
// import { getTopArtists } from "../utils/spotifyAuth";

const Content = () => {
  const [showArtists, setShowArtists] = useState(false);
  const [showTracks, setShowTracks] = useState(false);
  // const [profileData, setProfileData] = useState(null);
  // // let renderRef = true;

  // useEffect(() => {
  //   async function render() {
  //     // if (renderRef) {
  //     await getToken();
  //     // }
  //   }
  //   render();
  // }, []);

  // async function getToken() {
  //   const profile = await getAccessToken();
  //   setProfileData(profile);
  //   // renderRef = false;
  //   console.log(profileData);
  // }
  let renderRef = true;

  useEffect(() => {
    if (renderRef) {
      renderRef = false;
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (code) {
        setShowArtists(true);
      }
    }
  }, []);

  function handleTopArtists() {
    setShowArtists(true);
  }

  function handleTopTracks() {
    setShowTracks(true);
  }

  return (
    <>
      {/* {showArtists && <SpotifyComponent />} */}

      <main className="bg-[#1DB954] h-[100vh] w-[100vw] flex items-center justify-center">
        {showTracks === false && showArtists === false ? (
          <>
            <button
              className="p-4 rounded-sm font-semibold text-lg text-foreground border bg-white m-4 shadow-md"
              onClick={handleTopTracks}
            >
              Get Top Tracks
            </button>
            <button
              className="p-4 rounded-sm font-semibold text-lg text-foreground border bg-white m-4 shadow-md"
              onClick={handleTopArtists}
            >
              Get Top Artists
            </button>
          </>
        ) : (
          ""
        )}

        {showArtists ? <SpotifyComponent /> : ""}

        {showTracks ? <SpotifyComponent /> : ""}
      </main>
    </>
  );
};

export default Content;
