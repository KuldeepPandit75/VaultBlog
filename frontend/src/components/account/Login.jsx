import { Box, TextField, Button, styled, Typography } from "@mui/material"
import "@fontsource/poppins";
import { useEffect, useState } from "react";
import { API } from "../../service/api";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/blog/blogSlice";
import { useNavigate } from "react-router";

const Component = styled(Box)`
    overflow: hidden;
    height: 100vh;
    display: flex;
    background-color: #FAFFFD;
    margin: 0;
    font-family: Poppins;
    color: #C05746;
`

const ImageBox = styled(Box)`
    width: 35vw;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0 20px 20px 0;
    background-color: #342E37;
    box-shadow: 0 0 25px black;
`

const Image = styled("img")({
    width: 450
})

const Wrapper = styled(Box)`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > div {
        margin-top: 20px;
    }
    
`

const Butn = styled(Button)`
    background-color: #C05746;
    font-weight: 600;
    margin-top: 40px;
`

const Title = styled(Typography)`
    font-weight: 600;
    margin-bottom: 20px;    
    text-align: center;
`

const signupInitialValues={
    name:"",
    username:"",
    password:""
}

const loginInitialValues={
    username:"",
    password:""
}

function Login(props) {
    const [page, setPage] = useState("login")
    const [signup, setSignup]=useState(signupInitialValues);
    const [error,setError]=useState("");
    const [login,setLogin]=useState(loginInitialValues);
    const dispatch=useDispatch();

    const navigate= useNavigate();

    const togglePage=()=>{
        if(page==="login"){
            setPage("signup")
        }else{
            setPage("login")
        }
    }

    const onInputChange=(e)=>{
        setSignup({...signup,[e.target.name]:e.target.value})
    }

    const signUpUser=async()=>{
        let response = await API.userSignup(signup);
        
        if(response.isSuccess){
            setError("");
            setSignup(signupInitialValues);
            togglePage("login");
        }else{
            setError("Something went wrong! Please try again.")
        }
    }

    const onValueChange=(e)=>{
        setLogin({...login,[e.target.name]: e.target.value})
    }

    const loginUser=async()=>{
        let res=await API.userLogin(login);
        if(res.isSuccess){
            setError("");
            setLogin(loginInitialValues);

            sessionStorage.setItem("accessToken", `Bearer ${res.data.accessToken}`);

            dispatch(setUser(res.data));

            props.isUserAuthenticated(true);

            navigate("/");
        }else{
            setError("Unable to login")
        }
    }

// Testing whether data is updating on redux or not

////////////////
    // const test=useSelector((state)=> state.user);
    
    // useEffect(()=>{
    //     console.log(test);
    // },[login])
////////////////

    return (
        <Component>
            <ImageBox>
                <Image src="./Login.svg" />
            </ImageBox>
            {page === "login" ?
                <Wrapper>
                    <Title variant="h3">Welcome Back to VaultBlog!</Title>
                    <TextField label="Enter Username" onChange={(e)=>onValueChange(e)} name="username"/>
                    <TextField label="Enter Password" onChange={(e)=>onValueChange(e)} name="password"/>
                    {error && <Typography>{error}</Typography>}
                    <Butn variant="contained" onClick={()=>loginUser()}>Login</Butn>
                    <Typography style={{ marginTop: "10px" }}>New to VaultBlog? <a href="#" onClick={()=>togglePage()} style={{ textDecoration: "none" }}>Signup!</a></Typography>
                </Wrapper>
                :
                <Wrapper>
                    <Title variant="h3">Welcome to VaultBlog!</Title>
                    <TextField onChange={(e)=>onInputChange(e)} name="name" label="Enter Name" />
                    <TextField onChange={(e)=>onInputChange(e)} name="username" label="Enter Username" />
                    <TextField onChange={(e)=>onInputChange(e)} name="password" label="Set Password" />
                    {error && <Typography>{error}</Typography>}
                    <Butn variant="contained" onClick={()=>signUpUser()}>SignUp</Butn>
                    <Typography style={{ marginTop: "10px" }}>Already have an Account? <a href="#" onClick={()=>togglePage()} style={{ textDecoration: "none" }}>Login!</a></Typography>
                </Wrapper>
            }
        </Component>
    )
}

export default Login