import React from 'react'
import { useParams } from 'react-router-dom';
import {useSelector} from 'react-redux'
import {selectUserById } from './usersSlice';
import {  selectPostsByUser } from '../posts/postsSlice';
import { Link } from 'react-router-dom';
const UserPage = () => {
     const {userId} = useParams();
     const users = useSelector(state => selectUserById(state,userId))
     const PostsForUsers = useSelector(state=> selectPostsByUser(state,Number(userId)))
           
     const postTitle = PostsForUsers.map(post=>
          <li key={post.id}>
             <Link to={`/post/${post.id}`}>{post.title}</Link>
          </li>)

  return (
    <section>
     <h2>{users?.name}</h2>
     <ol>{postTitle}</ol>
    </section>
  )
}

export default UserPage