import { Stack, Image, Button } from "react-bootstrap";

const CommentNotification = ({ notification }) => {
  return (
    <Stack direction="horizontal">
      <Image
        src={notification.user.profilePicUrl}
        roundedCircle
        style={{ height: "1.5rem", marginRight: "1rem" }}
      ></Image>
      <div>
        <strong>{notification.user.username}</strong> commented on your post :
        <strong style={{ marginLeft: "1rem" }}>
          {`"${
            notification.text.length > 10
              ? notification.text.substring(0, 9) + "..."
              : notification.text
          }"`}
        </strong>
      </div>
      <Button
        style={{ opacity: "0" }}
        className="border ms-auto"
        variant="primary"
      >
        View
      </Button>
    </Stack>
  );
};

export default CommentNotification;
