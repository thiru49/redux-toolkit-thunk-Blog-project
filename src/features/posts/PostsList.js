import { useSelector} from "react-redux";
import { selectPostIds, getPostsError, getPostsStatus } from "./postsSlice";

import PostsExcept from "./PostsExcept";

const PostsList = () => {
 

  const orderedPostsIds = useSelector(selectPostIds);
  
  const postsStatus = useSelector(getPostsStatus);
  const err = useSelector(getPostsError);



  let content;
  if (postsStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (postsStatus === 'succeeded') {
    
    content = orderedPostsIds.map((postId) => (
      <PostsExcept key={postId} postId={postId} />
    ));
  } else if (postsStatus === 'failed') {
    content = <p>{err && `Error: ${err}`}</p>;
  }

  return (
    <section>
      
      {content}
    </section>
  );
};

export default PostsList;
