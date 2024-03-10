"use client";

import ShowUserProfile from "./friendPage";
import { useState } from "react";
import styles from "./userCard.module.css";

const UserCard = ({ user }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div
      className={`${styles.userCard} ${isClicked ? "active" : ""}`}
      onClick={handleClick}
    >
      <div className={styles.userInfo}>
        <h2>{user.username}</h2>
        <img
          className={styles.userAvatar}
          src={user.profilepic}
          alt={user.username}
        />
        <p>{user.bio}</p>
      </div>
      {isClicked && <ShowUserProfile userId={user.user_id} />}
    </div>
  );
};

export default UserCard;
