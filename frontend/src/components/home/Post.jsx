import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { styled, Box, Grid } from '@mui/material';

const CardContainer = styled(Card)`
    margin-bottom: 30px;
`

const Image = styled(CardMedia)`
`

const Content = styled(CardActionArea)`
    display: flex;
    justify-content: flex-start;
`

const ImagePart = styled(Box)`
    display:flex;
    flex-direction: column;
    justify-content: center;
`

const InfoPart = styled(CardContent)`
    padding: 0 0 0 20px;
    word-break: break-word;
`

function Post({ post }) {

    const headingLimiter=(str)=>{
        if(str.length>30){
            return str.slice(0,30)+"..."
        }else{
            return str
        }
    }
    const descriptionLimiter=(str)=>{
        if(str.length>100){
            return str.slice(0,100)+"..."
        }else{
            return str
        }
    }

    return (
        <CardContainer sx={{ maxHeight: 200 }}>
            <Content>
                <Grid container>
                    <Grid item lg={2} sm={2} sx={{display:'flex',justifyContent:"center", maxHeight:"100px"}}>
                        <ImagePart >

                            <Image
                                component="img"
                                sx={{
                                    height:"80%",
                                    width:"100%",
                                    objectFit: "contain",
                                    borderRadius: "5px 5px 5px 5px",
                                    marginTop:1,
                                }}
                                image={post.picture}
                                alt="green iguana"
                            />
                            <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: "center" }}>
                                {post.categories}
                            </Typography>
                        </ImagePart>
                    </Grid>
                    <Grid item lg={10} sm={10}>
                        <InfoPart>
                            <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 600 }}>
                                {headingLimiter(post.title)}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.primary' }}>
                                {descriptionLimiter(post.description)}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Uploaded by- {post.username}
                            </Typography>

                        </InfoPart>
                    </Grid>
                </Grid>


            </Content>
        </CardContainer>

    )
}

export default Post