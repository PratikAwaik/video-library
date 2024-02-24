import { VideoPlayer } from "./video-player";
import { api } from "~/trpc/server";
import { VideoMetaFunctions } from "./video-meta-functions";
import { cookieService } from "~/lib/storage";

type VideoDetailsProps = {
  videoId: string;
};

const MACHINE_ID = cookieService.getValue("machine-id");

export async function VideoDetails({ videoId }: VideoDetailsProps) {
  const video = await api.video.getVideoDetails.query({
    videoId: parseInt(videoId),
    machineId: MACHINE_ID,
  });

  return (
    <div className="mb-8 flex flex-col gap-4 rounded-md border">
      <VideoPlayer
        cloudinaryUrl={video?.cloudinaryUrl}
        thumbnailUrl={video?.thumbnailUrl}
      />
      <VideoMetaFunctions video={video} isVideoDetail machineId={MACHINE_ID} />
      <div className="mx-4 mb-4 flex flex-col gap-4">
        <h3 className="text-2xl font-medium">{video?.title}</h3>
        <p className="whitespace-pre-wrap text-sm">{video?.description}</p>
      </div>
    </div>
  );
}
