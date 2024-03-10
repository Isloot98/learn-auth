import { currentUser, SignedIn } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import Link from "next/link";
import feedStyles from "../../feed/posts.module.css";
import DeleteButton from "../../../components/DeleteButton";
import ToggleEditComponent from "../../../components/showEditForm";
import EditPostComp from "../../../components/editPost";
import SubmitButton from "../../../components/submitButton";
import DeleteComment from "../../../components/DeleteComment";
import profileStyles from "./profile.module.css";

const profilePage = async () => {
  const user = await currentUser();
  let username;
  if (user && user.username) {
    username = user.username;
  } else if (user && user.firstName) {
    username = `${user.firstName} ${user.lastName}`;
  } else {
    username = "user";
  }
  if (user) {
    const userId = user.id;
    const profileimgsrc = user.imageUrl;
  } else {
    return null;
  }

  const result = await sql`
SELECT
  authposts.id, authposts.authusername, authposts.title, authposts.authtextcontent, authposts.profilepic,
  authcomments.commentid, authcomments.username, authcomments.textcontent, authcomments.imgurl
  FROM
  authposts
LEFT JOIN authcomments ON authposts.id = authcomments.postid
WHERE authposts.user_id = ${user.id}
    `;

  const profileData = await sql`SELECT
  profiles.bio, profiles.profilepic
  FROM
  profiles
  WHERE
  user_id = ${user.id}`;

  console.log(profileData);

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

  return (
    <div className={`${feedStyles.parent} ${profileStyles.parent}`}>
      {user.id ? null : <h1>Please sign in or create an account</h1>}
      <SignedIn>
        <div className={profileStyles.profileContainer}>
          <div className={profileStyles.profileHeader}>
            <div className={profileStyles.profilePictureContainer}>
              {profileData.rows && profileData.rows.length > 0 && (
                <img
                  src={profileData.rows[0].profilepic}
                  alt="Profile Picture"
                />
              )}
            </div>
            <div className={profileStyles.profileActions}>
              <Link href={`/profile/${user.id}/edit-bio`}>Edit Bio</Link>
            </div>
          </div>
          <div className={profileStyles.bio}>
            {profileData.rows && profileData.rows.length > 0 && (
              <p>{profileData.rows[0].bio}</p>
            )}
          </div>
        </div>

        {sortedPostsData.map((post) => (
          <div key={post.id} className={feedStyles.posts}>
            <div className={feedStyles.post}>
              <img className={feedStyles.profilePic} src={post.imgurl} />
              <p>{post.username}</p>
              <h2>{post.title}</h2>
              <p>{post.textcontent}</p>
              <DeleteButton id={post.id} />
              <ToggleEditComponent>
                <EditPostComp id={post.id} />
              </ToggleEditComponent>
            </div>
            <div className={feedStyles.commentSection}>
              <h1>Comments</h1>
              <div className={feedStyles.formContainer}>
                <form action={handleSaveComment} className={feedStyles.form}>
                  <label htmlFor="textcontent">Text Content</label>
                  <textarea
                    id="textcontent"
                    name="textcontent"
                    className={feedStyles.input}
                  />
                  <input
                    className={feedStyles.invisiblePostId}
                    name="postid"
                    type="text"
                    value={post.id}
                  />
                  <SubmitButton className={feedStyles.button} />
                </form>
              </div>
              <div className={feedStyles.commentsContainer}>
                {post.comments &&
                  post.comments.map((comment) => (
                    <div key={comment.commentid} className={feedStyles.comment}>
                      <img
                        className={feedStyles.commentProfilePic}
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
      </SignedIn>
    </div>
  );
};

export default profilePage;
