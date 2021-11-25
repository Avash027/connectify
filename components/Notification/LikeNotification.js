import { Stack, Image, Button } from "react-bootstrap";
import styles from "../../styles/Notification.module.css";

const LikeNotification = ({ user, notification }) => {
  return (
    <div className={styles.container}>
      <Image
        src={notification.user.profilePicUrl}
        roundedCircle
        style={{ height: "1.5rem", width: "1.5rem", marginRight: "1rem" }}
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
    </div>
  );
};

export default LikeNotification;
