import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import styles from "./createPost.module.css";
import SubmitButton from "@/components/submitButton";

export default function NewPostPage() {
  async function handleSavePost(formData) {
    "use server";
    console.log("Saving post to the database...");

    const username = formData.get("username");
    const title = formData.get("title");
    const textcontent = formData.get("textcontent");

    await sql`INSERT INTO posts (username, title, textcontent) VALUES (${username}, ${title}, ${textcontent})`;

    console.log("Post saved!");
    revalidatePath("/posts");
    redirect("/posts");
  }

  return (
    <div className={styles.parent}>
      <div className={styles.formContainer}>
        <form action={handleSavePost} className={styles.form}>
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
          <textarea
            id="textcontent"
            name="textcontent"
            className={styles.input}
          />
          <SubmitButton className={styles.button} />
        </form>
      </div>
    </div>
  );
}
