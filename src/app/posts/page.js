// import { sql } from "@vercel/postgres";
// import { redirect } from "next/navigation";
// import { revalidatePath } from "next/cache";
// import styles from "./posts.module.css";
// import Link from "next/link";
// import SubmitButton from "@/components/submitButton";
// import DeleteButton from "@/components/DeleteButton";
// import EditPostComp from "@/components/editPost";
// import ToggleEditComponent from "@/components/showEditForm";

// const Posts = async () => {
//   const result = await sql`
//       SELECT
//         posts.id, posts.username, posts.title, posts.textcontent,
//         comments.commentid, comments.commentusername, comments.commenttextcontent
//       FROM
//         posts
//       LEFT JOIN comments ON posts.id = comments.postid
//     `;

//   const postsWithComments = result.rows.reduce((accumulator, row) => {
//     const postId = row.id;
//     if (!accumulator[postId]) {
//       accumulator[postId] = {
//         id: postId,
//         username: row.username,
//         title: row.title,
//         textcontent: row.textcontent,
//         comments: [],
//       };
//     }

//     if (row.commentid) {
//       accumulator[postId].comments.push({
//         commentid: row.commentid,
//         commentusername: row.commentusername,
//         commenttextcontent: row.commenttextcontent,
//       });
//     }

//     return accumulator;
//   }, {});

//   const postsData = Object.values(postsWithComments);

//   const handleSaveComment = async (formData) => {
//     "use server";
//     console.log("Saving post to the database...");

//     const username = formData.get("username");
//     const textcontent = formData.get("textcontent");
//     const postid = formData.get("postid");

//     await sql`INSERT INTO comments (commentusername, commenttextcontent, postid) VALUES (${username}, ${textcontent}, ${postid})`;

//     console.log("Post saved!");
//     revalidatePath("/posts");
//     redirect("/posts");
//   };

//   return (
//     <div className={styles.parent}>
//       <Link
//         className={`${styles.createPost} ${styles.button}`}
//         href="/posts/new"
//       >
//         Create Post
//       </Link>
//       {postsData.map((post) => (
//         <div key={post.id} className={styles.posts}>
//           <div className={styles.post}>
//             <p>{post.username}</p>
//             <h2>{post.title}</h2>
//             <p>{post.textcontent}</p>
//             <DeleteButton id={post.id} />
//             <ToggleEditComponent>
//               <EditPostComp id={post.id} />
//             </ToggleEditComponent>
//           </div>
//           <div className={styles.commentSection}>
//             <h1>Comments</h1>
//             <div className={styles.formContainer}>
//               <form action={handleSaveComment} className={styles.form}>
//                 <label className={styles.label} htmlFor="username">
//                   Username
//                 </label>
//                 <input
//                   className={styles.input}
//                   id="username"
//                   name="username"
//                   type="text"
//                 />

//                 <label htmlFor="textcontent">Text Content</label>
//                 <textarea
//                   id="textcontent"
//                   name="textcontent"
//                   className={styles.input}
//                 />
//                 <input
//                   className={styles.invisiblePostId}
//                   name="postid"
//                   type="text"
//                   value={post.id}
//                 />
//                 <SubmitButton className={styles.button} />
//               </form>
//             </div>
//             <div className={styles.commentsContainer}>
//               {post.comments &&
//                 post.comments.map((comment) => (
//                   <div key={comment.commentid} className={styles.comment}>
//                     <p>{comment.commentusername}</p>
//                     <p>{comment.commenttextcontent}</p>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Posts;
