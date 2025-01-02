import { Alert } from 'react-native';
import { Account, Avatars, Client, Databases, ID } from 'react-native-appwrite';

const config = {
    endPoint: 'https://cloud.appwrite.io/v1',
    projectId: '67753aba003444f2402f',
    platform: 'com.vidcraft.studio',
    databaseId: '677566fc00100726a14b',
    userCollectionId: '6775670b000c47c3d1f3',
    videoCollectionId: '677568a200017089c558',
    filesBucketId: '67756ccc00182c9890e5'
}    

const client = new Client()
    .setProject(config.projectId)
    .setPlatform(config.platform)
    .setEndpoint(config.endPoint)
    

const account = new Account(client)
const databases = new Databases(client);
const avatars = new Avatars(client);

const createUser = async (email, password, name) => {
    try {
        const newAccount = await account.create(
          ID.unique(),
          email,
          password,
          name
        );
        
        if (!newAccount) {
          throw new Error("Account not created");
        }

        const avatarUrl = avatars.getInitials();

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: name,
                avatar: avatarUrl
            }
        )
        return newUser;
        
      } catch (error) {
        console.error("Error signing up", error);
        Alert.alert(error.message);
        // throw new Error(error);
      }
}

const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session;
    } catch (error) {
        console.error("Error logging in", error);
        Alert.alert(error.message)
        // throw error;
    }
}

export { account, createUser, signIn }

