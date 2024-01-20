import { useEffect } from "react";
import { useState } from "react";

const SpotifyComponent = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    async function handleProfile() {
      const clientId = import.meta.env.VITE_CLIENT_ID; // Replace with your client ID
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (!code) {
        redirectToAuthCodeFlow(clientId);
      } else {
        const accessToken = await getAccessToken(clientId, code);
        const profile = await fetchProfile(accessToken);
        // const data = await fetchWebApi(`BQAFnvfd3ERmkfCj84BUL16cF5UjIERfGBxX3Uv646pG_PidLyEUB0kA-aID4ZzL2KmXByG-OVrH61qAERfAAVLuN3MVOkflnWt_kZDd9rRiTxmAnP8`, `v1/me/top/tracks?time_range=long_term&limit=5`, 'GET').items
        // setProfileData(profile);
        // console.log(data);
        setProfileData(profile);
      }
    }
    handleProfile();
  }, []);

  async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", import.meta.env.VITE_CALLBACK_URL);
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);
    console.log(params.toString());
    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  function generateCodeVerifier(length) {
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", import.meta.env.VITE_CALLBACK_URL);
    params.append("code_verifier", verifier);

    const result = await fetch(import.meta.env.VITE_FETCH_ACCESS_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });

    const { access_token } = await result.json();
    return access_token;
  }

  async function fetchProfile(token) {
    const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    return await result.json();
  }

  // async function fetchWebApi(token, endpoint, method, body){
  //   const result = await fetch(`https://api.spotify.com/${endpoint}`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     method,
  //     body:JSON.stringify(body)
  //   });

  //   return await result.json();
  // }

  console.log(JSON.stringify(profileData));
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
                Spotify URI: <a id="uri" href="#">{profileData.uri}</a>
              </li>
              <li>
                Link: <a id="url" href="#">{profileData.external_urls.spotify}</a>
              </li>
              <li>
                Profile Image: <span id="imgUrl"><img src={profileData.images[1].url} /></span>
              </li>
            </ul>
          </section>
        </>
      )}
    </>
  );
};

export default SpotifyComponent;
