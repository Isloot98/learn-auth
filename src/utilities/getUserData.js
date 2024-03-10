"use server";
import { sql } from "@vercel/postgres";

export default async function getUserData(userId) {
  const selectProfileDetails = await sql`SELECT
    authposts.id, authposts.authusername, authposts.title, authposts.authtextcontent, authposts.profilepic,
    authcomments.commentid, authcomments.username, authcomments.textcontent, authcomments.imgurl
    FROM
    authposts
    LEFT JOIN authcomments ON authposts.id = authcomments.postid
    WHERE authposts.user_id = ${userId}
  `;
  return selectProfileDetails;
}
