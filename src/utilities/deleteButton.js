"use server";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function handleDeletePost(id) {
  await sql`DELETE FROM authposts WHERE id=${id}`;
  revalidatePath("/");
}

export async function handleDeleteComment(id) {
  await sql`DELETE FROM authcomments WHERE commentid=${id}`;
  revalidatePath("/");
}
