import React from "react";
import { FaYoutube } from "react-icons/fa";
import getYouTubeId from "get-youtube-id";
import YouTube from "react-youtube";

const Preview = ({ value }) => {
  const { url } = value;
  const id = getYouTubeId(url);
  return (
    <div>
      <p>{url}</p>
      <YouTube opts={{ height: "180", width: "300" }} videoId={id} />
    </div>
  );
};

export default {
  name: "youtube",
  type: "object",
  icon: FaYoutube,
  title: "YouTube Embed",
  fields: [
    {
      name: "url",
      type: "url",
      title: "YouTube video URL",
    },
  ],
  preview: {
    select: {
      url: "url",
    },
  },
  components: { preview: Preview },
};
