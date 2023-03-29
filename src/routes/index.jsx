import {channelIdPath, feedPath, searchItemPath, videoIdPath} from './paths'
import Feed from "../Components/Feed";
import ChannelDetail from "../Components/ChannelDetail";
import VideoDetail from "../Components/VideoDetail";
import SearchFeed from "../Components/SearchFeed";
import {Navigate} from "react-router-dom";

export const routes = [
    {
        exact: true,
        path: feedPath,
        element: <Feed/>
    },
    {
        path: channelIdPath,
        element: <ChannelDetail/>
    },
    {
        path: videoIdPath,
        element: <VideoDetail/>
    },
    {
        path: searchItemPath,
        element: <SearchFeed/>
    },
    {
        path: '*',
        element: <Navigate to={feedPath}/>
    },
]