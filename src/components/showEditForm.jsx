"use client";

import { useState, useEffect } from "react";
import styles from "./delete.module.css";

const ToggleEditComponent = ({ children }) => {
  const [showEdit, setShowEdit] = useState(false);

  const toggleEdit = (e) => {
    if (e.target === e.currentTarget) {
      setShowEdit(!showEdit);
    }
  };

  return (
    <div className={styles.edit} onClick={toggleEdit}>
      {showEdit ? "Hide Form" : "Edit"}
      {showEdit ? children : null}
    </div>
  );
};

export default ToggleEditComponent;
