import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import styles from "./nav.module.css";

const Nav = async ({ userId }) => {
  const user = await userId;
  return (
    <nav className={styles.mainNav}>
      <Link href={"/"} className={styles.links}>
        Home
      </Link>
      <br />
      <Link href={"/feed"} className={styles.links}>
        Feed
      </Link>
      <br />
      <Link href={`/profile/${user}`}>Profile</Link>
      <UserButton />
    </nav>
  );
};
export default Nav;
