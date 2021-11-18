import React from "react";
import Skeleton from "react-loading-skeleton";
const UsersList = ({ users, handleUser }) => {
  return (
    <div className="cs-chat-left">
      <h3>CS Chat</h3>
      <div className="cs-search-bar">
        <i className="fi-rr-search"></i>
        <input type="text" placeholder="Type to search" />
      </div>
      <div className="cs-list-user">
        <div className="cs-one-user" onClick={() => handleUser("general")}>
          <div className="cs-avt">
            <span className="fi-rr-globe" style={{ fontSize: "150%" }}></span>
          </div>
          <div>
            <h5>#GENERAL</h5>
          </div>
        </div>
        {users ? (
          users?.map((i) => (
            <div className="cs-one-user" onClick={() => handleUser(i)}>
              <div className="cs-avt">
                <span>{i.name?.slice(0, 1)}</span>
                <span className="cs-avt-status"></span>
              </div>
              <div>
                <h5>{i.name}</h5>
                <p>Hello cs technology</p>
              </div>
            </div>
          ))
        ) : (
          <Skeleton count={10} />
        )}
      </div>
    </div>
  );
};

export default UsersList;
