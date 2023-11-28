import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import SinglePostPage from "./features/posts/SInglePostPage";
import Layout from './components/Layout';
import { Routes, Route, Navigate } from "react-router-dom";
import EditPostForm from './features/posts/EditPostForm';
import { UserList } from "./features/users/UserList";
import UserPage from "./features/users/UserPage";

function App() {
  return (
    <Routes>
    <Route path="/" element={<Layout />}>

      <Route index element={<PostsList />} />

      <Route path="post">
        <Route index element={<AddPostForm />} />
        <Route path=":postId" element={<SinglePostPage />} />
        <Route path="edit/:postId" element={<EditPostForm />} />
      </Route>
      <Route path="user">
        <Route index element={<UserList/>} />
        <Route path=":userId" element={<UserPage />} />
        
      </Route>
      <Route path="*" element={<Navigate to='/' replace/>}/>
    </Route>
  </Routes>
  );
}

export default App;
