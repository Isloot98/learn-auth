"use client";

import { handleDeletePost } from "../utilities/deleteButton";
import styles from "./delete.module.css";

export default function DeleteButton({ id }) {
  return (
    <button className={styles.delete} onClick={() => handleDeletePost(id)}>
      Delete
    </button>
  );
}
