import img from "../demo/1.jpg";
import "./../style/Conversation.css";

const Conversation = () => {

  return (
    <div className="conversation">
      <img className="conversationImg" src={img} alt="" />
      <span className="conversationName">John</span>
    </div>
  );
};

export default Conversation;
