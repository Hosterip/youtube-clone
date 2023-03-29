import React from 'react';
import {Box, Stack} from "@mui/material";
import {ChannelCard, VideoCard} from "./index";

const Videos = ({videos, direction = 'row'}) => {
    return (
        <Stack direction={direction} flexWrap='wrap' justifyContent='center' gap={2}>
            {videos.map((item, idx) =>
                <Box key={idx}>
                    {item.id.videoId && <VideoCard video={item}/>}
                    {item.id.channelId && <ChannelCard channelDetail={item}/>}
                </Box>
            )}
        </Stack>
    );
};

export default Videos;