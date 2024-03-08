import { currentUser } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import styles from "./signup.module.css";
import ProfileUpdate from "../../utilities/updateProfile";

const SignUp = () => {
  const setUserDetails = async (formData) => {
    "use server";
    const user = await currentUser();
    let username;
    console.log(user);
    if (user && user.username) {
      username = user.username;
    } else if (user && user.firstName && user.lastName) {
      username = `${user.firstName} ${user.lastName}`;
    } else {
      username = "Anonymous";
    }
    const userId = user.id;

    const bio = formData.get("bio");
    const profilepic = user.imageUrl;

    await sql`INSERT INTO users (user_id, username) VALUES (${userId}, ${username})`;
    await ProfileUpdate(userId, bio, profilepic);
    revalidatePath("/feed");
    redirect("/feed");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome!</h1>
      <p className={styles.description}>
        Set your bio and then click Go to Feed
      </p>
      <form action={setUserDetails} className={styles.form}>
        <label htmlFor="bio">Bio</label>
        <textarea id="bio" name="bio" className={styles.input} />
        <button type="submit" className={styles.button}>
          Go to Feed
        </button>
      </form>
    </div>
  );
};

export default SignUp;
