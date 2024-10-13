import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { API } from '../../service/api';
import { Box, styled, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';

const Image = styled("img")({
    height: 350,
    margin: "auto"
})

const PostBasicInfo = styled(Box)`
    color: #878787;
    display:flex;
    margin: 0 40px 0 40px;
`

const Heading = styled(Typography)`
    font-weight: 900;
    text-align: center;
    font-size: 35px;
    margin: 20px 30px 0 30px;
    word-break: break-word;
`

const Description = styled(Typography)`
    font-size: 20px;
    margin: 20px 50px 0 50px;
    word-break:break-word;
`

const Edit = styled(EditIcon)`
    border: 1.5px solid rgba(0,0,0,0.6);
    border-radius: 4px;
    height: 30px;
    width: 30px;
    padding: 2px;
    margin: 0 10px 0 0
`
const Delete = styled(DeleteIcon)`
    border: 1.5px solid rgba(0,0,0,0.6);
    border-radius: 4px;
    height: 30px;
    width: 30px;
    padding: 2px;
    margin: 0 10px 0 0
`

function DetailView() {
    const { id } = useParams();
    const [postDetails, setPostDetails] = useState({})

    const user = useSelector(state => state.user);

    const deletePost=async()=>{
        await API.deletePost(id)
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await API.getPostDetails(id);
            if (response.isSuccess) {
                setPostDetails(response.data);
            }
        };
        fetchData();
    }, [])

    return (
        <>
            <Image src={postDetails.picture} />

            {user.username === postDetails.username &&
                <Box style={{ float: "right" }}>
                    <Link to={`/post/${postDetails._id}/update`}>
                        <Edit color='primary' />
                    </Link>
                    <Link to={`/`} onClick={deletePost}>
                        <Delete color='error' />
                    </Link>
                </Box>
            }


            <Heading>
                {postDetails.title}
            </Heading>

            <PostBasicInfo>
                <Typography sx={{ fontSize: 18 }}>
                    Uploaded By- <Box component="span" sx={{ fontWeight: 900 }}>{postDetails.username}</Box>
                </Typography>
                <Typography sx={{ marginLeft: "auto", fontSize: 18 }}>
                    {new Date(postDetails.createdDate).toDateString()}
                </Typography>
            </PostBasicInfo>
            <Description>
                {postDetails.description}
            </Description>
        </>
    )
}

export default DetailView