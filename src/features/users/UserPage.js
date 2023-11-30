import React from 'react'
import { useParams } from 'react-router-dom';
import {useSelector} from 'react-redux'
import {selectUserById } from './usersSlice';
import {useGetPostsByUserIDQuery } from '../posts/postsSlice';
import { Link } from 'react-router-dom';



const UserPage = () => {
    const {userId} = useParams();
    const users = useSelector(state => selectUserById(state,userId))
    
    const {data:PostsForUsers,
    isLoading,isSuccess,isError,error} = useGetPostsByUserIDQuery(userId)
           
    let content;
    if (isLoading){
      return content= <p>Loading...</p>
    }else if (isSuccess) {
      const {ids,entities}  = PostsForUsers;
      content = ids.map(id => (
        <li key={id}>
           <Link to={`/post/${id}`}>{entities[id].title}</Link>
        </li>
      ))
    }else if (isError) {
      content = <p>{error}</p>
    }

    

  return (
    <section>
     <h2>{users?.name}</h2>
     <ol>{content}</ol>
    </section>
  )
}

export default UserPage;