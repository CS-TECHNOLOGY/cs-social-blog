import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserService } from "redux/services/chat";
import Conversations from "./components/Conversations";
import UsersList from "./components/Users";

const ChatZone = () => {
  const [users, setUsers] = useState();
  const [conversation, setConversation] = useState("general");

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

  const handleUser = (user) => {
    setConversation(user);
  };

  return (
    <div className="cs-chatroom" id="cs-chatroom">
      <UsersList users={users} handleUser={handleUser} />
      <Conversations conversation={conversation} />
    </div>
  );
};

export default ChatZone;
