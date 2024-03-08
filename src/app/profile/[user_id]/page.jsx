import DeleteButton from "@/components/DeleteButton";
import DeleteComment from "@/components/DeleteComment";
import EditPostComp from "@/components/editPost";
import ToggleEditComponent from "@/components/showEditForm";
import SubmitButton from "@/components/submitButton";
import { currentUser } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import Link from "next/link";
import styles from "../../feed/posts.module.css";

const profilePage = async () => {
  const user = await currentUser();
  let username;
  if (user.username) {
    username = user.username;
  } else {
    username = `${user.firstName} ${user.lastName}`;
  }
  const userId = user.id;
  const profileimgsrc = user.imageUrl;

  const result = await sql`
SELECT
  authposts.id, authposts.authusername, authposts.title, authposts.authtextcontent, authposts.profilepic,
  authcomments.commentid, authcomments.username, authcomments.textcontent, authcomments.imgurl
  FROM
  authposts
LEFT JOIN authcomments ON authposts.id = authcomments.postid
WHERE authposts.user_id = ${user.id}
    `;

  const postsWithComments = result.rows.reduce((accumulator, row) => {
    const postId = row.id;
    if (!accumulator[postId]) {
      accumulator[postId] = {
        id: postId,
        username: row.authusername,
        title: row.title,
        textcontent: row.authtextcontent,
        imgurl: row.profilepic,
        comments: [],
      };
    }

    if (row.commentid) {
      accumulator[postId].comments.push({
        commentid: row.commentid,
        commentusername: row.username,
        commenttextcontent: row.textcontent,
        imgurl: row.imgurl,
      });
    }

    return accumulator;
  }, {});

  const postsData = Object.values(postsWithComments);
  const sortedPostsData = postsData.sort((a, b) => b.id - a.id);

  const handleSaveComment = async (formData) => {
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

    const textcontent = formData.get("textcontent");
    const postid = formData.get("postid");

    await sql`INSERT INTO authcomments (username, textcontent, postid, user_id, imgurl) VALUES (${username}, ${textcontent}, ${postid}, ${userId}, ${profileimgsrc})`;

    revalidatePath(`/profile/${userId}`);
    redirect(`/profile/${userId}`);
  };

  console.log(postsWithComments);

  return (
    <div className={styles.parent}>
      {sortedPostsData.map((post) => (
        <div key={post.id} className={styles.posts}>
          <div className={styles.post}>
            <img className={styles.profilePic} src={post.imgurl} />
            <p>{post.username}</p>
            <h2>{post.title}</h2>
            <p>{post.textcontent}</p>
            <DeleteButton id={post.id} />
            <ToggleEditComponent>
              <EditPostComp id={post.id} />
            </ToggleEditComponent>
          </div>
          <div className={styles.commentSection}>
            <h1>Comments</h1>
            <div className={styles.formContainer}>
              <form action={handleSaveComment} className={styles.form}>
                <label htmlFor="textcontent">Text Content</label>
                <textarea
                  id="textcontent"
                  name="textcontent"
                  className={styles.input}
                />
                <input
                  className={styles.invisiblePostId}
                  name="postid"
                  type="text"
                  value={post.id}
                />
                <SubmitButton className={styles.button} />
              </form>
            </div>
            <div className={styles.commentsContainer}>
              {post.comments &&
                post.comments.map((comment) => (
                  <div key={comment.commentid} className={styles.comment}>
                    <img
                      className={styles.commentProfilePic}
                      src={comment.imgurl}
                    />

                    <p>{comment.commentusername}</p>
                    <p>{comment.commenttextcontent}</p>
                    <DeleteComment id={comment.commentid} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default profilePage;
