import { Box, FormControl, styled, Button, InputBase, TextareaAutosize } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { AddCircle as Add } from '@mui/icons-material';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { API } from '../../service/api';

const Container = styled(Box)`
    margin: 0 100px
`

const Image = styled("img")({
    height: "50vh",
    width: "100%",
    objectFit: "cover",
    objectPosition: "top"
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

    const [url,setUrl]=useState("/createpost2.jpg");

    const [post, setPost] = useState(initialPost);
    const [file,setFile]=useState("");

    const userData=useSelector(state=>state.user);

    const location=useLocation();

    const onValueChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }

    const uploadImage = async (selectedFile) => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append("name", selectedFile.name);
            formData.append("file", selectedFile); // Append the selected file

            try {
                let imageURL = await API.uploadFile(formData);

                if (imageURL.isSuccess) {
                    setUrl(imageURL.data.url);
                    setPost(prevPost => ({ ...prevPost, picture: imageURL.data.path })); // Set picture path in post
                } else {
                    console.error("Error uploading image");
                }
            } catch (error) {
                console.error("Image upload failed: ", error);
            }
        }
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile); // Update the file state
        uploadImage(selectedFile); // Call the upload function immediately
    }

    useEffect(() => {
        post.categories = location.search?.split("=")[1] || "All";
        post.username = userData.username;
    }, [location.search, userData.username]);


    return (
        <>
            <Container>
                <Image src={url} />

                <StyledFormControl>
                    <label htmlFor='fileInput'>
                        <Add fontSize='large' color='action' />
                    </label>
                    <input id="fileInput" type='file' className='hidden' onChange={(e)=>handleFileChange(e)}/>

                    <InputTextField placeholder="Title" onChange={(e) => onValueChange(e)} name="title" />
                    <Button variant="contained">Publish</Button>
                </StyledFormControl>

                <TextArea minRows={5} placeholder='Tell your story....' onChange={(e) => onValueChange(e)} name="description" />
            </Container>
        </>
    )
}

export default CreatePost