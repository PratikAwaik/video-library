import { VideoFeed } from "~/components/video-feed";
import { Layout } from "~/components/layout";

export default async function Home() {
  return (
    <Layout>
      <div className="mx-auto mt-10 px-4">
        <VideoFeed />
      </div>
    </Layout>
  );
}
