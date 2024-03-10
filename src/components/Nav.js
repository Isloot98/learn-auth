import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import styles from "./nav.module.css";

const Nav = async ({ userId }) => {
  const user = await userId;
  return (
    <nav className={styles.mainNav}>
      <UserButton />

      <Link href={"/"} className={styles.links}>
        Home
      </Link>
      <br />
      <Link href={"/feed"} className={styles.links}>
        Feed
      </Link>
      <br />
      <Link href={`/profile/${user}`} className={styles.profileLink}>
        Profile
      </Link>

      <Link href={`/friends`} className={styles.profileLink}>
        Friends
      </Link>
    </nav>
  );
};
export default Nav;
