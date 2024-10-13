import { Box, FormControl, styled, Button, InputBase, TextareaAutosize } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { AddCircle as Add } from '@mui/icons-material';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { API } from '../../service/api';
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

function CreatePost() {

    const navigate=useNavigate();

    const [url,setUrl]=useState("/createpost2.jpg");

    const [post, setPost] = useState(initialPost);
    const [file,setFile]=useState("");

    const userData=useSelector(state=>state.user);

    const location=useLocation();

    const onValueChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }

    const savePost= async()=>{
        console.log(post)
        const response= await API.createPost(post);
        if(response.isSuccess){
            navigate("/")
        }
    }

    useEffect(() => {
        const uploadImage = async () => {
            if (file) {
                const formData = new FormData();
                formData.append("name", file.name);
                formData.append("file", file); // Append the selected file
    
                try {
                    let imageURL = await API.uploadFile(formData);
    
                    if (imageURL.isSuccess) {
                        setUrl(imageURL.data);
                        setPost(prevPost => ({ ...prevPost, picture: imageURL.data })); // Set picture path in post
                    } else {
                        console.error("Error uploading image");
                    }
                } catch (error) {
                    console.error("Image upload failed: ", error);
                }
            }
        }
        uploadImage(); // Call the upload function immediately

        setPost(prevPost => ({ ...prevPost, categories: location.search?.split("=")[1] || "All" }));
        setPost(prevPost => ({ ...prevPost, username: userData.username }));
    }, [location.search, userData.username, file]);


    return (
        <>
            <Container>
                <Image src={url} />

                <StyledFormControl>
                    <label htmlFor='fileInput'>
                        <Add fontSize='large' color='action' />
                    </label>
                    <input id="fileInput" type='file' className='hidden' onChange={(e)=>{setFile(e.target.files[0])}}/>

                    <InputTextField placeholder="Title" onChange={(e) => onValueChange(e)} name="title" />
                    <Button variant="contained" onClick={()=>savePost()}>Publish</Button>
                </StyledFormControl>

                <TextArea minRows={5} placeholder='Tell your story....' onChange={(e) => onValueChange(e)} name="description" />
            </Container>
        </>
    )
}

export default CreatePost