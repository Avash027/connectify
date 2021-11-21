import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { parseCookies } from "nookies";
import baseUrl from "../utils/client/baseUrl";
import { Stack, Image, Button } from "react-bootstrap";
import cookie from "js-cookie";

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
  if (errorLoading) return <>Something went wrong</>;

  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loggedUserFollowStats, setLoggedUserFollowStats] =
    useState(userFollowStats);
  const ownAccount = profile.user._id === user._id;

  useEffect(() => {
    getPosts(setLoading, router.query.username, cookie.get("token"), setPosts);
  }, [router.query.username]);

  return (
    <>
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
    console.error(e);
    alert("Error loading post");
  }
  setLoading(false);
};

export async function getServerSideProps(ctx) {
  try {
    const { username } = ctx.query;
    const { token } = parseCookies(ctx);
    console.log(username);

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
