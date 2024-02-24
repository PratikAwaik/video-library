"use client";

import { type Like, type View, type Video } from "@prisma/client";
import { cn } from "~/lib/utils";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { HeartIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useEffect, useMemo, useState } from "react";
import { handleLikeUpdate, handleViewUpdate } from "~/lib/file-uploader";

type VideoMetaFunctionsProps = {
  video: { likes: Like[] } & { views: View[] } & Video;
  isVideoDetail?: boolean;
  machineId?: string;
};

export function VideoMetaFunctions({
  video,
  isVideoDetail = false,
  machineId,
}: VideoMetaFunctionsProps) {
  const [isLiking, setIsLiking] = useState(false);

  const hasUserLiked = useMemo(() => {
    if (!machineId) return false;
    return !!video?.likes.find((like) => like.machineId === machineId)?.id;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video?.id, video?.likesCount]);

  const hasUserViewed = useMemo(() => {
    if (!machineId) return false;
    return !!video?.views.find((view) => view.machineId === machineId)?.id;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video?.id, video?.viewsCount]);

  useEffect(() => {
    if (isVideoDetail && video?.id && !hasUserViewed) {
      handleViews()
        .then(() => ({}))
        .catch(() => ({}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video?.id, hasUserViewed]);

  const handleViews = async () => {
    await handleViewUpdate({
      videoId: video.id,
    });
  };

  const toggleLike = async () => {
    if (!isVideoDetail) return;
    setIsLiking(true);
    await handleLikeUpdate({
      videoId: video.id,
    });
    setIsLiking(false);
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
