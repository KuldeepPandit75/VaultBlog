import React from 'react'
import { Box, FormControl, styled, Button, InputBase, TextareaAutosize } from '@mui/material'
import { useState, useEffect } from 'react'
import { AddCircle as Add } from '@mui/icons-material';
import { API } from '../../service/api';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';

const Container = styled(Box)`
    margin: 0 100px
`

const Image = styled("img")({
    height: "50vh",
    width: "100%",
    objectFit: "cover",
    objectPosition: "middle"
})

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`

const InputTextField = styled(InputBase)`
    flex:1;
    margin: 0 30px;
    font-size: 23px;
    font-weight: 600;
`

const TextArea = styled(TextareaAutosize)`
    width:100%;
    margin-top: 30px;
    font-size: 18px;
    border: none;
    &:focus-visible {
    outline: none;
    }
`
const initialPost = {
    title: "",
    description: "",
    picture: "",
    username: "",
    categories: "",
    createdDate: new Date()
}

function UpdatePost() {
    const [url,setUrl]=useState("");
    const {id}=useParams();
    const [postDet,setPostDet]=useState(initialPost)
    const [file,setFile]=useState("");
    const navigate=useNavigate();

    const onValueChange = (e) => {
        setPostDet({ ...postDet, [e.target.name]: e.target.value })
    }

    const updatePost=async()=>{
        const response= await API.updatePost(postDet);
        if(response.isSuccess){
            navigate(`/details/${postDet._id}`)
        }
    }
    
    useEffect(()=>{

        const fetchData=async()=>{

            const response= await API.getPostDetails(id);
            if(response.isSuccess){
                setPostDet(response.data);
                setUrl(response.data.picture)
            }
        };
        fetchData();
    },[])

    useEffect(()=>{
        const uploadImage=()=>{
            if(file){
                const formData=new FormData();
                formData.append("name",file.name);
                formData.append("file",file);

                const response=API.uploadFile(formData);
                if(response.isSuccess){
                    setUrl(response.data);
                    setPostDet(prevPost=>({...prevPost,picture:response.data}))
                }
            }
        };
        uploadImage();
    },[file])

    return (
        <>
            <Container>
                <Image src={url} />

                <StyledFormControl>
                    <label htmlFor='fileInput'>
                        <Add fontSize='large' color='action' />
                    </label>
                    <input id="fileInput" type='file' className='hidden' onChange={(e) => { setFile(e.target.files[0]) }} />

                    <InputTextField placeholder="Title" onChange={(e) => onValueChange(e)} name="title" value={postDet.title}/>
                    <Button variant="contained" onClick={() => updatePost()}>Update</Button>
                </StyledFormControl>

                <TextArea minRows={5} placeholder='Tell your story....' onChange={(e) => onValueChange(e)} name="description" value={postDet.description}/>
            </Container>
        </>
    )
}

export default UpdatePost