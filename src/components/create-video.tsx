"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { toast } from "sonner";
import { VideoCameraIcon } from "@heroicons/react/24/solid";
import { handleFileUpload } from "~/lib/file-uploader";

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
  const [isUploading, setIsUploading] = useState(false);

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
    setIsUploading(true);

    try {
      if (
        title.trim().length &&
        description.trim().length &&
        uploadedFile?.fileType &&
        uploadedFile?.fileContents
      ) {
        await handleFileUpload(
          uploadedFile?.fileContents,
          (progress) => setProgress(progress),
          { title, description },
        );
        router.push("/");
      }
    } catch (error: unknown) {
      toast.error((error as Error).message);
    } finally {
      setIsUploading(false);
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
          required
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
          required
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
          required
        />
      </div>

      <Button type="submit" disabled={isUploading} className="mb-4" size={"lg"}>
        {isUploading ? "Uploading..." : "Upload"}
      </Button>

      {isUploading && (
        <div className="flex flex-col gap-2">
          <p>Please wait while we upload your video...</p>
          <div className="flex items-center gap-2">
            <Progress value={Number((progress * 100).toFixed(0))} max={100} />
            <span className="text-sm">
              {Number((progress * 100).toFixed(0))}%
            </span>
          </div>
        </div>
      )}
    </form>
  );
}
