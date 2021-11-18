import { TextareaAutosize } from "@material-ui/core";
import { convertTime } from "container/common/utils";
import { LoadingSpin } from "container/layout/Element";
import { EmojiPickerMemo } from "container/layout/Element";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessService, sendMessService } from "redux/services/chat";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5000";

const Conversations = ({ conversation }) => {
  const [listMess, setListMess] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("connect", (res) => console.log("hello server", res));
    socket.emit('message', "message");
  }, []);

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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getMessService({
        id: conversation._id,
        callback: (res, err) => {
          if (!err) {
            setListMess(res.messages);
            console.log(res);
            console.log(res.messages);
          }
        },
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation._id]);
  const sendMess = () => {
    dispatch(
      sendMessService({
        to: conversation._id,
        text: message,
        callback: (res, err) => {
          if (!err) {
            setListMess(res.messages);
            setMessage("");
          }
        },
      })
    );
  };
  const handleType = (e) => {
    setMessage(e.target.value);
  };
  const handleKeyEvent = (event) => {
    if (event.key === "Enter") {
      if (event.shiftKey) {
        setMessage(message + "\n");
      } else {
        event.preventDefault();
        sendMess();
      }
    }
  };
  const groupTime = () => {};
  const isLoading = useSelector((state) => state.isLoading);
  return (
    <div className="cs-chat-right">
      {/* {JSON.stringify(listMess)} */}
      <div className="cs-chat-box-head">
        {conversation === "general" ? (
          <div>
            <h5>#GENERAL</h5>
          </div>
        ) : (
          <div>
            <div className="cs-avt">
              <span>CS</span>
            </div>
            <h5>{conversation.lastname + " " + conversation.firstname}</h5>
            <span className="cs-avt-status"></span>
          </div>
        )}
        <div className="cs-chat-icons-tool">
          <i className="fi-rr-search"></i>
          <i className="fi-rr-video-camera"></i>
          <i className="fi-rr-user"></i>
          <i className="fi-rr-menu-dots"></i>
        </div>
      </div>
      <div className="cs-chat-box-contain " id="chat-box-contain">
        {/* <div className={`cs-avt ${i % 3 === 0 ? " cs-hidden-avt" : ""}`}> */}
        {isLoading ? (
          <LoadingSpin />
        ) : (
          listMess.map((i) => (
            <div
              className={`cs-message ${
                i.to === conversation._id ? " cs-m-end" : ""
              }`}
            >
              <div className={`cs-avt`}>
                <span>CS</span>
              </div>
              <div>
                <p style={{ whiteSpace: "pre-line" }}>{i.text}</p>
                <i>{convertTime(i?.date)}</i>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="cs-chat-box-type cs-chat-box-head">
        <div>
          <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Enter message..."
            value={message}
            onChange={handleType}
            onKeyPress={handleKeyEvent}
            // onKeyDown={sendMess}
          />
        </div>
        <div className="cs-chat-icons-tool">
          <i style={{ fontStyle: "normal" }} onClick={handleEmoji}>
            🙂
          </i>
          <i className="fi-rr-picture"></i>
          <i className="fi-rr-clip"></i>
          <button onClick={sendMess}>
            <i className="fi-rr-paper-plane"></i>
          </button>
        </div>
      </div>
      <div className="cs-emoji-list" hidden={!showEmoji}>
        <EmojiPickerMemo onClick={pickEmoji} />
      </div>
    </div>
  );
};

export default Conversations;
