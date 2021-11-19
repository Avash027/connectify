import { Placeholder, Card, Stack } from "react-bootstrap";

export const PlaceHolder = () => {
  return (
    <>
      <Card style={{ width: "40%", height: "45rem", margin: "auto" }}>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={6} />
        </Placeholder>

        <Card.Body>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
        </Card.Body>
      </Card>
    </>
  );
};

export const NoPosts = () => {
  return (
    <div style={{ textAlign: "center" }}>
      No more posts <a href="/">Click here to refresh the page</a>
    </div>
  );
};

export const FollowerPlaceHolder = () => {
  return (
    <>
      {["5", "7", "1", "2"].map((elem) => (
        <div key={elem}>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={Number(elem)} />
          </Placeholder>
        </div>
      ))}
    </>
  );
};
