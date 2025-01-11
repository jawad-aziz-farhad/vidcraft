import { Alert } from 'react-native';
import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';

const config = {
    endPoint: 'https://cloud.appwrite.io/v1',
    projectId: '67753aba003444f2402f',
    platform: 'com.vidcraft.studio',
    databaseId: '677566fc00100726a14b',
    userCollectionId: '6775670b000c47c3d1f3',
    videoCollectionId: '677568a200017089c558',
    storageId: '67756ccc00182c9890e5'
}  

const { databaseId, userCollectionId, videoCollectionId, storageId } = config;

const client = new Client()
    .setProject(config.projectId)
    .setPlatform(config.platform)
    .setEndpoint(config.endPoint)
    

const account = new Account(client)
const databases = new Databases(client);
const avatars = new Avatars(client);
const storage = new Storage(client);

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
            databaseId,
            userCollectionId,
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

const signOut = async () => {
    try {
        const session = await account.deleteSession('current');
        return session;
    } catch (error) {
        console.error("Error logging in", error);
        Alert.alert(error.message)
        // throw error;
    }
}

const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) {
            throw new Error("No account found");
        }

        const user = await databases.listDocuments(databaseId, userCollectionId, [Query.equal('accountId', currentAccount.$id)])
        
        if (!user) {
            throw new Error("No user found");
        }
        
        return user.documents[0];
    } catch (error) {
        throw new Error('Error, No user found.')
    } 
}

const getPosts = async (customQuery) => {
    let query = [Query.limit(15), Query.orderDesc('$createdAt')];
    query = customQuery ? [...query, ...customQuery] : query
    try {
       const posts = await databases.listDocuments(databaseId, videoCollectionId, query)
       return posts.documents;  
    } catch (error) {
        throw new Error(error.message)
    }
}

const getFileView = async (fileId, fileType) => {
    
    try {
        let fileUrl;

        if (fileType.includes('image')) {
            fileUrl = await storage.getFilePreview(storageId, fileId, 2000, 2000, 'top', 100)
        } else if (fileType.includes('video')) {
            fileUrl = await storage.getFileView(storageId, fileId);
        } else {
            throw new Error('File Type not found.');
        }
        return fileUrl;
    } catch (error) {
     throw new Error(error);   
    }
}

const uploadFile = async (file, fileType) => {
    const { mimeType, ...rest } = file;
    const asset = { type: mimeType, ...rest };
    
    try {
        const uploadedFile = await storage.createFile(storageId, ID.unique(), asset);

        const fileUrl = await getFileView(uploadedFile.$id, fileType);
        
        return fileUrl;
    } catch (error) {
        console.error('ERROR', error)
        throw new Error(error)
    }
    
}

const createVideo = async (form) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video'),
        ]);

        const newVideo = await databases.createDocument(databaseId, videoCollectionId, ID.unique(), {
            ...form,
            thumbnail: thumbnailUrl,
            video: videoUrl,
        })

        return newVideo;

    } catch (error) {
        throw new Error('Oops! Video couldn\'t be uploaded.');
    }
}

export { account, createUser, createVideo, getCurrentUser, getPosts, signIn, signOut };

