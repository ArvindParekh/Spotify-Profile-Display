import { useEffect } from "react";
import { useState } from "react";
import { getAccessToken } from "./utils/spotifyAuth";

const SpotifyComponent = () => {
  const [profileData, setProfileData] = useState(null);
  let renderRef = true;

  useEffect(() => {
    async function render() {
      if (renderRef) {
        await getToken();
      }
    }
    render();
  }, []);

  async function getToken() {
    const profile = await getAccessToken();
    setProfileData(profile);
    renderRef = false;
    console.log(profile);
  }

  return (
    <>
      {profileData && (
        <>
          <h1>Here are your top 10 artists!</h1>

          <ol>
            {profileData.map((artist, index) => {
              return <li key={index}>{artist.name}</li>;
            })}
          </ol>
        </>
      )}
    </>
  );
};
export default SpotifyComponent;
