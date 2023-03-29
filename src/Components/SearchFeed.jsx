import React, {useEffect, useState} from 'react';
import {Box, CircularProgress, Typography} from "@mui/material";
import {Videos} from "./index";
import {fetchFromAPI} from "../API/fetchFromAPI";
import {useParams} from "react-router-dom";

const SearchFeed = () => {
    const [loading, setLoading] = useState(true)
    const [videos, setVideos] = useState([])
    const { searchItem } = useParams()

    useEffect(() => {
        setLoading(true)
        fetchFromAPI(`search?part=snippet&q=${searchItem}`)
            .then(data => setVideos(data.items))
            .catch(e => console.log(e))
            .finally(() => setLoading(false))
    }, [searchItem])


    return (
        <Box p={2} sx={{overflowY: 'auto', height: '90vh', flex: 2}}>
            <Typography variant='h4' fontWeight='bold' mb={2} sx={{color: 'white'}}>
                Search Results for: <span style={{color: '#F31503'}}>{searchItem}</span> videos
            </Typography>
            {loading
                ?
                <Box sx={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <CircularProgress/>
                </Box>
                :
                <Videos videos={videos}/>
            }
        </Box>
    );
};

export default SearchFeed;