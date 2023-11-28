import { useSelector} from "react-redux";
import { selectAllPosts, getPostsError, getPostsStatus } from "./postsSlice";

import PostsExcept from "./PostsExcept";

const PostsList = () => {
 

  const posts = useSelector(selectAllPosts);
  console.log(posts)
  const postsStatus = useSelector(getPostsStatus);
  const err = useSelector(getPostsError);



  let content;
  if (postsStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (postsStatus === 'succeeded') {
    const orderedPosts = posts.slice().sort((a,b)=> b.date.localeCompare(a.date))
    content = orderedPosts.map((post) => (
      <PostsExcept key={post.id} post={post} />
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
