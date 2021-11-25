import axios from "axios";
import baseUrl from "../../utils/client/baseUrl";
import Cookie from "js-cookie";
import Router from "next/router";

const Axios = axios.create({
  baseURL: `${baseUrl}/api/profile`,
  headers: { Authorization: Cookie.get("token") },
});

export const followUser = async (userToFollowId, setUserFollowStats) => {
  try {
    await Axios.post(`follow/${userToFollowId}`);
    setUserFollowStats((prev) => ({
      ...prev,
      following: [...prev.following, { user: userToFollowId }],
    }));
  } catch (error) {
    alert(error);
  }
};

export const unfollowUser = async (userToUnFollowId, setUserFollowStats) => {
  try {
    await Axios.put(`unfollow/${userToUnFollowId}`);
    setUserFollowStats((prev) => ({
      ...prev,
      following: prev.following.filter(
        (following) => following.user !== userToUnFollowId
      ),
    }));
  } catch (error) {
    alert(error);
  }
};

export const profileUpdate = async (bio, name, profilePicUrl) => {
  try {
    await Axios.post(`/update`, {
      bio,
      name,
      profilePicUrl,
    });

    Router.reload();
  } catch (error) {
    alert(error);
  }
};

export const passwordUpdate = async (currentPassword, newPassword) => {
  try {
    await Axios.post(`/settings/password`, { currentPassword, newPassword });
  } catch (error) {
    alert(error);
  }
};
