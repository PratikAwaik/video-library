"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { v4 } from "uuid";
import { api } from "~/trpc/server";

export async function getCloudinarySignature(fileName: string) {
  return await api.cloudinary.sign.query({ fileName });
}

export async function createVideoMutate(data: {
  title: string;
  description: string;
  cloudinaryUrl: string;
}) {
  await api.video.create.mutate(data);
  revalidatePath("/");
}

export async function updateViewMutate(data: { videoId: number }) {
  const { id } = await api.video.updateViews.mutate({
    machineId: getMachineId(),
    videoId: data.videoId,
  });
  revalidatePath("/");
  revalidatePath(`/feed/${id}`);
}

export async function updateLikeMutate(data: { videoId: number }) {
  const { id } = await api.video.updateLikes.mutate({
    machineId: getMachineId(),
    videoId: data.videoId,
  });
  revalidatePath("/");
  revalidatePath(`/feed/${id}`);
}

function getMachineId() {
  const machineId = cookies().get("machine-id")?.value;
  const newMachineId = v4();
  if (!machineId) cookies().set("machine-id", newMachineId);
  return machineId ? machineId : newMachineId;
}
