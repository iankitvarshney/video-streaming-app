import {
  getDuration,
  getPublishTime,
  getThumbnailSrc,
  getCount,
} from "../utils/helper";
import useChannelData from "../utils/useChannelData";
import { VideoWrapper } from "./index";
import "../styles/VideoHomePage.css";

const VideoHomePage = ({ video }) => {
  const id = video?.id; // string
  const caption = video?.contentDetails?.caption; // string(boolean)
  const duration = getDuration(video?.contentDetails?.duration); // string
  const licensedContent = video?.contentDetails?.licensedContent; // boolean
  const channelId = video?.snippet?.channelId; // string
  const channelTitle = video?.snippet?.channelTitle; // string
  const description = video?.snippet?.description; // string
  const liveBroadcastContent = video?.snippet?.liveBroadcastContent; // string
  const publishedAt = getPublishTime(video?.snippet?.publishedAt); // string(date)
  const tags = video?.snippet?.tags; // array(strings)
  const thumbnailSrc = getThumbnailSrc(video?.snippet?.thumbnails);
  const title = video?.snippet?.title; // string
  const commentCount = getCount(video?.statistics?.commentCount); // string(number)
  const favoriteCount = getCount(video?.statistics?.favoriteCount); // string(number)
  const likeCount = getCount(video?.statistics?.likeCount); // string(number)
  const viewCount = getCount(video?.statistics?.viewCount); // string(number)

  const { thumbnailSrc: channelThumbnailSrc } = useChannelData(channelId);

  if (!channelThumbnailSrc) return null;

  return (
    <div className="video-home-page">
      <VideoWrapper
        id={id}
        thumbnailSrc={thumbnailSrc}
        duration={duration}
        channelThumbnailSrc={channelThumbnailSrc}
        title={title}
        channelTitle={channelTitle}
        viewCount={viewCount}
        publishedAt={publishedAt}
        description={description}
      />
    </div>
  );
};

export default VideoHomePage;
