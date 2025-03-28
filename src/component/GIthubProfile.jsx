import React, { useState } from "react";
import "./githubProfile.css";

function GIthubProfile() {
  const [username, setUsername] = useState();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    if (data.status !== "404") {
      setProfile(data);
      console.log(data);
      setError(null);
      return;
    } else {
      setError("User Not Found");
      setProfile(null);
      console.log("not found");
    }
    setUsername('')
  };

  return (
    <div className="mainContainer">
      <div className="container">
        <div className="heading">GitHub Profile Finder</div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Github Username..."
            value={username}
            className="searchInput"
            autoComplete="true"
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit" className="findBtn">
            Find
          </button>
        </form>

        <img src="start.gif" className="start" />
        <h1>enter any <br /> github username</h1>
        {error ? (
          <div className="profile">
            <div className="error">
              <img src="notfound.gif" alt="" />
              <strong>{error}</strong>
            </div>
          </div>
        ) : (
          ""
        )}

        {profile ? (
          <div className="profile">
            <div className="userData">
              <div className="sec1">
                <img src={profile.avatar_url} alt="image" />
                <div className="details">
                  <h2>{profile.name}</h2>

                  <h3>{profile.bio}</h3>
                  <div className="map">
                    <img src="map.png" alt="" />
                    <p>{profile.location ?? "unknow"}</p>
                    <img src="office.png" alt="" />
                    <p>{profile.company ?? "unknow"}</p>
                  </div>
                </div>
              </div>

              <div className="sec2">
                <div className="view">
                  <a href={profile.html_url} target="_blank">
                    <p>@{profile.login}</p>
                  </a>
                  <a href={profile.html_url} target="_blank">
                    <button>View Profile</button>
                  </a>
                </div>
                <div className="count">
                  <div>
                    <h3>Repo</h3>
                    <p>{profile.public_repos}</p>
                  </div>
                  <div>
                    <h3>Follower</h3>
                    <p>{profile.followers}</p>
                  </div>
                  <div>
                    <h3>Following</h3>
                    <p>{profile.following}</p>
                  </div>
                </div>
              </div>

              <div className="sec3">
                <div className="time">
                  <div className="crt">
                    {" "}
                    <p>Created : </p>
                    <span>{profile.created_at.slice(0, 4)}</span>
                  </div>
                  <div className="upd">
                    <p>Updated :</p>
                    <span>{profile.updated_at.slice(0, 4)}</span>
                  </div>
                </div>
                <div className="social">
                  <h2>Social Media</h2>
                  <div className="icons">
                  {profile.blog &&
                    <a  target="_blank" title={profile.blog} href={profile.blog}>
                      <img src="link.png" alt="social media" />
                    </a>}
                    {profile.email && <a  target="_blank" title={profile.email} href={`mailto:{profile.email}`}>
                   <img src="email.png" alt="social media" />
                    </a>}
                    {profile.twitter_username &&
                    <a  target="_blank"
                      title={profile.twitter_username}
                      href={profile.twitter_username}
                    >
                      <img src="twitter.png" alt="social media" />
                    </a>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default GIthubProfile;
