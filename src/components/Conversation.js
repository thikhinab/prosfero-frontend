import { useEffect, useState } from "react";
import axios from "axios";
import Person from "@material-ui/icons/Person";
import "./../style/Conversation.css";

const Conversation = ({ conversation, currentUser, onCustomClick }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser.id);

    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/profile/data/${friendId}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation" onClick={() => onCustomClick(user.username)}>
      {user?.profilePicture ? (
        <img className="conversationImg" src={user.profilePicture} alt="" />
      ) : (
        <Person className="conversationImg" />
      )}
      <span className="conversationName">{user?.username}</span>
    </div>
  );
};

export default Conversation;
