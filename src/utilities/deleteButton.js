"use server";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function handleDelete(id) {
  await sql`DELETE FROM posts WHERE id=${id}`;
  revalidatePath("/posts");
}
