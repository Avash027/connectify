import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { parseCookies } from "nookies";
import baseUrl from "../utils/client/baseUrl";
import { Alert } from "react-bootstrap";
import cookie from "js-cookie";
import Head from "next/head";

import ProfileHeader from "../components/Profile/ProfileHeader";
import Card from "../components/Posts/Card";

const UserProfile = ({
  profile,
  followersLength,
  followingLength,
  errorLoading,
  user,
  userFollowStats,
}) => {
  if (errorLoading)
    return (
      <Alert
        style={{ textAlign: "center", margin: "auto", width: "60%" }}
        variant="danger"
      >
        <span className="fas fa-user-slash"></span> User not found
      </Alert>
    );

  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loggedUserFollowStats, setLoggedUserFollowStats] =
    useState(userFollowStats);
  const ownAccount = profile.user._id === user._id;

  useEffect(() => {
    if (!errorLoading)
      getPosts(
        setLoading,
        router.query.username,
        cookie.get("token"),
        setPosts
      );
  }, [router.query.username]);

  return (
    <>
      <Head>
        <title>{profile.user.username} | Connectify</title>
        <meta
          name="description"
          content={`This is the profile page of ${
            profile.user.name
          }. ${profile.user.name
            .split(" ")[0]
            .toString()} has ${followersLength} followers and is following ${followingLength}`}
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta
          itemProp="name"
          content={`${profile.user.username} | Connectify`}
        />
        <meta
          itemProp="description"
          content={`This is the profile page of ${
            profile.user.name
          }. ${profile.user.name
            .split(" ")[0]
            .toString()} has ${followersLength} followers and is following ${followingLength}`}
        />
        <meta itemProp="image" content={profile.user.profilePicUrl} />

        <meta
          name="twitter:card"
          content={`This is the profile page of ${
            profile.user.name
          }. ${profile.user.name
            .split(" ")[0]
            .toString()} has ${followersLength} followers and is following ${followingLength}`}
        />
        <meta name="twitter:site" content="Connectify" />
        <meta
          name="twitter:title"
          content={`${profile.user.username} | Connectify`}
        />
        <meta
          name="twitter:description"
          content={`This is the profile page of ${
            profile.user.name
          }. ${profile.user.name
            .split(" ")[0]
            .toString()} has ${followersLength} followers and is following ${followingLength}`}
        />
        <meta name="twitter:creator" content={profile.user.username} />
        <meta name="twitter:image:src" content={profile.user.profilePicUrl} />
      </Head>
      <ProfileHeader
        profile={profile}
        user={user}
        followersLength={followersLength}
        followingLength={followingLength}
        ownAccount={ownAccount}
        loggedUserFollowStats={loggedUserFollowStats}
        setLoggedUserFollowStats={setLoggedUserFollowStats}
        postsLength={posts.length}
      />

      {posts.length === 0 && (
        <Alert
          style={{ textAlign: "center", margin: "auto", width: "60%" }}
          variant="info"
        >
          User has not posted anything yet
        </Alert>
      )}

      {posts.length > 0 &&
        posts.map((post) => (
          <Card
            key={post._id}
            user={profile.user}
            post={post}
            setPosts={setPosts}
          ></Card>
        ))}
    </>
  );
};

const getPosts = async (setLoading, username, token, setPosts) => {
  setLoading(true);
  try {
    const res = await axios.get(`${baseUrl}/api/profile/posts/${username}`, {
      headers: { Authorization: token },
    });

    setPosts(res.data);
  } catch (e) {
    alert("Error loading post");
  }
  setLoading(false);
};

export async function getServerSideProps(ctx) {
  try {
    const { username } = ctx.query;
    const { token } = parseCookies(ctx);

    const res = await axios.get(`${baseUrl}/api/profile/${username}`, {
      headers: { Authorization: token },
    });

    const { profile, followersLength, followingLength } = res.data;

    return {
      props: {
        profile,
        followersLength,
        followingLength,
      },
    };
  } catch (e) {
    console.error(e);
    return { props: { errorLoading: true } };
  }
}

export default UserProfile;
