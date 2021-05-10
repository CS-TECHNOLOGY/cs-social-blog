import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserService } from "redux/services/chat";
import Conversations from "./components/Conversations";
import UsersList from "./components/Users";

const ChatZone = () => {
  const [users, setUsers] = useState();
  const [conversation, setConversation] = useState("general");
  const [showEmoji, setShowEmoji] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmoji = () => {
    setShowEmoji(() => !showEmoji);
  };
  const pickEmoji = async (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setMessage(() => message + emoji);
  };
  useEffect(() => {
    if (showEmoji) {
      document
        .querySelector(".cs-chatroom")
        .addEventListener("click", (event) => {
          const parent = document.querySelector(".emoji-mart");
          if (showEmoji && !parent.contains(event.target)) {
            setShowEmoji(false);
          }
        });
    }
  }, [showEmoji]);
  useEffect(() => {
    var objDiv = document.getElementById("chat-box-contain");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getUserService({
        callback: (res, err) => {
          if (!err) {
            setUsers(res);
          }
        },
      })
    );
  }, []);
  const handleType = (e) => {
    if (e === null) {
      setMessage("");
    } else if (e === "\n") {
      setMessage(message + "\n");
    } else {
      setMessage(e.target.value);
    }
    console.log(e, message);
  };
  const handleUser = (user) => {
    setConversation(user);
  };

  return (
    <div className="cs-chatroom" id="cs-chatroom">
      <UsersList users={users} handleUser={handleUser} />
      <Conversations
        conversation={conversation}
        message={message}
        handleType={handleType}
        handleEmoji={handleEmoji}
        showEmoji={showEmoji}
        pickEmoji={pickEmoji}
      />
    </div>
  );
};

export default ChatZone;
