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

//TODO add username and name change to profile update

export const profileUpdate = async (
  profile,
  setLoading,
  setError,
  profilePicUrl
) => {
  try {
    const { bio } = profile;

    await Axios.post(`/update`, {
      bio,
      profilePicUrl,
    });
    setLoading(false);
    Router.reload();
  } catch (error) {
    setError(catchErrors(error));
    setLoading(false);
  }
};

export const passwordUpdate = async (setSuccess, userPasswords) => {
  try {
    const { currentPassword, newPassword } = userPasswords;

    await Axios.post(`/settings/password`, { currentPassword, newPassword });
    setSuccess(true);
  } catch (error) {
    alert(error);
  }
};
