import { randomArray } from "container/common/utils";
import { EmojiPickerMemo } from "container/layout/Element";
import React from "react";

const ChatZone = () => {
  const myArr = randomArray(10, 10);
  return (
    <div className="cs-chatroom">
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
            <i class="fi-rr-video-camera"></i>
            <i class="fi-rr-user"></i>
            <i class="fi-rr-menu-dots"></i>
          </div>
        </div>
        <div className="cs-chat-box-contain ">
          <div>
            <div className="cs-avt">
              <span>CS</span>
            </div>
            <h5>Phạm Quyết Thắng</h5>
          </div>
        </div>
        <div className="cs-chat-box-type cs-chat-box-head">
          <div>
            <div className="cs-avt">
              <span>CS</span>
            </div>
            <h5>Phạm Quyết Thắng</h5>
          </div>
          <EmojiPickerMemo />
        </div>
      </div>
    </div>
  );
};

export default ChatZone;
