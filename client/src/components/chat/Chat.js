import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { userMessage, sendMessage } from "../../actions/watson";

const Chat = ({ chat, userMessage, sendMessage }) => {
  // handle user's message
  const [message, setMessage] = useState("");
  const endOfMessages = useRef(null);

  const scrollToBottom = () => {
    endOfMessages.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [chat]);

  // function that handles user submission
  const handleClick = async (e) => {
    const code = e.keyCode || e.which;

    if (code === 13) {
      console.log(message);
      userMessage(message);
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="chat">
      <h1>JustinBot</h1>
      {/* Handle Messages */}
      <div className="historyContainer">
        {chat.length === 0
          ? ""
          : chat.map((msg) => <div className={msg.type}>{msg.message}</div>)}
        <div className="scrollbar" ref={endOfMessages}></div>
      </div>
      {/* Input Box */}
      <input
        id="chatBox"
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleClick}
        value={message}
        placeholder="Message"
      ></input>
    </div>
  );
};
const mapStateToProps = (state) => ({
  chat: state.watson.messages,
});

export default connect(mapStateToProps, { userMessage, sendMessage })(Chat);
