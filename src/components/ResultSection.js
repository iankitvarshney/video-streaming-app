import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  ChannelContent,
  PlaylistContent,
  ShimmerResultSection,
  VideoContent,
} from "./index";
import "../styles/ResultSection.css";

const ResultSection = () => {
  let { searchQuery } = useParams();
  searchQuery = searchQuery.replace(" ", "%20");

  let prevSearchQuery = useRef("");

  const [resultData, setResultData] = useState([]);
  const [pageToken, setPageToken] = useState("");

  const nextPageToken =
    searchQuery === prevSearchQuery.current ? pageToken : "";

  const API_URL =
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${searchQuery}&key=${process.env.API_KEY}` +
    (nextPageToken && `&pageToken=${nextPageToken}`);

  useEffect(() => {
    getSearchResult();
  }, [searchQuery]);

  useEffect(() => {
    prevSearchQuery.current = searchQuery;
  }, [resultData]);

  async function getSearchResult() {
    const response = await fetch(API_URL);
    const json = await response.json();
    prevSearchQuery.current === searchQuery
      ? setResultData([...resultData, ...json?.items])
      : setResultData([...json?.items]);
    json?.nextPageToken ? setPageToken(json?.nextPageToken) : setPageToken("");
  }

  if (!resultData.length) return <ShimmerResultSection />;

  return (
    <div className="result-section">
      <InfiniteScroll
        dataLength={resultData.length}
        next={getSearchResult}
        hasMore={pageToken && resultData.length < 300}
        loader={<h4>Loading..</h4>}
        className="result-section"
      >
        {resultData.map((item, index) => {
          if (item?.id?.kind === "youtube#channel") {
            return (
              <Link
                to={"/channel/" + item?.id?.channelId}
                key={item?.etag + index}
              >
                <ChannelContent channel={item} />
              </Link>
            );
          } else if (item?.id?.kind === "youtube#playlist") {
            return (
              <Link
                to={"/playlist/" + item?.id?.playlistId}
                key={item?.etag + index}
              >
                <PlaylistContent playlist={item} />
              </Link>
            );
          } else if (item?.id?.kind === "youtube#video") {
            return (
              <Link key={item?.etag + index} to={"/watch/" + item?.id?.videoId}>
                <VideoContent video={item} />
              </Link>
            );
          } else {
            return null;
          }
        })}
      </InfiniteScroll>
    </div>
  );
};

export default ResultSection;
