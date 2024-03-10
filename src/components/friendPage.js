import React, { useState, useEffect } from "react";
import selectProfileDetails from "../utilities/getUserData";
import styles from "./friendProfiles.module.css";

const ShowUserProfile = ({ userId }) => {
  const [profileDetails, setProfileDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await selectProfileDetails(userId);
        setProfileDetails(data);
      } catch (error) {
        console.error("Error fetching profile details:", error);
      }
    };

    fetchData();
  }, [userId]);

  if (!profileDetails) {
    return <div>Loading...</div>;
  }

  const postsWithComments = profileDetails.rows.reduce((accumulator, row) => {
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

  const sortedPostsData = Object.values(postsWithComments).sort(
    (a, b) => b.id - a.id
  );

  return (
    <div>
      {sortedPostsData.map((post) => (
        <div key={post.id} className={styles.postContainer}>
          <div className={styles.postHeader}>
            <img
              src={post.imgurl}
              alt="Profile Pic"
              className={styles.postImage}
            />
            <h2>{post.username}</h2>
            <p>{post.title}</p>
          </div>
          <div className={styles.postContent}>
            <p>{post.textcontent}</p>
          </div>
          {post.comments.length > 0 && (
            <div className={styles.commentsContainer}>
              <h2 className={styles.commentsHeading}>Comments</h2>
              {post.comments.map((comment) => (
                <div
                  key={comment.commentid}
                  className={styles.commentContainer}
                >
                  <img
                    src={comment.imgurl}
                    alt="Comment Image"
                    className={styles.commentImage}
                  />
                  <h3>{comment.commentusername}</h3>
                  <p>{comment.commenttextcontent}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ShowUserProfile;
