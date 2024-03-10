import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs";

const EditBioForm = async () => {
  const user = await currentUser();

  const handleSubmit = async (formData) => {
    "use server";

    const bio = formData.get("bio");
    const profilePic = formData.get("profilepic");

    await sql`
        UPDATE profiles
        SET bio = ${bio}, profilepic = ${profilePic}
        WHERE user_id = ${user.id}
      `;
    revalidatePath(`/profile/${user.id}`);
    redirect(`/profile/${user.id}`);
  };

  return (
    <form action={handleSubmit}>
      <label htmlFor="bio">Bio:</label>
      <textarea id="bio" name="bio" />
      <label htmlFor="profilepic">Profile Picture:</label>
      <textarea
        id="profilepic"
        name="profilepic"
        placeholder="add an image url to replace your profile picture"
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default EditBioForm;
