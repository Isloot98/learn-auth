import { SignUp, SignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import styles from "./page.module.css";

export default function Homepage() {
  return (
    <div>
      <SignedOut>
        <p>Sign in or sign up to begin</p>
        <div>
          <SignIn />
          <SignUp />
        </div>
      </SignedOut>
      <SignedIn>
        <div className={styles.div}>
          <div className={styles.welcomeDiv}>
            <p>Welcome back! You are signed in.</p>
            <img
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWszY2hueXc5ZjAzejg2YWgxMnJjNnd2b3I3eTFweDlwMjE1Z3RtayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/XD9o33QG9BoMis7iM4/giphy.gif"
              alt="Welcome GIF"
            />
            <img
              src="https://media.giphy.com/media/rDeYzCwoZlvclPUhf9/giphy.gif?cid=ecf05e47kll63hvpl2xnhon6suoyvk2zu6ujveikd2whytzm&ep=v1_gifs_search&rid=giphy.gif&ct=g"
              alt="Welcome GIF"
            />
          </div>
        </div>
      </SignedIn>
    </div>
  );
}
