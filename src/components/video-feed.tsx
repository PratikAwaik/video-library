import { PlayIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

import { VideoMetaFunctions } from "./video-meta-functions";
import { api } from "~/trpc/server";
import { cookieService } from "~/lib/storage";

const MACHINE_ID = cookieService.getValue("machine-id");

export async function VideoFeed() {
  const videos = await api.video.getVideos.query({
    machineId: MACHINE_ID,
  });

  return (
    <div className="flex flex-col gap-6">
      {videos?.map((video) => (
        <Link
          className="group grid grid-cols-[180px_1fr] gap-4 rounded-md border p-3 hover:bg-gray-200 hover:dark:bg-gray-900"
          key={video.id}
          href={`/feed/${video.id}`}
        >
          <div className="relative h-full shrink-0">
            <Image
              src={video.thumbnailUrl}
              alt={video.title}
              width={180}
              height={120}
              className="!h-full rounded-md object-cover group-hover:opacity-70"
            />
            <div className="absolute inset-0 hidden h-full w-full items-center justify-center rounded-md group-hover:flex">
              <PlayIcon className="h-10 w-10" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="line-clamp-1 text-xl font-medium">{video.title}</h3>
            <p className="line-clamp-2 text-sm">{video.description}</p>
            <VideoMetaFunctions
              key={video.id}
              video={video}
              machineId={MACHINE_ID}
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
