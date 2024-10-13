import React from 'react'
import Banner from '../banner/Banner'
import Categories from './Categories'
import { Grid, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import Posts from './Posts'
import { styled, Box } from '@mui/material';


const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    margin: 30px;
    width: 100%;
`

function Home() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category")

  return (
    <>
      <Banner />
      <Grid container>
        <Grid item xs={12} lg={2} sm={2}>
          <Categories />
        </Grid>
        <Grid container item xs={12} sm={10} lg={10}>
          <Container>

            <Posts />
          </Container>
        </Grid>
      </Grid>
      <div className="createBlogBtn fixed bottom-5 right-5">
        <Link to={`/create?category=${category || "All"}`}>
          <Button variant="contained">Create Blog</Button>
        </Link>
      </div>
    </>
  )
}

export default Home