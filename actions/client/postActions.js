import axios from "axios";
import baseUrl from "../../utils/client/baseUrl";
import cookie from "js-cookie";

const Axios = axios.create({
  baseURL: `${baseUrl}/api/posts`,
  headers: {
    Authorization: cookie.get("token"),
  },
});

export const submitNewPost = async (
  text,
  location,
  picUrl,
  setPosts,
  setNewPost,
  setError
) => {
  try {
    const res = await Axios.post("/", { text, location, picUrl });

    setPosts((prev) => [res.data, ...prev]);
    setNewPost({ text: "", location: "" });
  } catch (error) {
    setError(catchErrors(error));
  }
};

export const deletePost = async (postId, setPosts, setMessage) => {
  try {
    await Axios.delete(`/${postId}`);
    setPosts((prev) => prev.filter((post) => post._id !== postId));
    setMessage(true);
  } catch (error) {
    alert(error);
  }
};

export const likePost = async (postId, userId, setLikes, like = true) => {
  try {
    if (like) {
      Axios.post(`/like/${postId}`);
      setLikes((prev) => [...prev, { user: userId }]);
    } else if (!like) {
      Axios.post(`/unlike/${postId}`);
      setLikes((prev) => prev.filter((like) => like.user !== userId));
    }
  } catch (error) {
    alert(error);
  }
};

export const postComment = async (postId, user, text, setComments, setText) => {
  try {
    const res = await Axios.post(`/comment/${postId}`, { text });

    const newComment = {
      _id: res.data,
      user,
      text,
      date: Date.now(),
    };

    setComments((prev) => [newComment, ...prev]);
    setText("");
  } catch (error) {
    alert(error);
  }
};

export const deleteComment = async (postId, commentId, setComments) => {
  try {
    await Axios.delete(`/comment/${postId}/${commentId}`);
    setComments((prev) => prev.filter((comment) => comment._id != commentId));
  } catch (e) {
    alert(e);
  }
};

export const getLikes = async (postId, setLikesList, setLoading) => {
  try {
    const res = await Axios.get(`/like/${postId}`);

    setLikesList(res.data);
    setLoading(false);
  } catch (error) {
    alert(error);
  }
};
