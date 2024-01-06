import { INewUser } from "@/types";
import { account, avatars, databases } from "./config";
import { ID } from "appwrite";
import { error } from "console";

// crate an user anywhere using this fucntion get user data as parameter
export async function CreateUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw error;
    // get user name as avatar url using avatar servies get initials
    const avatarUrl = avatars.getInitials(user.name);
    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      email: newAccount.email,
      name: newAccount.name,
      username: user.username,
      imageUrl: avatarUrl,
    });
    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  username?: string;
}) {
  try {
    const newUser = await databases.createDocument(
      "659855472e78157f2c03",
      "659855ed581dc3b7ab6d",
      ID.unique(),
      user
    );
    return newUser;
  } catch (error) {
    console.log(error);
  }
}
