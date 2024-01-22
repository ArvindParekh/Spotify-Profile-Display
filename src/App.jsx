import { useEffect } from "react";
import { useState } from "react";
import { getAccessToken } from "./utils/spotifyAuth";

const SpotifyComponent = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    async function getToken() {
      const profile = await getAccessToken();
      // console.log(profile.map((artist)=>artist));
      profile.map((artist)=>{
        console.log(artist, ' ');
      })
    }
    getToken();
  }, []);

  // console.log(JSON.stringify(profileData));
  return (
    <>
      {profileData && (
        <>
          <h1>Display your Spotify profile data</h1>

          <p>{profileData.items}</p>
          <section id="profile">
            <h2>
              Logged in as{" "}
              <span id="displayName">{profileData.display_name}</span>
            </h2>
            {/* <span id="avatar"></span> */}
            <ul>
              <li>
                User ID: <span id="id">{profileData.id}</span>
              </li>
              <li>
                Email: <span id="email">{profileData.email}</span>
              </li>
              <li>
                Spotify URI:{" "}
                <a id="uri" href="#">
                  {profileData.uri}
                </a>
              </li>
              <li>
                Link:{" "}
                <a id="url" href="#">
                  {profileData.external_urls.spotify}
                </a>
              </li>
              <li>
                Profile Image:{" "}
                <span id="imgUrl">
                  <img src={profileData.images[1].url} />
                </span>
              </li>
            </ul>
          </section>
        </>
      )}
    </>
  );
};
export default SpotifyComponent;
