import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

const ProfileUpdate = async (userId, bio, profilepic) => {
  await sql`
    INSERT INTO profiles (user_id, bio, profilepic)
    VALUES (${userId}, ${bio}, ${profilepic})
  `;
  revalidatePath("/feed");
};

export default ProfileUpdate;
