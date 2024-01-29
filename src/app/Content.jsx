import { useState } from "react";
import { useEffect } from "react";
import ShowTracks from "../components/showTracks";
import ShowArtists from "../components/showArtists";

const Content = () => {
  const [showArtists, setShowArtists] = useState(false);
  const [showTracks, setShowTracks] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      if (localStorage.getItem("lastClicked") === "artists") {
        setShowArtists(true);
      } else {
        setShowTracks(true);
      }
    }
  }, []);

  async function handleTopArtists() {
    setShowArtists(true);
    localStorage.setItem("lastClicked", "artists");
  }

  async function handleTopTracks() {
    setShowTracks(true);
    localStorage.setItem("lastClicked", "tracks");
  }

  return (
    <>
      <main className="bg-[#1DB954] h-[100vh] w-[100vw] flex items-center justify-center">
        {showTracks === false && showArtists === false ? (
          <>
            <button
              className="p-4 rounded-sm font-semibold text-lg text-foreground border bg-white m-4 shadow-md"
              onClick={async () => await handleTopTracks()}
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

        {showArtists ? <ShowArtists /> : ""}

        {showTracks ? <ShowTracks /> : ""}
      </main>
    </>
  );
};

// DONE ✅ - Used localStorage for it
// This is not working, instead of rendering a spotify component everytime, render a unique different component for every feature, where all the data fetching happens in the useEffect and use spotify component inside that component to display the data

export default Content;
