import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import styles from "./page.module.css";
const inter = Inter({ subsets: ["latin"] });
import Image from "next/image";
import Nav from "../components/Nav";
import { ClerkProvider, currentUser } from "@clerk/nextjs";

export const metadata = {
  title: "Overwatch stats App",
  description: "An app that shows hero and player details from overwatch 2",
  openGraph: {
    title: "Overwatch stats App",
    description: "An app that shows hero and player details from overwatch 2",
    type: "website",
    url: "https://next-comments-postgres.vercel.app/",
    image:
      "https://xxboxnews.blob.core.windows.net/prod/sites/2/2022/10/OW2-be9287b234afbe7898ac.jpg",
  },
};

export default function RootLayout({ children }) {
  //   const fetchUserId = async () => {
  //     const user = await currentUser();
  //     const userId = user.id;
  //     return userId;
  //   };

  // const userId = fetchUserId();
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <header className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff90] text-black">
            {/* <Nav userId={userId} /> */}
          </header>
          {children}
          <footer className={styles.footer}>
            <a
              href="https://github.com/Isloot98"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/github.svg"
                alt="link to my github repo"
                width={30}
                height={30}
                className=" mb-4 ml-4"
              />
            </a>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
