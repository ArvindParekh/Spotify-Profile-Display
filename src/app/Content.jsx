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

  function handleClick() {
    setShowArtists(true);
  }

  return (
    <>
      <button>Get Top Tracks</button>
      <button onClick={handleClick}>Get Top Artists</button>

      {showArtists && <SpotifyComponent />}
    </>
  );
};

export default Content;
