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
import { Alert, Toast } from "react-bootstrap";
import logErrors from "../utils/client/logErrors";

import Createpost from "../components/Posts/Createpost";
import Card from "../components/Posts/Card";

import { PlaceHolder, NoPosts } from "../utils/client/PlaceHolderGroup";

function Home({ user, postsData, errorLoading }) {
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState(postsData);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(2);
  const [error, setError] = useState(null);

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
      setHasMore(false);
      setError(logErrors(error));
    }
  };

  if (errorLoading) {
    return (
      <Alert
        style={{
          width: "80%",
          margin: "auto",
          marginTop: "5rem",
          textAlign: "center",
        }}
        variant="danger"
      >
        <span
          style={{ marginRight: "1rem" }}
          className="fas fa-times-circle"
        ></span>{" "}
        Unable to load posts
      </Alert>
    );
  }

  return (
    <>
      <Toast
        className="p-3"
        position="top-left"
        bg="light"
        onClose={() => setError(null)}
        delay={3000}
        show={error !== null}
      >
        <Toast.Header>
          <strong className="me-auto">Connectify</strong>
        </Toast.Header>
        <Toast.Body>{error}</Toast.Body>
      </Toast>
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

      {(error || posts.length === 0) && (
        <Alert
          style={{
            width: "80%",
            margin: "auto",
            marginTop: "5rem",
            textAlign: "center",
          }}
          variant="info"
        >
          Wow! Your feed is so empty! Follow someone to see their posts
        </Alert>
      )}

      {error === null && posts && posts.length > 0 && (
        <div className={cardContainer}>
          <InfiniteScroll
            hasMore={hasMore}
            next={fetchDataOnScroll}
            loader={<PlaceHolder />}
            endMessage={<NoPosts />}
            dataLength={posts.length}
          >
            {posts.map((post) => (
              <Card
                key={post._id}
                user={user}
                post={post}
                setPosts={setPosts}
              />
            ))}
          </InfiniteScroll>
        </div>
      )}
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
    return { props: { errorLoading: true, postsData: [] } };
  }
}

export default Home;
