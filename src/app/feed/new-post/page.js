import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import styles from "./createPost.module.css";
import SubmitButton from "../../../components/submitButton";
import { currentUser } from "@clerk/nextjs";

export default function NewPostPage() {
  async function handleSavePost(formData) {
    "use server";
    console.log("Saving post to the database...");

    const user = await currentUser();

    let username;
    if (user.username) {
      username = user.username;
    } else {
      username = `${user.firstName} ${user.lastName}`;
    }
    const userId = user.id;

    const profileimgsrc = user.imageUrl;
    const title = formData.get("title");
    const textcontent = formData.get("textcontent");

    await sql`INSERT INTO authposts (authusername, title, authtextcontent, user_id, profilepic) VALUES (${username}, ${title}, ${textcontent}, ${userId}, ${profileimgsrc})`;

    console.log("Post saved!");
    revalidatePath("/feed");
    redirect("/feed");
  }

  return (
    <div className={styles.parent}>
      <div className={styles.formContainer}>
        <form action={handleSavePost} className={styles.form}>
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
