import { Layout } from "~/components/layout";
import { VideoDetails } from "~/components/video-details";

export default async function VideoDetailsPage({
  params,
}: {
  params: { videoId: string };
}) {
  return (
    <Layout>
      <div className="mx-auto mt-10">
        <VideoDetails videoId={params.videoId} />
      </div>
    </Layout>
  );
}
