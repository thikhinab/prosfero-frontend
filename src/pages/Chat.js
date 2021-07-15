import { useContext } from "react";
import { Redirect } from "react-router";
import NavigationBar from "../components/NavigationBar";
import { UserContext } from "../utils/UserContext";
import "./../style/Chat.css";

const Chat = () => {
  const { user, setUser } = useContext(UserContext);

  if (!user.token || user.expired) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <NavigationBar
        loggedin={true}
        func={() => {
          localStorage.removeItem("prosfero-token");
          localStorage.removeItem("prosfero-id");
          setUser({
            token: null,
            id: null,
          });
        }}
      />
      <div className="container">
        <div className="chat">
          <div className="sidebar"></div>
          <div className="chatbox"></div>
        </div>
      </div>
    </>
  );
};

export default Chat;
