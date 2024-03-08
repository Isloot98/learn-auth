// import { currentUser } from "@clerk/nextjs";
// import { sql } from "@vercel/postgres";
// import { redirect } from "next/navigation";
// import { revalidatePath } from "next/cache";

// const SignUp = () => {
//   const setUserDetails = async () => {
//     "use server";
//     const user = await currentUser();
//     let username;
//     console.log(user);
//     if (user.username) {
//       username = user.username;
//     } else {
//       username = `${user.firstName} ${user.lastName}`;
//     }
//     const userId = user.id;

//     await sql`INSERT INTO users (user_id, username) VALUES (${userId}, ${username})`;
//     revalidatePath("/feed");
//     redirect("/feed");
//   };

//   return (
//     <div>
//       <h1>Welcome!</h1>
//       <form action={setUserDetails}>
//         <button type="submit">Go to Feed</button>
//       </form>
//     </div>
//   );
// };

// export default SignUp;
