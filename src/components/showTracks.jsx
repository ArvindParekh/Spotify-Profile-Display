import { useEffect } from "react";
import { useState } from "react";
import { getTopTracks } from "../utils/spotifyAuth";
import Card from "./Card";

const ShowTracks = () => {
  const [tracksData, setTracksData] = useState(null);

  useEffect(() => {
    async function getTracks() {
      const data = await getTopTracks();
      setTracksData(data);
    }
    getTracks();
  }, []);

  return <Card data={tracksData} title="tracks" />;
};

export default ShowTracks;
