import "./../style/Message.css";

const Message = ({ own }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="message-cover">
        <div className="message-text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </div>
      </div>
      <div className="message-meta">1 hour ago</div>
    </div>
  );
};

export default Message;
