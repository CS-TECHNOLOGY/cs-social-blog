import { TextareaAutosize } from "@material-ui/core";
import { EmojiPickerMemo } from "container/layout/Element";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessService, sendMessService } from "redux/services/chat";

const Conversations = ({
  conversation,
  message,
  handleType,
  handleEmoji,
  showEmoji,
  pickEmoji,
}) => {
  const [listMess, setListMess] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setListMess([]);
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
            handleType(null);
          }
        },
      })
    );
  };
  const isLoading = useSelector((state) => state.isLoading);
  return isLoading ? null : (
    <div className="cs-chat-right">
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
        {listMess.map((i) => (
          <div
            className={`cs-message ${
              i.to === conversation._id ? " cs-m-end" : ""
            }`}
          >
            {/* <div className={`cs-avt ${i % 3 === 0 ? " cs-hidden-avt" : ""}`}> */}
            <div className={`cs-avt`}>
              <span>CS</span>
            </div>
            <div>
              <p style={{whiteSpace: "pre-line"}}>{'adasd \n\n asdad'}</p>
              <span>{i?.date}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="cs-chat-box-type cs-chat-box-head">
        <div>
          <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Enter message..."
            value={message}
            onChange={handleType}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                if (event.shiftKey) {
                    handleType('\n')
                } else {
                  event.preventDefault();

                  sendMess();
                }
              }
            }}
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
