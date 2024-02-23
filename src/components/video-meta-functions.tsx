import { type Like, type View, type Video } from "@prisma/client";
import { v4 } from "uuid";
import StorageService from "~/lib/storage";
import { cn } from "~/lib/utils";
import { api } from "~/trpc/react";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { HeartIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useEffect, useMemo } from "react";

type VideoMetaFunctionsProps = {
  video: { likes: Like[] } & { views: View[] } & Video;
  isVideoDetail?: boolean;
};

export function VideoMetaFunctions({
  video,
  isVideoDetail = false,
}: VideoMetaFunctionsProps) {
  const utils = api.useUtils();
  const { mutate: updateLikeMutate, isLoading: isLiking } =
    api.video.updateLikes.useMutation({
      onSuccess: async () => {
        await refetchData();
      },
    });

  const { mutate: updateViewMutate } = api.video.updateViews.useMutation({
    onSuccess: async () => {
      await refetchData();
    },
  });

  const hasUserLiked = useMemo(() => {
    const machineId = StorageService.getItem("vidext-machine-id");
    if (!machineId) return false;
    return !!video?.likes.find((like) => like.machineId === machineId)?.id;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video?.id, video?.likesCount]);

  const hasUserViewed = useMemo(() => {
    const machineId = StorageService.getItem("vidext-machine-id");
    if (!machineId) return false;
    return !!video?.views.find((view) => view.machineId === machineId)?.id;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video?.id, video?.viewsCount]);

  useEffect(() => {
    if (isVideoDetail && video?.id && !hasUserViewed) {
      handleViews();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video?.id, hasUserViewed]);

  const handleViews = () => {
    const machineId = StorageService.getItem("vidext-machine-id");
    const newMachineId = v4();
    if (!machineId) {
      StorageService.setItem("vidext-machine-id", newMachineId);
    }

    updateViewMutate({
      machineId: machineId ? machineId : newMachineId,
      videoId: video.id,
    });
  };

  async function refetchData() {
    await utils.video.getVideos.invalidate();
    await utils.video.getVideoDetails.invalidate({
      videoId: video.id,
    });
  }

  const toggleLike = () => {
    const machineId = StorageService.getItem("vidext-machine-id");
    const newMachineId = v4();
    if (!machineId) {
      StorageService.setItem("vidext-machine-id", newMachineId);
    }

    updateLikeMutate({
      machineId: machineId ? machineId : newMachineId,
      videoId: video.id,
    });
  };

  return (
    <div className={cn("flex items-center gap-4", isVideoDetail && "mx-4")}>
      <div
        className={cn(
          "flex items-center gap-1",
          isLiking && "pointer-events-none",
        )}
      >
        {hasUserLiked ? (
          <HeartIconSolid
            className="h-5 w-5 cursor-pointer text-red-600"
            onClick={toggleLike}
          />
        ) : (
          <HeartIcon className="h-5 w-5 cursor-pointer" onClick={toggleLike} />
        )}
        <span className="text-sm">{video?.likesCount}</span>
      </div>
      <div className="flex items-center gap-1">
        <EyeIcon className="h-5 w-5" />
        <span className="text-sm">{video?.viewsCount}</span>
      </div>
    </div>
  );
}
