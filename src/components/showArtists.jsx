import { useEffect } from "react";
import { getTopArtists } from "../utils/spotifyAuth";
import Card from "./Card";
import { useState } from "react";

const ShowArtists = () => {
  const [artistData, setArtistData] = useState(null);

  useEffect(() => {
    async function getArtists() {
      const profile = await getTopArtists();
      setArtistData(profile);
    }
    getArtists();
  }, []);

  return <Card data={artistData} title="artists" />;
};

export default ShowArtists;
