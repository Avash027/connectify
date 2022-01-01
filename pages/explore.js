import { useState } from "react";
import { cardContainer } from "../styles/Index.module.css";
import baseUrl from "../utils/client/baseUrl";
import { parseCookies } from "nookies";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import cookie from "js-cookie";
import { Alert } from "react-bootstrap";

import Card from "../components/Posts/Card";

import { PlaceHolder, NoPosts } from "../utils/client/PlaceHolderGroup";

function Explore({ user, postsData, errorLoading }) {
  const [posts, setPosts] = useState(postsData);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(2);

  const fetchDataOnScroll = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/posts/explore`, {
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
      {posts.length === 0 && (
        <Alert
          style={{
            width: "80%",
            margin: "auto",
            marginTop: "5rem",
            textAlign: "center",
          }}
          variant="info"
        >
          Wow! This plae is so empty!
        </Alert>
      )}

      {posts && posts.length > 0 && (
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

    const res = await axios.get(`${baseUrl}/api/posts/explore`, {
      headers: {
        Authorization: token,
      },
      params: { pageNumber: 1 },
    });

    return { props: { postsData: res.data } };
  } catch (error) {
    return { props: { errorLoading: true, postsData: [] } };
  }
}

export default Explore;
