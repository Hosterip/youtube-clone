import React, {useMemo, useState} from 'react';
import {Box, CircularProgress, Stack, Typography} from "@mui/material";
import {Sidebar, Videos} from "./index";
import {fetchFromAPI} from "../API/fetchFromAPI";

const Feed = () => {
    const [loading, setLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState('New')
    const [videos, setVideos] = useState([])
    const sidebarClick = (name) => {
        setSelectedCategory(name)
    }

    useMemo(() => {
        setLoading(true)
        fetchFromAPI(`search?part=snippet&q=${selectedCategory}`)
            .then(data => setVideos(data.items))
            .catch(e => console.log(e))
            .finally(() => setLoading(false))
    }, [selectedCategory])

    return (
        <Stack sx={{ flexDirection: { sx: 'column', md: 'row'}}}>
            <Box sx={{height: {sx: 'auto', md: '92vh'}, borderRight: '1px solid #3d3d3d', px: {sx: 0, md: 2} }}>
                <Sidebar selectedCategory={selectedCategory} click={sidebarClick}/>
                <Typography className='copyright' variant='body2' sx={{ mt: 1.5, color:'#fff' }}>
                    Copyright 2022 Hosterip
                </Typography>
            </Box>
            <Box p={2} sx={{overflowY: 'auto', height: '90vh', flex: 2}}>
                <Typography variant='h4' fontWeight='bold' mb={2} sx={{color: 'white'}}>
                    <span>{selectedCategory} </span>
                    <span style={{color: '#F31503'}}>videos</span>
                </Typography>
                {loading
                    ?
                    <Box sx={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <CircularProgress />
                    </Box>
                    :
                    <Videos videos={videos}/>
                }
            </Box>
        </Stack>
    );
};

export default Feed;