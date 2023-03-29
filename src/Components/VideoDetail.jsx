import React, {useEffect, useState} from 'react';
import {Box, CircularProgress, Stack, Typography} from "@mui/material";
import ReactPlayer from "react-player";
import {Link, useParams} from "react-router-dom";
import {fetchFromAPI} from "../API/fetchFromAPI";
import {CheckCircle} from "@mui/icons-material";
import {Videos} from "./index";

const VideoDetail = () => {
    const [videoDetail, setVideoDetail] = useState({})
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [videos, setVideos] = useState([])
    const {id} = useParams()

    useEffect(() => {
        setLoading(true)
        fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
            .then(data => setVideoDetail(data.items[0]))
            .catch(e => setError('Page not founded'))

        fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
            .then(data => setVideos(data.items))
            .catch(e => setError('Page not founded'))
            .finally(() => setLoading(false))
    }, [id])

    console.log(videoDetail)

    if (loading || !videoDetail?.snippet) {
        return (
            <Box minHeight='95vh'  sx={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CircularProgress/>
            </Box>
        )
    }

    if (error) {
        return (
            <Box minHeight='95vh' sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <h1>{error}</h1>
            </Box>
        )
    }
    const {snippet: {title, channelId, channelTitle}, statistics: {viewCount, likeCount}} = videoDetail

    return (
        <Box minHeight='95vh'>
            <Stack direction={{xs: 'column', md: 'row'}}>
                <Box flex={1}>
                    <Box sx={{width: '100%', position: 'sticky', top: '86px'}}>
                        <ReactPlayer className='react-player' controls url={`https://www.youtube.com/watch?v=${id}`}/>
                        <Typography color='#FFF' variant='h5' fontWeight='bold' p={2}>
                            {title}
                        </Typography>
                        <Stack direction='row' justifyContent={'space-between'} sx={{color: '#fff'}} py={1} px={2}>
                            <Link to={`channel/${channelId}`}>
                                <Typography variant='subtitle1' color='#fff'>
                                    {channelTitle}
                                    <CheckCircle sx={{fontSize: '12px', color: 'gray', ml: '5px'}}/>
                                </Typography>
                            </Link>
                            <Stack direction='row' gap='20px' alignItems='center'>
                                <Typography variant={'body1'} sx={{opacity: 0.7}}>
                                    {parseInt(viewCount).toLocaleString()} views
                                </Typography>
                                <Typography variant={'body1'} sx={{opacity: 0.7}}>
                                    {parseInt(likeCount).toLocaleString()} likes
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
                <Box px={2} py={{md: 1, xs: 5}} justifyContent='center' alignItems='center'>
                    <Videos videos={videos} direction='column'/>
                </Box>
            </Stack>
        </Box>
    )
};

export default VideoDetail;