import { sql } from "@vercel/postgres";
import Link from "next/link";
import { currentUser, SignedIn, clerkClient } from "@clerk/nextjs";
import styles from "../feed/posts.module.css";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import UserCard from "@/components/userCard";

const Users = async () => {
  const users = await clerkClient.users.getUserList();

  const user = await currentUser();
  const result = await sql`
      SELECT
        users.user_id, users.username, profiles.profilepic, profiles.bio
      FROM
        users
       LEFT JOIN profiles ON users.user_id = profiles.user_id
    `;

  const getUserProfile = async (formData) => {};

  return (
    <SignedIn>
      <div>
        {result.rows.map((user) => (
          <UserCard key={user.user_id} user={user} />
        ))}
      </div>
    </SignedIn>
  );
};

export default Users;
