import { useEffect } from "react";
import { useState } from "react";
import { getTopTracks } from "./utils/spotifyAuth";

const SpotifyComponent = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    async function render() {
      await getTracks();
    }
    render();
  }, []);

  async function getTracks() {
    const profile = await getTopTracks();
    setProfileData(profile);
  }

  return (
    <>
      {profileData && (
        <aside className="bg-white shadow-2xl flex flex-col border border-[#d6d6d6] rounded-3xl items-center w-[70%] h-[70%] my-auto justify-evenly">
          <h1 className="font-bold text-6xl tracking-tight leading-[1.1]">
            Here are your top 20 artists
          </h1>

          {/* <ol> */}
          {console.log(profileData)}
          <div className="flex items-center w-[100%] pl-40">
            <ol className="w-1/4 text-muted-foreground list-decimal">
              {profileData.slice(0,5).map((artist, index) => {
                return <li className="text-xl p-2" key={index}>
                  {artist.name}
                </li>;
              })}
            </ol>

            <ol className="w-1/4 text-muted-foreground list-decimal" start={6}>
              {profileData.slice(5,10).map((artist, index) => {
                return <li className="text-xl p-2" key={index}>
                  {artist.name}
                </li>;
              })}
            </ol>

            <ol className="w-1/4 text-muted-foreground list-decimal" start={11}>
              {profileData.slice(10,15).map((artist, index) => {
                return <li className="text-xl p-2" key={index}>
                  {artist.name}
                </li>;
              })}
            </ol>

            <ol className="w-1/4 text-muted-foreground list-decimal" start={15}>
              {profileData.slice(15).map((artist, index) => {
                return <li className="text-xl p-2" key={index}>
                  {artist.name}
                </li>;
              })}
            </ol>
            {/* </ol> */}
          </div>
        </aside>
      )}
    </>
  );
};
export default SpotifyComponent;
