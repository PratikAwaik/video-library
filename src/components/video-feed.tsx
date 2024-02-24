import { PlayIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

import { VideoMetaFunctions } from "./video-meta-functions";
import { api } from "~/trpc/server";
import { cookies } from "next/headers";

export async function VideoFeed() {
  const machineId = cookies().get("machine-id")?.value;
  const videos = await api.video.getVideos.query({
    machineId,
  });

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {videos?.map((video) => (
        <Link
          className="flex flex-col gap-4 rounded-md border p-3 hover:bg-gray-200 hover:dark:bg-gray-900"
          key={video.id}
          href={`/feed/${video.id}`}
        >
          <div className="group relative h-full w-full">
            <Image
              src={video.thumbnailUrl}
              alt={video.title}
              width={400}
              height={230}
              className="!h-full !w-full rounded-md object-cover group-hover:opacity-70"
            />
            <div className="absolute inset-0 hidden h-full w-full items-center justify-center rounded-md group-hover:flex">
              <PlayIcon className="h-14 w-14" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="line-clamp-1 text-xl font-medium">{video.title}</h3>
            <p className="line-clamp-2 text-sm">{video.description}</p>
            <VideoMetaFunctions
              key={video.id}
              video={video}
              machineId={machineId}
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
