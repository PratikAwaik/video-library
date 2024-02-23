"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

import { api } from "~/trpc/react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { processFile } from "~/lib/cloudinary";
import { toast } from "sonner";
import { VideoCameraIcon } from "@heroicons/react/24/solid";

export function CreateVideo() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedFile, setUploadedFile] = useState<{
    fileName: string;
    fileSize: number;
    fileType: string;
    fileContents: File;
  } | null>();
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const utils = api.useUtils();

  const { mutate: createVideoMutate, isLoading } = api.video.create.useMutation(
    {
      onSuccess: async () => {
        toast.success("🎉 Video uploaded successfully!");
        router.push("/");
        await utils.video.getVideos.invalidate();
        setUploadedFile(null);
      },
      onError(error) {
        toast.error(error.message);
      },
    },
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileObj = event.target.files ? event.target.files[0] : null;

    if (!fileObj) return;

    const [type] = fileObj.type.split("/");

    if (!type || type !== "video") {
      toast.error("You can only upload video files");
      return;
    }

    setUploadedFile({
      fileName: fileObj.name,
      fileSize: fileObj.size,
      fileType: fileObj.type,
      fileContents: fileObj,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      if (uploadedFile?.fileType && uploadedFile?.fileContents) {
        const uploadResponse: { secure_url: string } = await processFile(
          uploadedFile.fileContents,
          (progress) => {
            setProgress(progress);
          },
        );

        createVideoMutate({
          title,
          description,
          cloudinaryUrl: uploadResponse.secure_url,
        });
      }
    } catch (error: unknown) {
      toast.error((error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h3 className="flex items-center justify-center gap-2 text-center text-2xl font-medium">
        <VideoCameraIcon className="h-8 w-8" /> Upload video
      </h3>
      <div className="mb-4 grid w-full items-center gap-2">
        <Label htmlFor="title" className="text-base">
          Title
        </Label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="video title"
          className="text-base"
        />
      </div>

      <div className="mb-4 grid w-full items-center gap-2">
        <Label htmlFor="description" className="text-base">
          Description
        </Label>
        <Textarea
          id="description"
          placeholder="video description"
          className="text-base placeholder:text-gray-400"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
        />
      </div>

      <div className="mb-4 grid w-full items-center gap-2">
        <Label htmlFor="video" className="text-base">
          Video
        </Label>
        <Input
          id="video"
          type="file"
          accept="video/*"
          name="video"
          onChange={handleFileChange}
          className="text-base"
        />
      </div>

      <Button disabled={isLoading || uploading} className="mb-4" size={"lg"}>
        {isLoading || uploading ? "Uploading..." : "Upload"}
      </Button>

      {isLoading ||
        (uploading && (
          <div className="flex flex-col gap-2">
            <p>Please wait while we upload your video...</p>
            <div className="flex items-center gap-2">
              <Progress value={Number((progress * 100).toFixed(0))} max={100} />
              <span className="text-sm">
                {Number((progress * 100).toFixed(0))}%
              </span>
            </div>
          </div>
        ))}
    </form>
  );
}
