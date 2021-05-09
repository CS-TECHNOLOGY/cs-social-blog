import { TextareaAutosize } from "@material-ui/core";
import { randomArray } from "container/common/utils";
import { EmojiPickerMemo } from "container/layout/Element";
import React, { useEffect, useState } from "react";

const ChatZone = () => {
  const myArr = randomArray(10, 10);
  const [showEmoji, setShowEmoji] = useState(false);
  const [massage, setMassage] = useState("");
  const handleEmoji = () => {
    setShowEmoji(() => !showEmoji);
  };
  const pickEmoji = async (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setMassage(() => massage + emoji);
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
  const handleType = (e) => {
    setMassage(e.target.value);
  };
  return (
    <div className="cs-chatroom" id="cs-chatroom">
      <div className="cs-chat-left">
        <h3>CS Chat</h3>
        <div className="cs-search-bar">
          <i className="fi-rr-search"></i>
          <input type="text" placeholder="Type to search" />
        </div>
        <div className="cs-list-user">
          {myArr.map((i) => (
            <div className="cs-one-user">
              <div className="cs-avt">
                <span>CS</span>
                <span className="cs-avt-status"></span>
              </div>
              <div>
                <h5>Phạm Quyết Thắng</h5>
                <p>Hello cs technology</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="cs-chat-right">
        <div className="cs-chat-box-head">
          <div>
            <div className="cs-avt">
              <span>CS</span>
            </div>
            <h5>Phạm Quyết Thắng</h5>
            <span className="cs-avt-status"></span>
          </div>
          <div className="cs-chat-icons-tool">
            <i className="fi-rr-search"></i>
            <i className="fi-rr-video-camera"></i>
            <i className="fi-rr-user"></i>
            <i className="fi-rr-menu-dots"></i>
          </div>
        </div>
        <div className="cs-chat-box-contain " id="chat-box-contain">
          <div>
            <div className="cs-avt">
              <span>CS</span>
            </div>
            <h5>Phạm Quyết Thắng</h5>
          </div>
        </div>
        <div className="cs-chat-box-type cs-chat-box-head">
          <div>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Enter message..."
              value={massage}
              onChange={handleType}
            />
          </div>
          <div className="cs-chat-icons-tool">
            <i style={{ fontStyle: "normal" }} onClick={handleEmoji}>
              🙂
            </i>
            <i className="fi-rr-picture"></i>
            <i className="fi-rr-clip"></i>
            <button>
              {/* <i class="fi-sr-paper-plane"></i> */}
              <i className="fi-rr-paper-plane"></i>
            </button>
          </div>
        </div>
        <div className="cs-emoji-list" hidden={!showEmoji}>
          <EmojiPickerMemo onClick={pickEmoji} />
        </div>
      </div>
    </div>
  );
};

export default ChatZone;
