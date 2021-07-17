import { useContext } from "react";
import { Redirect } from "react-router";
import Conversation from "../components/Conversation";
import Message from "../components/Message";
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
          <div
            className="sidebar"
            style={{
              backgroundColor: "#e6f5ff",
              borderRadius: "1rem",
            }}
          >
            <h3>Conversations</h3>
            <hr />
            <Conversation />
            <Conversation />
            <Conversation />
          </div>
          <div className="chatbox">
            <h3>John</h3>
            <hr />
            <div className="chatbox-wrapper">
              <div className="chat-window">
                <Message />
                <Message own={true} />
                <Message />
                <Message />
                <Message />
              </div>
              <div className="chat-input">
                <textarea className="chat-input-textarea" rows="3" />
                <div className="button-wrapper">
                  <button className="chat-input-button btn btn-primary">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
