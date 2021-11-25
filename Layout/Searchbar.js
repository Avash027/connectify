import { useState, useRef } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { InputGroup, Button } from "react-bootstrap";
import axios from "axios";
import baseUrl from "../utils/client/baseUrl";
import cookie from "js-cookie";

import styles from "../styles/Header.module.css";

const Searchbar = ({ header }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const ref = useRef();

  const handleSearch = async (query) => {
    setIsLoading(true);

    const { data } = await axios.get(`${baseUrl}/api/search/${query}`, {
      headers: { Authorization: cookie.get("token") },
    });

    const options = data.map((option) => ({
      profilePicUrl: option.profilePicUrl,
      username: option.username,
      id: option._id,
    }));

    setOptions(options);
    setIsLoading(false);
  };

  const handleClick = (username) => {
    window.location.href = `${baseUrl}/${username}`;
  };

  const filterBy = () => true;

  return (
    <>
      <InputGroup style={{ borderRadius: "20px" }}>
        <AsyncTypeahead
          style={{ width: "100%", height: "40px" }}
          filterBy={filterBy}
          id="async-example"
          ref={ref}
          isLoading={isLoading}
          labelKey="username"
          minLength={1}
          onSearch={handleSearch}
          options={options}
          placeholder="Username"
          renderMenuItemChildren={(option, props) => (
            <div onClick={() => handleClick(option.username)}>
              <img
                alt={option.id}
                src={option.profilePicUrl}
                style={{
                  height: "24px",
                  marginRight: "10px",
                  width: "24px",
                  borderRadius: "50%",
                }}
              />
              <span>{option.username}</span>
            </div>
          )}
        />

        <Button
          className={header ? styles.button : ""}
          variant="outline-secondary"
          onClick={() => handleClick(ref.current.state.text)}
        >
          <span className="fas fa-search"></span>
        </Button>
      </InputGroup>
    </>
  );
};

export default Searchbar;
