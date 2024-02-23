"use client";

import { VideoPlayer } from "./video-player";
import { api } from "~/trpc/react";
import VideoDetailsLoadingSkeleton from "~/app/feed/[videoId]/loading";
import { VideoMetaFunctions } from "./video-meta-functions";

type VideoDetailsProps = {
  videoId: string;
};

export function VideoDetails({ videoId }: VideoDetailsProps) {
  const { data: video, isLoading } = api.video.getVideoDetails.useQuery({
    videoId: parseInt(videoId),
  });

  if (isLoading) return <VideoDetailsLoadingSkeleton />;

  return (
    <div className="mb-8 flex flex-col gap-4 rounded-md border">
      <h3 className="mx-4 mt-4 text-xl font-medium">{video?.title}</h3>

      <VideoPlayer
        cloudinaryUrl={video?.cloudinaryUrl}
        thumbnailUrl={video?.thumbnailUrl}
      />
      <VideoMetaFunctions video={video!} isVideoDetail />

      <div className="mx-4 mb-4">
        <p className="whitespace-pre-wrap text-sm">{video?.description}</p>
      </div>
    </div>
  );
}
