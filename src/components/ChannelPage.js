import { useParams } from "react-router-dom";
import useChannelData from "../utils/useChannelData";
import { SubscribeButton, PlaylistCard } from "./index";
import useChannelPlaylist from "../utils/useChannelPlaylist";

const ChannelPage = () => {
  const { channelId } = useParams();

  const {
    id,
    customUrl,
    description,
    publishedAt,
    thumbnailSrc,
    title,
    subscriberCount,
    videoCount,
    viewCount,
  } = useChannelData(channelId);

  const channelPlaylist = useChannelPlaylist(channelId);

  if (!id) return null;

  return (
    <div className="channel-page">
      <div className="channel-details">
        <div className="channel-thumbnail">
          <div className="channel-thumbnail-image">
            <img src={thumbnailSrc} />
          </div>
        </div>
        <div className="channel-info">
          <h1 className="channel-title">{title}</h1>
          <div className="channel-stats">
            <p>{customUrl}</p>
            <p>{subscriberCount} subscribers</p>
            <p>{videoCount} videos</p>
          </div>
          <p className="channel-description">{description}</p>
        </div>
        <SubscribeButton />
      </div>
      <div className="playlist-details">
        {channelPlaylist?.map((playlist) => (
          <PlaylistCard key={playlist?.id} playlist={playlist} />
        ))}
      </div>
    </div>
  );
};

export default ChannelPage;