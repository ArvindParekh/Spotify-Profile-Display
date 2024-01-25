import { useState } from "react";
import SpotifyComponent from "../App";
import { useEffect } from "react";

const Content = () => {
  const [showArtists, setShowArtists] = useState(false);
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

  return (
    <>
      {/* {showArtists && <SpotifyComponent />} */}

      <main className="bg-[#1DB954] h-[100vh] w-[100vw] flex items-center justify-center">
        {showArtists ? (
          <SpotifyComponent />
        ) : (
          <>
            <button className="p-4 rounded-sm font-semibold text-lg text-foreground border bg-white m-4 shadow-md" onClick={handleTopTracks}>Get Top Artists</button>
            <button className="p-4 rounded-sm font-semibold text-lg text-foreground border bg-white m-4 shadow-md" onClick={handleTopArtists}>Get Top Tracks</button>
          </>
        )}
      </main>
    </>
  );
};

export default Content;
