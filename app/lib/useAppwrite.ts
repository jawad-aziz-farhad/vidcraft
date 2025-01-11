import { useEffect, useState } from "react";
import { Models } from "react-native-appwrite";

const useAppwrite = (fn: Function) => {
  
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Models.Document[] | []>([]);

  const fetchPosts = async () => {
    try {
    setIsLoading(true);
    const response = await fn();
    setPosts(response);
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, isLoading, setIsLoading, setPosts, refresh: fetchPosts  }
}

export default useAppwrite;