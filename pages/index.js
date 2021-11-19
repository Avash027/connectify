import { useState } from "react";
import {
  createPostButton,
  modalPictureUpload,
  cardContainer,
} from "../styles/Index.module.css";
import baseUrl from "../utils/client/baseUrl";
import { parseCookies } from "nookies";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import cookie from "js-cookie";

import Createpost from "../components/Posts/Createpost";
import Card from "../components/Posts/Card";

import { PlaceHolder, NoPosts } from "../utils/client/PlaceHolderGroup";

function Home({ user, postsData, errorLoading }) {
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState(postsData);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(2);

  const fetchDataOnScroll = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/posts/feed`, {
        headers: { Authorization: cookie.get("token") },
        params: { pageNumber },
      });

      if (res.data.length === 0) setHasMore(false);

      setPosts((prev) => [...prev, ...res.data]);
      setPageNumber((prev) => prev + 1);
    } catch (error) {
      alert("Error Fetching post");
    }
  };

  return (
    <>
      <Createpost
        setPosts={setPosts}
        show={showModal}
        setShowModal={setShowModal}
        modalPictureUpload={modalPictureUpload}
      ></Createpost>

      <div
        className={createPostButton}
        onClick={() => setShowModal(!showModal)}
      >
        <div className="fas fa-plus"></div>
      </div>

      <div className={cardContainer}>
        <InfiniteScroll
          hasMore={hasMore}
          next={fetchDataOnScroll}
          loader={<PlaceHolder />}
          endMessage={<NoPosts />}
          dataLength={posts.length}
        >
          {posts.map((post) => (
            <Card key={post._id} user={user} post={post} setPosts={setPosts} />
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const { token } = parseCookies(ctx);

    const res = await axios.get(`${baseUrl}/api/posts/feed`, {
      headers: {
        Authorization: token,
      },
      params: { pageNumber: 1 },
    });

    return { props: { postsData: res.data } };
  } catch (error) {
    console.error(error);
    return { props: { errorLoading: true } };
  }
}

export default Home;
