import { randomArray } from "container/common/utils";
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
              <div className="cs-avt"><span>CS</span></div>
              <div>
                <h5>Phạm Quyết Thắng</h5>
                <p>Hello cs technolory</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="cs-chat-right"> 2</div>
    </div>
  );
};

export default ChatZone;
