"use client";

import { handleDeleteComment } from "@/utilities/deleteButton";
import styles from "./delete.module.css";

export default function DeleteComment({ id }) {
  return (
    <button className={styles.delete} onClick={() => handleDeleteComment(id)}>
      Delete
    </button>
  );
}
