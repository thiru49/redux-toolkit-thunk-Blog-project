import { useSelector} from "react-redux";
import { selectPostIds,useGetPostsQuery } from "./postsSlice";

import PostsExcept from "./PostsExcept";

const PostsList = () => {
 
  const {isLoading,isSuccess,isError,error} = useGetPostsQuery()

  const orderedPostsIds = useSelector(selectPostIds);
  
  
  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    
    content = orderedPostsIds.map((postId) => (
      <PostsExcept key={postId} postId={postId} />
    ));
  } else if (isError) {
    content = <p>{error && `Error: ${error}`}</p>;
  }

  return (
    <section>
      
      {content}
    </section>
  );
};

export default PostsList;
