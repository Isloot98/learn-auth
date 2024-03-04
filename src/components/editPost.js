import styles from "./delete.module.css";
import SubmitButton from "@/components/submitButton";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default function EditPostComp({ id }) {
  const postid = id;

  async function handleEdit(formData) {
    "use server";
    console.log("Saving post to the database...");

    const username = formData.get("username");
    const title = formData.get("title");
    const textcontent = formData.get("textcontent");

    await sql`UPDATE posts 
    SET username = ${username}, title = ${title}, textcontent = ${textcontent} WHERE id = ${postid}`;

    console.log("Post saved!");
    revalidatePath("/posts");
    redirect("/posts");
  }

  console.log(postid);
  return (
    <div className={styles.parent}>
      <div className={styles.formContainer}>
        <form action={handleEdit} className={styles.form}>
          <label className={styles.label} htmlFor="username">
            Username
          </label>
          <input
            className={styles.input}
            id="username"
            name="username"
            type="text"
          />
          <label className={styles.label} htmlFor="title">
            Title
          </label>
          <input id="title" name="title" type="text" className={styles.input} />
          <label htmlFor="textcontent">Text Content</label>
          <input
            type="text"
            id="textcontent"
            name="textcontent"
            className={styles.input}
          />
          <input
            id="postid"
            name="postid"
            type="text"
            className={styles.postid}
            value={postid}
          />
          <SubmitButton className={styles.button} />
        </form>
      </div>
    </div>
  );
}
