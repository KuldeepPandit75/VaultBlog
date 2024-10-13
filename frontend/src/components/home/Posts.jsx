import React, { useEffect, useState } from 'react'
import { API } from '../../service/api';
import Post from './Post';
import { Link, useSearchParams } from 'react-router-dom';


function Posts() {

    const [posts, setPosts] = useState([])

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category')

    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getAllPosts({ category: category || "" })
            if (response.isSuccess) {
                setPosts(response.data)
            }
        }
        fetchData();
    }, [category])

    return (
        <>
            {
                posts && posts.length > 0 ? posts.map(post => (
                    <Link to={`/details/${post._id}`} key={post.picture}>
                        <Post post={post}  />
                    </Link>
                ))
                    :
                    <div>No Data to show</div>
            }
        </>
    )
}

export default Posts