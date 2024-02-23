"use server";
import { api } from "~/trpc/server";

export async function getCloudinarySignature(fileName: string) {
  return await api.cloudinary.sign.query({ fileName });
}
