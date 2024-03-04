"use client";

import { handleDelete } from "@/utilities/deleteButton";
import styles from "./delete.module.css";

export default function DeleteButton({ id }) {
  return (
    <button className={styles.delete} onClick={() => handleDelete(id)}>
      Delete
    </button>
  );
}
