import { Stack, Image, Button } from "react-bootstrap";
const LikeNotification = ({ user, notification }) => {
  return (
    <Stack direction="horizontal">
      <Image
        src={notification.user.profilePicUrl}
        roundedCircle
        style={{ height: "1.5rem", marginRight: "1rem" }}
      ></Image>
      <div>
        <strong>{notification.user.username}</strong> liked your post
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

export default LikeNotification;
